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
const BUG_SESSION_MAP_KEY = 'bug_session_map';

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
  allSessionData: Record<string, any> = {};
  bugSessionMap: Record<string, boolean> = {};
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
    AsyncStorage.getItem(LOG_SESSION_KEY).then(allData => {
      if (allData) {
        this.allSessionData = JSON.parse(allData);
      }

      if (this.config?.logRotateDurationInHours) {
        this.removeOldTrackingLogs();
      }

      AsyncStorage.getItem(BUG_SESSION_MAP_KEY)
        .then(res => {
          if (res) {
            this.bugSessionMap = JSON.parse(res);
          }
        })
        .finally(() => {
          this.createNewSession();
        });
    });
  }
  /**
   * @function bind function to bind all the class functions
   */
  private bind() {
    this.store.bind(this);
    this.track.bind(this);
    this.trackAndStore.bind(this);
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
    this.toggleBugStatusBySessionId.bind(this);
    this.getBugStatusBySessionId.bind(this);
    this.getBugCount.bind(this);
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

    this.sessionState = SessionState.Active;

    // this.trackingState = TrackingState.Enabled;

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
    const currentTime = Date.now();
    const sessionIdArray: string[] = [];
    Object.keys(this.allSessionData).map(key => {
      const sessionTS = this.allSessionData[key];
      const differenceHours = Math.floor(
        (currentTime - sessionTS) / 1000 / 3600,
      );
      if (differenceHours >= this.config.logRotateDurationInHours!) {
        sessionIdArray.push(key);
      }
    });
    if (sessionIdArray.length > 0) {
      this.clearTrackingLogsOfSession(sessionIdArray);
    }
  }

  /**
   * @function deleteAllLogs function to delete all logs
   * @returns Promise<object> A promise to specify delete was successful
   */
  public deleteAllLogs(): Promise<object> {
    return new Promise((resolve, reject) => {
      const data = this.allSessionData;
      const sessionIds: string[] = Object.keys(data);
      this.clearTrackingLogsOfSession(sessionIds)
        .then(() => {
          AsyncStorage.setItem(BUG_SESSION_MAP_KEY, JSON.stringify({})).then(
            () => {
              this.bugSessionMap = {};
              resolve({});
            },
          );
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
      const data = this.allSessionData;
      if (Array.isArray(sessionId)) {
        for (let index = 0; index < sessionId.length; index++) {
          delete data[sessionId[index]];
          if (this.bugSessionMap?.[sessionId[index]]) {
            delete this.bugSessionMap[sessionId[index]];
          }
        }
        AsyncStorage.multiRemove(sessionId)
          .then(() => {
            AsyncStorage.setItem(
              BUG_SESSION_MAP_KEY,
              JSON.stringify(this.bugSessionMap),
            )
              .then(() => {
                AsyncStorage.setItem(LOG_SESSION_KEY, JSON.stringify(data))
                  .then(() => {
                    this.allSessionData = data;
                    resolve({});
                  })
                  .catch(() => {
                    reject();
                  });
              })
              .catch(() => {
                reject();
              });
          })
          .catch(() => {
            reject();
          });
      } else {
        delete data[sessionId];
        if (this.bugSessionMap?.[sessionId]) {
          delete this.bugSessionMap[sessionId];
        }

        AsyncStorage.removeItem(sessionId)
          .then(() => {
            AsyncStorage.setItem(
              BUG_SESSION_MAP_KEY,
              JSON.stringify(this.bugSessionMap),
            )
              .then(() => {
                AsyncStorage.setItem(LOG_SESSION_KEY, JSON.stringify(data))
                  .then(() => {
                    this.allSessionData = data;
                    resolve({});
                  })
                  .catch(() => {
                    reject();
                  });
              })
              .catch(() => {
                reject();
              });
          })
          .catch(() => {
            reject();
          });
      }
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
    if (this.config?.sensitiveDataKeywords?.length) {
      this.checkSensitiveData(logData);
    }
    this.currentData[this.currentStoreId] = {...logData, ts: Date.now()};
    this.currentStoreId++;
  }

  public trackAndStore(logData: TrackInterface) {
    this.track(logData);
    return this.store();
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
            .catch(() => {
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
      const jsonData = this.allSessionData;
      if (!isEmpty(jsonData)) {
        const sessionIds: string[] = [];
        const sessionLogFilePaths: string[] = [];

        Object.keys(jsonData).forEach((key, index, arr) => {
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
  }
  /**
   * @function storeSessionId function to store session id with current timeStamp in async store
   */
  private storeSessionId() {
    const jsonData = this.allSessionData;
    let data: Record<string, number> = !isEmpty(jsonData) ? jsonData : {};

    data[this.sessionId] = Date.now();

    AsyncStorage.setItem(LOG_SESSION_KEY, JSON.stringify(data))
      .then(() => {
        this.allSessionData = data;
      })
      .catch(() => {});
  }
  /**
   * @function store function to store to session log data in async store
   */
  private store() {
    return new Promise<void>(resolve => {
      const data = this.currentData;
      if (isEmpty(data)) {
        if (this.isTrackingDisabled() || !this.isSessionActive()) {
          return resolve();
        }
        setTimeout(() => {
          this.store();
        }, this.config.writeFrequencyInSeconds);
      } else {
        this.currentData = {};
        this.currentStoreId = 0;

        this.sessionData.push(data);

        AsyncStorage.setItem(this.sessionId, JSON.stringify(this.sessionData))
          .catch(() => {})
          .finally(() => {
            resolve();
            if (this.isTrackingDisabled() || !this.isSessionActive()) {
              return resolve();
            }
            setTimeout(() => {
              this.store();
            }, this.config.writeFrequencyInSeconds);
          });
      }
    });
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
          try {
            if (jsonData) {
              resolve(JSON.parse(jsonData));
            } else {
              resolve({});
            }
          } catch (error) {
            resolve({});
          }
        })
        .catch(() => {
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
            resolve('');
          }
        })
        .catch(() => {
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
      const jsonData = this.allSessionData;
      if (!isEmpty(jsonData)) {
        resolve(jsonData);
      } else {
        resolve({});
      }
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

  /**
   * @param  {string} sessionId
   * @returns Promise
   */
  async toggleBugStatusBySessionId(sessionId: string): Promise<void> {
    return new Promise(resolve => {
      if (this.bugSessionMap[sessionId]) {
        delete this.bugSessionMap[sessionId];
      } else {
        this.bugSessionMap[sessionId] = true;
      }
      AsyncStorage.setItem(
        BUG_SESSION_MAP_KEY,
        JSON.stringify(this.bugSessionMap),
      ).then(() => {
        return resolve();
      });
    });
  }

  /**
   * @param  {string} sessionId
   * @returns boolean
   */
  getBugStatusBySessionId(sessionId: string): boolean {
    return !!this.bugSessionMap?.[sessionId];
  }

  /**
   * @returns number
   */
  getBugCount(): number {
    return Object.keys(this.bugSessionMap).length;
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

// function uploaderFunction(
//   sessionLogFilePaths: string[],
//   onLogUploadComplete: Function,
// ): Promise<boolean> {
// sessionLogFilePaths.forEach((singleSessionLogFilePath, index) => {
//   uploadFile(singleSessionLogFilePath).then(() => {
//     if (index == sessionLogFilePaths.length - 1) {
//       // Calling this function to delete log files from local app storage
//       onLogUploadComplete();
//     }
//   });
// });
// return new Promise<boolean>(resolve => {
//   onLogUploadComplete();
//   resolve(true);
// });
// }

let logTracker: LogTracker;
let logTrackerConfig: LogTrackerConfigInterface | undefined;

function createLogTrackerInstance(config?: LogTrackerConfigInterface) {
  const defaultConfig: LogTrackerConfigInterface = {
    writeFrequencyInSeconds: 5,
    clearStorageOnLogUpload: false,
    isTrackingDisabled: false,
  };
  if (logTrackerConfig) {
    return new LogTracker(logTrackerConfig);
  } else if (config) {
    return new LogTracker(config);
  } else {
    return new LogTracker(defaultConfig);
  }
}

export function getLogTracker(config?: LogTrackerConfigInterface): LogTracker {
  if (!logTracker) {
    logTracker = createLogTrackerInstance(config);
  }
  return logTracker;
}

export function setConfig(config?: LogTrackerConfigInterface) {
  logTrackerConfig = config;
}
