import {LocalEvent} from './../services/local-event/LocalEvent';
import {LogTypes} from './../constants/LogTypes';
import {useEffect} from 'react';
import deviceInfoModule from 'react-native-device-info';
import RNShake from 'react-native-shake';
import EventTypes from '../services/local-event/EventTypes';
import {getLogTracker} from '../LogTracker';
import {useAppStateListener} from './useAppStateListener';
import Cache from '../services/Cache';
import {CacheKey} from '../services/Cache/CacheKey';
import {LogTrackerConfigInterface} from '../LogTracker/LogTrackerConfigInterface';
import {getWebServerHelperInstance} from '../helper/WebServerHelper';

/**
 * @function useWebServer Hook to start start and stop web server and RNShakeSubscription
 * @param  {number} port? Optional parameter port on which the server should start
 */
export function useWebServer(
  port?: number,
  loggerConfig?: LogTrackerConfigInterface,
) {
  const logTracker = getLogTracker(loggerConfig);
  const {isAppInBackground} = useAppStateListener();

  useEffect(() => {
    deviceInfoModule.getIpAddress();
    const RnShakeSubscription = RNShake.addListener(() => {
      if (isAppInBackground) {
        return;
      }

      if (!Cache.getValue(CacheKey.isHelperMenuOpen)) {
        LocalEvent.emit(EventTypes.UI.HelperMenu.Show);
        logTracker.track({
          description: 'Opening helper menu',
          type: LogTypes.Shake,
          params: {},
        });
      }
    });

    getWebServerHelperInstance(loggerConfig).startWebServer(port);
    return () => {
      getWebServerHelperInstance(loggerConfig).stopWebServer();
      RnShakeSubscription.remove();
    };
  }, [isAppInBackground, logTracker, loggerConfig, port]);
}
