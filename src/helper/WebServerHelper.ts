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
   * Function which starts a web server on a given `port`.
   * @param port Port on which the web server will start.
   */
  startWebServer(port: number = DEFAULT_SERVER_PORT) {
    this.port = port;
    httpBridge.start(this.port, 'http_service', (request: any) => {
      this.onStart(request);
    });
  }

  /**
   * Function to stop the running web server.
   */
  stopWebServer() {
    httpBridge.stop();
  }

  /**
   * Function which prepares the Log tracker UI URL.
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
   * Function which opens the native share dialog.
   */
  shareUIUrl() {
    this.getUIUrl().then((url: string) => {
      const shareContent = {
        title: 'Log Tracker UI URL',
        url: url,
        message: url,
      };

      Share.share(shareContent)
        .then(value => {
          console.log(value);
        })
        .catch(err => console.log('There was an error while sharing. ', err));
    });
  }

  onStart(request: any) {
    console.log('request: ', request);
    console.log('split: ', request.url.split('/'));

    const requestUrlComponents = request.url.split('/');

    if (request.type === 'POST' && requestUrlComponents[1] === 'flag') {
      if (requestUrlComponents.length >= 3) {
        const sessionId = requestUrlComponents[2];
        this.logTracker
          .flagSession(sessionId, true)
          .then(() => {
            httpBridge.respond(
              request.requestId,
              200,
              'application/json',
              '{"message": "success"}',
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
      } else {
        httpBridge.respond(
          request.requestId,
          404,
          'application/json',
          '{"message": "Bad Request"}',
        );
      }
    } else if (
      request.type === 'POST' &&
      requestUrlComponents[1] === 'unflag'
    ) {
      if (requestUrlComponents.length >= 3) {
        const sessionId = requestUrlComponents[2];
        this.logTracker
          .flagSession(sessionId, false)
          .then(() => {
            httpBridge.respond(
              request.requestId,
              200,
              'application/json',
              '{"message": "success"}',
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
      } else {
        httpBridge.respond(
          request.requestId,
          404,
          'application/json',
          '{"message": "Bad Request"}',
        );
      }
    } else if (
      request.type === 'POST' &&
      requestUrlComponents[3] === 'download'
    ) {
      this.logTracker
        .getSessionDetails(requestUrlComponents[2])
        .then(res => {
          console.log('session data', res);
          return httpBridge.respond(
            request.requestId,
            200,
            'application/json',
            JSON.stringify(res),
          );
        })
        .catch(error => {
          console.log({error});
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
            console.log('userActionsSteps: ', userActionsSteps);

            let responseHtml = sessionDetails.replace(
              '{{user_actions}}',
              userActionsSteps,
            );

            const devLogs = DataParser.getDevLogs(sessionData);
            responseHtml = responseHtml.replace('{{dev_logs}}', devLogs);

            console.log('-------> deviceInfo: ', deviceInfo);
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
                    <div class="div-table-col3"><div class="text"><input type="checkbox"/></div></div>
                    
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
