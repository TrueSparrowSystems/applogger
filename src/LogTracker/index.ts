import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {LogTrackerConfigInterface} from './LogTrackerConfigInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';
import {DeviceInfo} from '../DeviceInfo/DeviceInfo';
import {TrackInterface} from './TrackInterface';
import * as RNFS from 'react-native-fs';
import {DeviceConstantKeys, DeviceConstants} from '../DeviceInfo/types';
import Constants from '../constants/Constants';

const LOG_SESSION_KEY = 'log_session';

enum TrackingState {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}
enum SessionState {
  Active = 'Active',
  InActive = 'InActive',
}

export class LogTracker {
  deviceInfo = new DeviceInfo();
  sessionId: string = uuidv4();
  sessionData: Record<number, any>[] = [];
  currentData: Record<number, any> = {};
  currentStoreId: number = 0;
  uploadLogs?: (
    sessionLogFilePaths: string[],
    onUploadComplete: Function,
  ) => Promise<boolean>;
  clearStorageOnUpload: boolean;
  trackingState: TrackingState = __DEV__
    ? TrackingState.Enabled
    : TrackingState.Disabled;
  sessionState: SessionState = SessionState.Active;

  /**
   * This class maintains sessions, and tracks, stores and deletes session logs
   * @constructor
   * @param  {LogTrackerConfigInterface} config configurations for the class
   */
  constructor(private config: LogTrackerConfigInterface) {
    this.bind();

    this.config.writeFrequencyInSeconds *= 1000;

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
  /**
   * @function bind function to bind all the class functions
   */
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

  /**
   * @function canUpload function to get whether upload functionality is enabled
   * @returns boolean whether upload is possible
   */
  public canUpload(): boolean {
    return !!this.uploadLogs;
  }

  /**
   * @function isSessionActive function to get whether session is active
   * @returns boolean whether session is active
   */
  public isSessionActive(): boolean {
    return this.sessionState === SessionState.Active;
  }

  /**
   * @function resetLogger function to reset all the logs
   * @returns void
   */
  private resetLogger() {
    this.currentStoreId = 0;
    this.sessionData = [];
    this.currentData = {};
  }

  /**
   * @function createNewSession function to create a new session
   * @returns void
   */
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
  /**
   * @function getSessionId function to get current session Id
   * @returns string current session Id
   */
  public getSessionId(): string {
    return this.sessionId;
  }
  /**
   * @function stopSession function to stop current session
   * @returns void
   */
  public stopSession(): void {
    this.sessionState = SessionState.InActive;
  }
  /**
   * @function enableTracking function to enable/resume tracking
   * @returns void
   */
  public enableTracking(): void {
    this.trackingState = TrackingState.Enabled;
    setTimeout(() => {
      this.store();
    }, this.config.writeFrequencyInSeconds);
  }
  /**
   * @function disableTracking function to disable/stop tracking
   * @returns void
   */
  public disableTracking() {
    this.trackingState = TrackingState.Disabled;
  }
  /**
   * @function removeOldTrackingLogs function to remove old logs before the logRotateDurationInHours value from config
   * @returns void
   */
  private removeOldTrackingLogs(): void {
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

  /**
   * @function deleteAllLogs function to delete all logs
   * @returns Promise<object> A promise to specify delete was successful
   */
  public deleteAllLogs(): Promise<object> {
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

  /**
   * @function clearTrackingLogsOfSession function to clear tracking logs of session/sessions
   * @param  {string|string[]} sessionId Array of sessionIds or sessionId for which log is to be deleted
   * @returns Promise A promise to specify tracking logs cleared
   */
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
  /**
   * @function redactData function to return data after redaction of sensitive data
   * @param  {any} data object on which redaction is to be applied
   * @returns any object with redacted sensitive data
   */
  private redactData(data: any): any {
    Object.keys(data).map(prop => {
      if (this.config?.sensitiveDataKeywords?.includes(prop)) {
        data[prop] = Constants.REDACTED_TEXT;
      } else if (typeof data[prop] === 'object') {
        this.redactData(data[prop]);
      } else if (Array.isArray(data)) {
        data.forEach(item => {
          this.redactData(data[item]);
        });
      }
    });
    return data;
  }

  /**
   * @function checkSensitiveData function to check and call redact function for sensitive data
   * @param  {TrackInterface} logData object whose sensitive data is to be redacted
   * @returns void
   */
  private checkSensitiveData(logData: TrackInterface): void {
    if (!isEmpty(logData.params)) {
      logData.params = this.redactData(logData.params);
    }
  }

  /**
   * @function isTrackingDisabled function to get whether tracking is disabled or not
   * @returns boolean whether tracking is disabled
   */
  public isTrackingDisabled(): boolean {
    return this.trackingState === TrackingState.Disabled;
  }

  /**
   * @function track function to track session logs
   * @param  {TrackInterface} logData object whose logs are to be tracked
   */
  public track(logData: TrackInterface) {
    if (this.isTrackingDisabled() || !this.isSessionActive()) {
      return;
    }
    console.log('track: ', logData);
    if (this.config?.sensitiveDataKeywords?.length) {
      this.checkSensitiveData(logData);
    }
    this.currentData[this.currentStoreId] = {...logData, ts: Date.now()};
    this.currentStoreId++;
  }

  /**
   * @function getJsonLogFile Function to write the log file in the directory provided and return filePath
   * @param  {string} content Data to be added in log file
   * @param  {string} filename name of the log file
   * @param  {string} dir directory path in which the log file is to be written
   * @returns Promise<string> A promise with path of log file
   */
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
  /**
   * @function deleteSessionLogFiles function to delete session log files
   * @param  {string[]} sessionLogFilePaths
   */
  private deleteSessionLogFiles(sessionLogFilePaths: string[]) {
    sessionLogFilePaths.forEach((sessionLogFile: string) => {
      RNFS.unlink(sessionLogFile);
    });
  }

  /**
   * @function uploadCurrentSessionLog function to upload logs of current session
   * @returns Promise<boolean> A promise whether upload was successful
   */
  public uploadCurrentSessionLog(): Promise<boolean> {
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

  /**
   * @function uploadAllSessionLogs function to upload logs of all sessions
   * @returns Promise<boolean> A promise whether upload was successful
   */
  public uploadAllSessionLogs(): Promise<boolean> {
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
  /**
   * @function storeSessionId function to store session id with current timeStamp in async store
   */
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
  /**
   * @function store function to store to session log data in async store
   */
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

  /**
   * @function getSessionDetails function to get session logs of particular session
   * @param  {string} sessionId Id of the session whose details are required
   * @returns Promise<object> A promise with the session detail object
   */
  getSessionDetails(sessionId: string): Promise<object> {
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

  /**
   * @function getSessionDetailsAsJson function to get session logs in json format of particular session
   * @param  {string} sessionId Id of the session whose details are required
   * @returns Promise<string> A promise with the session detail as json
   */
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

  /**
   * @function getAllSessions function to get session log data of all sessions
   * @returns Promise<object> A promise with the session detail object for all sessions
   */
  getAllSessions(): Promise<object> {
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

  /**
   * @function getDeviceInfo function to get device info
   * @returns DeviceConstants Object with device info
   */
  getDeviceInfo(): DeviceConstants {
    return this.deviceInfo.get();
  }

  /**
   * @function getDeviceInfoByKeys function to get device info based on the keys provided
   * @param  {DeviceConstantKeys[]} keys whose device info is required
   * @returns DeviceConstants Object with device info for specified keys
   */
  getDeviceInfoByKeys(keys: DeviceConstantKeys[]): DeviceConstants {
    return this.deviceInfo.getByKeys(keys);
  }
}

// example for uploading single log file
// function uploadFile(filePath: string): Promise<boolean> {
//   return new Promise((resolve, reject) => {
//     s3.upload(filePath).then(() => {
//       resolve(true);
//     }).catch(() => {
//       reject();
//     });
//   });
// }

function uploaderFunction(
  sessionLogFilePaths: string[],
  onLogUploadComplete: Function,
): Promise<boolean> {
  // sessionLogFilePaths.forEach((singleSessionLogFilePath, index) => {
  //   uploadFile(singleSessionLogFilePath).then(() => {
  //     if (index == sessionLogFilePaths.length - 1) {
  //       // Calling this function to delete log files from local app storage
  //       onLogUploadComplete();
  //     }
  //   });
  // });
  return new Promise<boolean>(resolve => {
    onLogUploadComplete();
    resolve(true);
  });
}
let logTracker: LogTracker;
let logTrackerConfig: LogTrackerConfigInterface | undefined;

function createLogTrackerInstance() {
  const defaultConfig: LogTrackerConfigInterface = {
    writeFrequencyInSeconds: 5,
    clearStorageOnLogUpload: false,
  };
  if (logTrackerConfig) {
    return new LogTracker(logTrackerConfig);
  } else {
    return new LogTracker(defaultConfig);
  }
}

export function getLogTracker(): LogTracker {
  if (!logTracker) {
    logTracker = createLogTrackerInstance();
  }
  return logTracker;
}

export function setConfig(config?: LogTrackerConfigInterface) {
  logTrackerConfig = config;
}
