import {LocalEvent} from './../services/local-event/LocalEvent';
import {LogTypes} from './../constants/LogTypes';
import {useEffect} from 'react';
import deviceInfoModule from 'react-native-device-info';
import WebServerHelper from '../helper/WebServerHelper';
import RNShake from 'react-native-shake';
import LogTracker from '../LogTracker';
import EventTypes from '../services/local-event/EventTypes';
import NetworkHelper from '../helper/NetworkHelper';

export function useWebServer(port?: number) {
  useEffect(() => {
    deviceInfoModule.getIpAddress().then(ip => {
      console.log('-------------> ip address: ', ip);
      NetworkHelper.setDeviceIpAddress(ip);
    });
    const RnShakeSubscription = RNShake.addListener(() => {
      LocalEvent.emit(EventTypes.UI.HelperMenu.Show);
      LogTracker.track({
        description: 'Device shaken',
        type: LogTypes.Shake,
        params: {},
      });
    });

    WebServerHelper.startWebServer(port);
    return () => {
      WebServerHelper.stopWebServer();
      RnShakeSubscription.remove();
    };
  }, [port]);
}
