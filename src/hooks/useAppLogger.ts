import {useEffect} from 'react';
import {setConfig} from '../LogTracker';
import {LogTrackerConfigInterface} from '../LogTracker/LogTrackerConfigInterface';
import {useTracker} from './useTracker';
import {useWebServer} from './useWebServer';

export type appLoggerParams = {
  port?: number;
  loggerConfig?: LogTrackerConfigInterface;
};

export function useAppLogger(appLoggerParams?: appLoggerParams) {
  useWebServer(appLoggerParams?.port);
  useEffect(() => {
    setConfig(appLoggerParams?.loggerConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return useTracker();
}
