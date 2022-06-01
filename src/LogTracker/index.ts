import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  LogTrackerConfigInterface,
  UploaderFunctionInterface,
} from './LogTrackerConfigInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';
import {DeviceInfo} from '../DeviceInfo/DeviceInfo';
import {TrackInterface} from './TrackInterface';
import * as RNFS from 'react-native-fs';
import {DeviceConstantKeys} from '../DeviceInfo/types';

const LOG_SESSION_KEY = 'log_session';

enum TrackingState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}
enum SessionState {
  Active = 'Active',
  InActive = 'InActive',
}

class LogTracker {
  deviceInfo = new DeviceInfo();
  sessionId: string = uuidv4();
  sessionData: Record<number, any>[] = [];
  currentData: Record<number, any> = {};
  currentStoreId: number = 0;
  uploadLogs: UploaderFunctionInterface;
  clearStorageOnUpload: boolean;
  trackingState: TrackingState = __DEV__
    ? TrackingState.Enabled
    : TrackingState.Disabled;
  sessionState: SessionState = SessionState.Active;

  constructor(private config: LogTrackerConfigInterface) {
    this.bind();

    if (this.config.hasOwnProperty('isTrackingDisabled')) {
      this.trackingState = this.config?.isTrackingDisabled
        ? TrackingState.Disabled
        : TrackingState.Enabled;
    }
    this.uploadLogs = this.config?.uploadLogs;
    this.clearStorageOnUpload = this.config?.clearStorageOnLogUpload;

    if (this.config?.logRotateDurationInHours) {
      this.removeOldTrackingLogs();
    }

    this.createNewSession();
  }

  private bind() {
    this.store.bind(this);
    this.track.bind(this);
    this.storeSessionId.bind(this);
    this.createNewSession.bind(this);
    this.getSessionId.bind(this);
    this.stopSession.bind(this);
    this.isSessionActive.bind(this);
    this.enableTracking.bind(this);
    this.disableTracking.bind(this);
    this.removeOldTrackingLogs.bind(this);
    this.clearTrackingLogsOfSession.bind(this);
    this.canUpload.bind(this);
    this.isTrackingDisabled.bind(this);
    this.uploadCurrentSessionLog.bind(this);
    this.getJsonLogFile.bind(this);
    this.uploadAllSessionLogs.bind(this);
    this.getSessionDetails.bind(this);
    this.getSessionDetailsAsJson.bind(this);
    this.getAllSessions.bind(this);
    this.getDeviceInfo.bind(this);
    this.getDeviceInfoByKeys.bind(this);
    this.deleteAllLogs.bind(this);
    this.deleteSessionLogFiles.bind(this);
  }

  canUpload(): boolean {
    return !!this.uploadLogs;
  }

  public isSessionActive(): boolean {
    return this.sessionState === SessionState.Active;
  }

  private resetLogger() {
    this.currentStoreId = 0;
    this.sessionData = [];
    this.currentData = {};
  }

  public createNewSession() {
    this.resetLogger();
    this.sessionId = uuidv4();
    console.log('Tracker initialized with config: ', this.config);

    this.sessionState = SessionState.Active;

    this.trackingState = TrackingState.Enabled;

    this.storeSessionId();

    setTimeout(() => {
      this.store();
    }, this.config.writeFrequencyInSeconds);
  }

  public getSessionId() {
    return this.sessionId;
  }

  public stopSession() {
    this.sessionState = SessionState.InActive;
  }

  public enableTracking() {
    this.trackingState = TrackingState.Enabled;
    setTimeout(() => {
      this.store();
    }, this.config.writeFrequencyInSeconds);
  }

  public disableTracking() {
    this.trackingState = TrackingState.Disabled;
  }

  private removeOldTrackingLogs() {
    let allSessionData: any = {};
    this.getAllSessions().then(data => {
      allSessionData = data;
      const currentTime = Date.now();
      const sessionIdArray: string[] = [];
      Object.keys(allSessionData).map(key => {
        const sessionTS = allSessionData[key];
        const differenceHours = Math.floor(
          (currentTime - sessionTS) / 1000 / 3600,
        );
        if (differenceHours >= this.config.logRotateDurationInHours!) {
          sessionIdArray.push(key);
        }
      });
      this.clearTrackingLogsOfSession(sessionIdArray);
    });
  }

