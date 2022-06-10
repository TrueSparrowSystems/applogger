import moment from 'moment';
import {Share} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {getLogTracker} from '../LogTracker';
import {DataParser} from '../LogTracker/DataParser';
import {sessionDash} from '../pages/sessionDashboard';
import {sessionDetails} from '../pages/sessionDetails';

var httpBridge = require('react-native-http-bridge');

export const DEFAULT_SERVER_PORT = 5561;
class WebServerHelper {
  port: number | undefined;
  logTracker;

  constructor() {
    this.logTracker = getLogTracker();
  }
  /**
   * @public Function which starts a web server on a given `port`.
   * @param port Port on which the web server will start.
   */
  startWebServer(port: number = DEFAULT_SERVER_PORT) {
    this.port = port;
    httpBridge.start(this.port, 'http_service', (request: any) => {
      this.onStart(request);
    });
  }

  /**
   * @public Function to stop the running web server.
   */
  stopWebServer() {
    httpBridge.stop();
  }

  /**
   * @public Function which prepares the Log tracker UI URL.
   * @returns {Promise<string>} A promise which resolves to URL string.
   */
  getUIUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      deviceInfoModule
        .getIpAddress()
        .then(ipAddr => {
          const uiUrl = `http://${ipAddr}:${this.port}/session`;
          resolve(uiUrl);
        })
        .catch(reject);
    });
  }

  /**
   * @public Function which opens the native share dialog.
   */
  shareUIUrl() {
    this.getUIUrl().then((url: string) => {
      const shareContent = {
        title: 'Log Tracker UI URL',
        url: url,
        message: url,
      };

      Share.share(shareContent).catch(() => {});
    });
  }

  /**
   * @public Function which runs on webserver start
   * @param  {any} request object
   */
  onStart(request: any) {
    const requestUrlComponents = request.url.split('/');

    if (request.type === 'POST' && requestUrlComponents[3] === 'download') {
      this.logTracker
        .getSessionDetails(requestUrlComponents[2])
        .then(res => {
          return httpBridge.respond(
            request.requestId,
            200,
            'application/json',
            JSON.stringify(res),
          );
        })
        .catch(() => {
          httpBridge.respond(
            request.requestId,
            500,
            'application/json',
            '{"message": "Bad Request"}',
          );
        });
    }

    // you can use request.url, request.type and request.postData here
    else if (request.type === 'GET' && requestUrlComponents[1] === 'session') {
      if (requestUrlComponents.length >= 3) {
        this.logTracker
          .getSessionDetails(requestUrlComponents[2])
          .then(sessionData => {
            const deviceInfo: any = this.logTracker.getDeviceInfo();
            const deviceInfoData: string[] = [];
            if (deviceInfo) {
              for (const key in deviceInfo) {
                if (Object.prototype.hasOwnProperty.call(deviceInfo, key)) {
                  const val = deviceInfo[key];
                  deviceInfoData.push(`
                  <div class="text">${key}: &nbsp; <span >${val}</span></div >
          `);
                }
              }
            }

            const userActionsSteps = DataParser.getUserActionData(sessionData);

            let responseHtml = sessionDetails.replace(
              '{{user_actions}}',
              userActionsSteps,
            );

            const devLogs = DataParser.getDevLogs(sessionData);
            responseHtml = responseHtml.replace('{{dev_logs}}', devLogs);

            httpBridge.respond(
              request.requestId,
              200,
              'text/html',
              responseHtml.replace('{{device_info}}', deviceInfoData.join('')),
            );
          });
      } else {
        const sessionData: string[] = [];
        this.logTracker.getAllSessions().then((allSessions: any) => {
          if (allSessions) {
            for (const key in allSessions) {
              if (Object.prototype.hasOwnProperty.call(allSessions, key)) {
                const ts = allSessions[key];
                sessionData.push(`

                  <div class="div-table-row">
                    <div class="div-table-col1"><div class="text"><a href="/session/${key}">${key}</a></div></div>
                    <div class="div-table-col2"><div class="text">${moment(
                      ts,
                    ).format('DD MMM YYYY hh:mm:ss')}</div></div>
                    
                  </div>


          `);
              }
            }
          }

          httpBridge.respond(
            request.requestId,
            200,
            'text/html',
            sessionDash.replace(
              '{{session_data}}',
              sessionData.reverse().join(''),
            ),
          );
        });
      }
    } else {
      httpBridge.respond(
        request.requestId,
        400,
        'application/json',
        '{"message": "Bad Request"}',
      );
    }
  }
}

export default new WebServerHelper();
