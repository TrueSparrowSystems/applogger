import moment from 'moment';
import LogTracker from '../LogTracker';
import {DataParser} from '../LogTracker/DataParser';
import {sessionDash} from '../pages/sessionDashboard';
import {sessionDetails} from '../pages/sessionDetails';

var httpBridge = require('react-native-http-bridge');

class WebServerHelper {
  onStart(request: any) {
    console.log('request: ', request);
    console.log('split: ', request.url.split('/'));

    const requestUrlComponents = request.url.split('/');

    if (request.type === 'POST' && requestUrlComponents[1] === 'flag') {
      if (requestUrlComponents.length >= 3) {
        const sessionId = requestUrlComponents[2];
        LogTracker.flagSession(sessionId, true)
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
        LogTracker.flagSession(sessionId, false)
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
    }

    // you can use request.url, request.type and request.postData here
    else if (request.type === 'GET' && requestUrlComponents[1] === 'session') {
      if (requestUrlComponents.length >= 3) {
        LogTracker.getSessionDetails(requestUrlComponents[2]).then(
          sessionData => {
            const deviceInfo: any = LogTracker.getDeviceInfo();
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
          },
        );
      } else {
        const sessionData: string[] = [];
        LogTracker.getAllSessions().then((allSessions: any) => {
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
