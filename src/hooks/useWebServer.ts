import {useEffect} from 'react';
import deviceInfoModule from 'react-native-device-info';
import WebServerHelper from '../helper/WebServerHelper';

var httpBridge = require('react-native-http-bridge');

export function useWebServer() {
  useEffect(() => {
    deviceInfoModule.getIpAddress().then(ip => {
      console.log('-------------> ip address: ', ip);
    });

    httpBridge.start(5561, 'http_service', (request: any) => {
      WebServerHelper.onStart(request);
    });

    return () => {
      httpBridge.stop();
    };
  }, []);
}
