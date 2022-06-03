import {LocalEvent} from './../services/local-event/LocalEvent';
import {LogTypes} from './../constants/LogTypes';
import {useEffect} from 'react';
import deviceInfoModule from 'react-native-device-info';
import WebServerHelper from '../helper/WebServerHelper';
import RNShake from 'react-native-shake';
import EventTypes from '../services/local-event/EventTypes';
import {getLogTracker} from '../LogTracker';

/**
 * @function useWebServer Hook to start start and stop web server and RNShakeSubscription
 * @param  {number} port? Optional parameter port on which the server should start
 */
export function useWebServer(port?: number) {
  const logTracker = getLogTracker();
  useEffect(() => {
    deviceInfoModule.getIpAddress().then(ip => {
      console.log('-------------> ip address: ', ip);
    });
    const RnShakeSubscription = RNShake.addListener(() => {
      LocalEvent.emit(EventTypes.UI.HelperMenu.Show);
      logTracker.track({
        description: 'Opening helper menu',
        type: LogTypes.Shake,
        params: {},
      });
    });

    WebServerHelper.startWebServer(port);
    return () => {
      WebServerHelper.stopWebServer();
      RnShakeSubscription.remove();
    };
  }, [logTracker, port]);
}
