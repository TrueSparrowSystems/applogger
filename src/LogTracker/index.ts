import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  LogTrackerConfigInterface,
  UploaderFunc,
} from './LogTrackerConfigInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';
import {DeviceInfo} from '../DeviceInfo/DeviceInfo';
import {TrackInterface} from './TrackInterface';
import * as RNFS from 'react-native-fs';
import {zip} from 'react-native-zip-archive';

const LOG_SESSION_KEY = 'log_session';

class LogTracker {
  deviceInfo = new DeviceInfo();
  sessionId: string;
  sessionData: Record<number, any>[] = [];
  currentData: Record<number, any> = {};
  currentStoreId: number = 0;
  uploadLogs: UploaderFunc;
  clearStorageOnUpload: boolean;

  constructor(private config: LogTrackerConfigInterface) {
    this.sessionId = uuidv4();
    this.bind();
    console.log('Tracker initialized with config: ', this.config);

    this.storeSessionId();
    this.uploadLogs = config?.uploadLogs;
    this.clearStorageOnUpload = config?.clearStorageOnLogUpload;
    setTimeout(() => {
      this.store();
    }, this.config.writeFrequencyInSeconds);
  }

  private bind() {
    this.store.bind(this);
    this.track.bind(this);
    this.store.bind(this);
    this.storeSessionId.bind(this);
  }

  public track(logData: TrackInterface) {
    console.log('track: ', logData);
    this.currentData[this.currentStoreId] = {...logData, ts: Date.now()};
    this.currentStoreId++;
  }

