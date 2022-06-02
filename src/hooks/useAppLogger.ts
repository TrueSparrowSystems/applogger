import {useEffect} from 'react';
import {createLogTrackerInstance} from '../LogTracker';
import {LogTrackerConfigInterface} from '../LogTracker/LogTrackerConfigInterface';
import {useWebServer} from './useWebServer';

export type appLoggerParams = {
  port?: number;
  loggerConfig?: LogTrackerConfigInterface;
};

export function useAppLogger(appLoggerParams?: appLoggerParams) {
  useWebServer(appLoggerParams?.port);
  useEffect(() => {
    createLogTrackerInstance(appLoggerParams?.loggerConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
