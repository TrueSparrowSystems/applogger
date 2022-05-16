import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  LogDataInterface,
  LogTrackerConfigInterface,
} from './LogTrackerConfigInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';

const LOG_SESSION_KEY = 'log_session';

export class LogTracker {
  sessionId: string;
  sessionData: Record<number, any>[] = [];
  currentData: Record<number, any> = {};
  currentStoreId: number = 0;

  constructor(private config: LogTrackerConfigInterface) {
    this.sessionId = uuidv4();
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
    this.store.bind(this);
    this.storeSessionId.bind(this);
  }

  public track(logData: LogDataInterface) {
    console.log('track: ', logData);
    this.currentData[this.currentStoreId] = logData;
    this.currentStoreId++;
  }

  private storeSessionId() {
    console.log('Tracker storeSessionId called: ', this.sessionId);
    AsyncStorage.getItem(LOG_SESSION_KEY)
      .then(jsonData => {
        let data: Record<string, number> = {};
        console.log('get existing Session id: ', data);
        if (!jsonData) {
          data = JSON.parse(jsonData!);
        }
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

  getAllSessions() {
    AsyncStorage.getItem(LOG_SESSION_KEY)
      .then(jsonData => {
        console.log('All sessions: ', jsonData);
      })
      .catch(err => {
        console.log('Error while getting all sessions: ', err);
      });
  }
}