  public deleteAllLogs() {
    return new Promise((resolve, reject) => {
      this.getAllSessions()
        .then((data: any) => {
          const sessionIds: string[] = Object.keys(data);
          this.clearTrackingLogsOfSession(sessionIds)
            .then(() => {
              resolve({});
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {
          reject();
        });
    });
  }

  public clearTrackingLogsOfSession(sessionId: string | string[]) {
    return new Promise((resolve, reject) => {
      this.getAllSessions()
        .then(async (data: any) => {
          if (Array.isArray(sessionId)) {
            for (let index = 0; index < sessionId.length; index++) {
              delete data[sessionId[index]];
            }
            try {
              await AsyncStorage.multiRemove(sessionId);
            } catch {
              reject();
            }
          } else {
            delete data[sessionId];
            try {
              await AsyncStorage.removeItem(sessionId);
            } catch {
              reject();
            }
          }
          AsyncStorage.setItem(LOG_SESSION_KEY, JSON.stringify(data))
            .then(() => {
              resolve({});
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {
          reject();
        });
    });
  }

  isTrackingDisabled() {
    return this.trackingState === TrackingState.Disabled;
  }

  public track(logData: TrackInterface) {
    if (this.isTrackingDisabled() || !this.isSessionActive()) {
      return;
    }
    console.log('track: ', logData);
    this.currentData[this.currentStoreId] = {...logData, ts: Date.now()};
    this.currentStoreId++;
  }

  private getJsonLogFile(
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

  private deleteSessionLogFiles(sessionLogFilePaths: string[]) {
    sessionLogFilePaths.forEach((sessionLogFile: string) => {
      RNFS.unlink(sessionLogFile);
    });
  }

  uploadCurrentSessionLog(): Promise<boolean> {
    return new Promise(resolve => {
      this.getSessionDetailsAsJson(this.sessionId).then(data => {
        if (data) {
          var dir = RNFS.DocumentDirectoryPath + '/sessionLogs';
          var filename = `/${this.sessionId}.json`;
          this.getJsonLogFile(data, filename, dir)
            .then(sessionLogFilePath => {
              var sessionLogFilePaths: string[] = [];
              sessionLogFilePaths.push(sessionLogFilePath);
              this.uploadLogs?.(sessionLogFilePaths, () => {
                this.deleteSessionLogFiles(sessionLogFilePaths);
              })
                .then(() => {
                  return resolve(true);
                })
                .catch(() => {
                  return resolve(false);
                });
            })
            .catch(() => {});
        }
      });
    });
  }

  uploadAllSessionLogs(): Promise<boolean> {
    return new Promise(resolve => {
      AsyncStorage.getItem(LOG_SESSION_KEY).then(jsonData => {
        if (jsonData) {
          const sessionIds: string[] = [];
          const sessionLogFilePaths: string[] = [];

          Object.keys(JSON.parse(jsonData)).forEach((key, index, arr) => {
            if (key !== this.sessionId) {
              sessionIds.push(key);
            }
            var dir = RNFS.DocumentDirectoryPath + '/sessionLogs';
            var filename = `/${key}.json`;
            this.getSessionDetailsAsJson(key).then(singleSessionData => {
              this.getJsonLogFile(singleSessionData, filename, dir)
                .then(path => {
                  sessionLogFilePaths.push(path);

                  if (index === arr.length - 1) {
                    this.uploadLogs?.(sessionLogFilePaths, () => {
                      this.deleteSessionLogFiles(sessionLogFilePaths);

                      if (this.clearStorageOnUpload) {
                        this.clearTrackingLogsOfSession(sessionIds);
                      }
                    })
                      .then(() => {
                        return resolve(true);
                      })
                      .catch(() => {
                        return resolve(false);
                      });
                  }
                })
                .catch(() => {});
            });
          });
        }
      });
    });
  }

  private storeSessionId() {
    if (this.isTrackingDisabled() || !this.isSessionActive()) {
      return;
    }
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
      if (this.isTrackingDisabled() || !this.isSessionActive()) {
        return;
      }
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
          if (this.isTrackingDisabled() || !this.isSessionActive()) {
            return;
          }
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

  getDeviceInfoByKeys(keys: DeviceConstantKeys[]) {
    return this.deviceInfo.getByKeys(keys);
  }
}

function uploaderFunction(
  sessionLogFilePaths: string[],
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