  private getLogFile(
    content: string,
    filename: string,
    dir: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      RNFS.mkdir(dir)
        .then(() => {
          RNFS.writeFile(dir + filename, content, 'utf8')
            .then(() => {
              return resolve(dir + filename);
            })
            .catch(err => {
              console.log('error creating log file - ', err);
              return reject('');
            });
        })
        .catch(() => {
          return reject('');
        });
    });
  }

  private getZipFile(sourcePath: string, targetPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      zip(sourcePath, targetPath)
        .then(zipPath => {
          return resolve(zipPath);
        })
        .catch(err => {
          console.log('error in zip creation ', err);
          return reject();
        });
    });
  }

  uploadLogBySession(): Promise<boolean> {
    return new Promise(resolve => {
      this.getSessionDetailsAsJson(this.sessionId).then(data => {
        if (data) {
          var dir = RNFS.DocumentDirectoryPath + '/logs';
          var filename = `/${this.sessionId}.json`;
          this.getLogFile(data, filename, dir)
            .then(logFilePath => {
              resolve(true);
              var targetZipPath =
                RNFS.DocumentDirectoryPath + `/${this.sessionId}_logs.zip`;
              var sourceZipPath = RNFS.DocumentDirectoryPath + '/logs';
              this.getZipFile(sourceZipPath, targetZipPath)
                .then(zipPath => {
                  this.uploadLogs?.(zipPath, () => {
                    RNFS.unlink(zipPath);
                    RNFS.unlink(logFilePath);
                  })
                    .then(() => {
                      return resolve(true);
                    })
                    .catch(() => {
                      return resolve(false);
                    });
                })
                .catch(() => {});
            })
            .catch(err => {
              console.log('error writing log file ', err);
            });
        }
      });
    });
  }

  uploadAll(): Promise<boolean> {
    return new Promise(resolve => {
      AsyncStorage.getItem(LOG_SESSION_KEY).then(jsonData => {
        if (jsonData) {
          var sourceZipPath = RNFS.DocumentDirectoryPath + '/logs';
          var targetZipPath = RNFS.DocumentDirectoryPath + '/all_logs.zip';

          Object.keys(JSON.parse(jsonData)).forEach(key => {
            var dir = RNFS.DocumentDirectoryPath + '/logs';
            var filename = `/${key}.json`;
            this.getSessionDetailsAsJson(key).then(singleSessionData => {
              this.getLogFile(singleSessionData, filename, dir)
                .then(path => {
                  console.log('created text file', path);
                })
                .catch(() => {
                  console.log('error in creating text file');
                });
            });
          });

          this.getZipFile(sourceZipPath, targetZipPath).then(zipPath => {
            this.uploadLogs?.(zipPath, () => {
              RNFS.readDir(sourceZipPath).then(res => {
                res.forEach(file => {
                  RNFS.unlink(file.path);
                });
              });

              RNFS.unlink(zipPath);
              if (this.clearStorageOnUpload) {
                // TODO: clear logs
              }
            })
              .then(() => {
                return resolve(true);
              })
              .catch(() => {
                return resolve(false);
              });
          });
        }
      });
    });
  }

  private storeSessionId() {
    console.log('Tracker storeSessionId called: ', this.sessionId);
    AsyncStorage.getItem(LOG_SESSION_KEY)
      .then(jsonData => {
        let data: Record<string, number> = {};
        console.log('get existing Session id: ', data);
        if (jsonData) {
          console.log('Here: ', jsonData);
          data = JSON.parse(jsonData!);
        }
        console.log('=======> jsonData: ', jsonData);
        console.log('=======> data: ', data);
        data[this.sessionId] = Date.now();

        AsyncStorage.setItem(LOG_SESSION_KEY, JSON.stringify(data))
          .then(() => {
            // Do nothing
            console.log('store session id: ', data);
          })
          .catch(err => {
            console.error('Error while storing the log session', err);
          });
      })
      .catch(err => {
        console.error('Error while getting the log session', err);
      });
  }

  private store() {
    const data = this.currentData;
    console.log('store called ', data);
    if (isEmpty(data)) {
      console.log('Data is empty will do nothing');
      setTimeout(() => {
        this.store();
      }, this.config.writeFrequencyInSeconds);
    } else {
      console.log('Data exists');
      this.currentData = {};
      this.currentStoreId = 0;

      this.sessionData.push(data);

      console.log('storing ', JSON.stringify(this.sessionData));
      AsyncStorage.setItem(this.sessionId, JSON.stringify(this.sessionData))
        .then(() => {
          console.log('Successfully stored the logs');
        })
        .catch(err => {
          console.error('Error while storing the logs', err);
        })
        .finally(() => {
          console.log('scheduling for ', this.config.writeFrequencyInSeconds);
          setTimeout(() => {
            this.store();
          }, this.config.writeFrequencyInSeconds);
        });
    }
  }

  getSessionDetails(sessionId: string) {
    return new Promise(resolve => {
      AsyncStorage.getItem(sessionId)
        .then(jsonData => {
          console.log('session data: ', jsonData);
          try {
            if (jsonData) {
              resolve(JSON.parse(jsonData));
            } else {
              resolve({});
            }
          } catch (error) {
            console.log('Error while parsing session data: ', error);
            resolve({});
          }
        })
        .catch(err => {
          console.log('Error while getting all sessions: ', err);
          resolve({});
        });
    });
  }

  getSessionDetailsAsJson(sessionId: string): Promise<string> {
    return new Promise(resolve => {
      AsyncStorage.getItem(sessionId)
        .then(jsonData => {
          try {
            if (jsonData) {
              resolve(jsonData);
            } else {
              resolve('');
            }
          } catch (error) {
            console.log('Error while parsing session data: ', error);
            resolve('');
          }
        })
        .catch(err => {
          console.log('Error while getting all sessions: ', err);
          resolve('');
        });
    });
  }

  getAllSessions() {
    return new Promise(resolve => {
      AsyncStorage.getItem(LOG_SESSION_KEY)
        .then(jsonData => {
          console.log('All sessions: ', jsonData);
          try {
            if (jsonData) {
              resolve(JSON.parse(jsonData));
            } else {
              resolve({});
            }
          } catch (error) {
            console.log('Error while parsing session data: ', error);
            resolve({});
          }
        })
        .catch(err => {
          console.log('Error while getting all sessions: ', err);
          resolve({});
        });
    });
  }

  getDeviceInfo() {
    return this.deviceInfo.get();
  }
}

function uploaderFunction(
  zipPath: string,
  onLogUploadComplete: Function,
): Promise<boolean> {
  onLogUploadComplete();

  return new Promise(resolve => {
    resolve(true);
  });
}

export default new LogTracker({
  writeFrequencyInSeconds: 5000,
  uploadLogs: uploaderFunction,
  clearStorageOnLogUpload: true,
});
