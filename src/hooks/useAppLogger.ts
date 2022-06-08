import {useCallback, useEffect} from 'react';
import {getLogTracker, setConfig} from '../LogTracker';
import {LogTrackerConfigInterface} from '../LogTracker/LogTrackerConfigInterface';
import {useTracker} from './useTracker';
import {useWebServer} from './useWebServer';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {LogTypes} from '../constants';
import ExitApp from 'react-native-exit-app';

export type appLoggerParams = {
  port?: number;
  loggerConfig?: LogTrackerConfigInterface;
};

export function useAppLogger(appLoggerParams?: appLoggerParams) {
  useWebServer(appLoggerParams?.port);
  useEffect(() => {
    setConfig(appLoggerParams?.loggerConfig);
    setJSExceptionHandler(jsErrorHandler, true);
    setNativeExceptionHandler(nativeErrorHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logTracker = getLogTracker();
  const jsErrorHandler = useCallback(
    (e, isFatal) => {
      if (isFatal) {
        logTracker
          .trackAndStore({
            description: 'App Crashed',
            type: LogTypes.Crash,
            params: {
              error: e.toString(),
              isFatal,
            },
          })
          .finally(() => {
            ExitApp.exitApp();
          });
      }
    },
    [logTracker],
  );

  const nativeErrorHandler = useCallback(
    exceptionString => {
      logTracker
        .trackAndStore({
          description: 'App Crashed',
          type: LogTypes.Crash,
          params: {
            error: exceptionString,
          },
        })
        .finally(() => {
          ExitApp.exitApp();
        });
    },
    [logTracker],
  );

  return useTracker();
}
