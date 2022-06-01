import {useEffect} from 'react';
import deviceInfoModule from 'react-native-device-info';
import WebServerHelper from '../helper/WebServerHelper';

export function useWebServer(port?: number) {
  useEffect(() => {
    deviceInfoModule.getIpAddress().then(ip => {
      console.log('-------------> ip address: ', ip);
    });

    WebServerHelper.startWebServer(port);
    return () => {
      WebServerHelper.stopWebServer();
    };
  }, [port]);
}
