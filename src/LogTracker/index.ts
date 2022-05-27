import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {LogTrackerConfigInterface} from './LogTrackerConfigInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';
import {DeviceInfo} from '../DeviceInfo/DeviceInfo';
import {TrackInterface} from './TrackInterface';

const LOG_SESSION_KEY = 'log_session';

class LogTracker {
  deviceInfo = new DeviceInfo();
  sessionId: string;
  sessionData: Record<number, any>[] = [];
  currentData: Record<number, any> = {};
  currentStoreId: number = 0;
  isTrackingDisabled: boolean = false;

  constructor(private config: LogTrackerConfigInterface) {
    this.sessionId = uuidv4();
    this.isTrackingDisabled = this.config?.disableTracking || !__DEV__;
    this.bind();
    console.log('Tracker initialized with config: ', this.config);

    this.storeSessionId();
    setTimeout(() => {
      this.store();
    }, this.config.writeFrequencyInSeconds);
  }

  private bind() {
    this.store.bind(this);
    this.track.bind(this);
    this.storeSessionId.bind(this);
    this.enableTracking.bind(this);
    this.disableTracking.bind(this);
    this.clearTrackingLogs.bind(this);
  }

  public enableTracking() {
    this.isTrackingDisabled = false;
  }

  public disableTracking() {
    this.isTrackingDisabled = true;
  }

  private clearTrackingLogs() {
    AsyncStorage.setItem(LOG_SESSION_KEY, JSON.stringify({}));
  }

  public track(logData: TrackInterface) {
    if (this.isTrackingDisabled) {
      return;
    }
    console.log('track: ', logData);
    this.currentData[this.currentStoreId] = {...logData, ts: Date.now()};
    this.currentStoreId++;
  }

  private storeSessionId() {
    if (this.isTrackingDisabled) {
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
    if (this.isTrackingDisabled) {
      return;
    }
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

export default new LogTracker({
  writeFrequencyInSeconds: 5000,
});
