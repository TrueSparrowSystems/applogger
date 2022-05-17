/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {MutableRefObject, useCallback, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  //ScrollView,
  StatusBar,
  // StyleSheet,
  // Text,
  useColorScheme,
  //View,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {LogTracker} from './src/LogTracker';
import {LogTrackerConfigInterface} from './src/LogTracker/LogTrackerConfigInterface';

import {NetworkInfo} from 'react-native-network-info';
import moment from 'moment';

var httpBridge = require('react-native-http-bridge');
var html = `<!DOCTYPE html>
<html>
  <head>
    <style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td,
      th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }
    </style>
  </head>
  <body>
    <h2>All sessions</h2>
    <table>
      <tr>
        <th>Session Id</th>
        <th>Time</th>
      </tr>
      {{session_data}}
    </table>
  </body>
</html>
`;

// const Section: React.FC<{
//   title: string;
// }> = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const logTracker: MutableRefObject<LogTracker | null> = useRef(null);
  if (!logTracker.current) {
    const logConfig: LogTrackerConfigInterface = {
      writeFrequencyInSeconds: 5000,
    };
    logTracker.current = new LogTracker(logConfig);

    logTracker.current.track({
      testCaseId: '1',
      testCaseDescription: 'Start the application',
    });
  }
  useEffect(() => {
    NetworkInfo.getIPAddress().then(ipAddress => {
      console.log(ipAddress);
    });
    // initalize the server (now accessible via localhost:1234)
    httpBridge.start(5561, 'http_service', request => {
      console.log('request: ', request);
      console.log('split: ', request.url.split('/'));
      console.log('html: ', html);

      const requestUrlComponents = request.url.split('/');
      // you can use request.url, request.type and request.postData here
      if (request.type === 'GET' && requestUrlComponents[1] === 'session') {
        if (requestUrlComponents.length >= 3) {
          logTracker.current
            ?.getSessionDetails(requestUrlComponents[2])
            .then(sessionData => {
              const deviceInfo: any = logTracker.current?.getDeviceInfo();
              const deviceInfoData: string[] = [];
              if (deviceInfo) {
                for (const key in deviceInfo) {
                  if (Object.prototype.hasOwnProperty.call(deviceInfo, key)) {
                    const val = deviceInfo[key];
                    deviceInfoData.push(`
                    <tr>
            <td>${key}</td>
            <td>${val}</td>
          </tr>
          `);
                  }
                }
              }
              console.log('-------> deviceInfo: ', deviceInfo);
              httpBridge.respond(
                request.requestId,
                200,
                'text/html',
                html.replace('{{session_data}}', deviceInfoData.join('')),
              );
            });
        } else {
          const sessionData: string[] = [];
          logTracker.current?.getAllSessions().then((allSessions: any) => {
            if (allSessions) {
              for (const key in allSessions) {
                if (Object.prototype.hasOwnProperty.call(allSessions, key)) {
                  const ts = allSessions[key];
                  sessionData.push(`
          <tr>
            <td><a href="/session/${key}">${key}</a></td>
            <td>${moment(ts).format('DD MMM YYYY hh:mm:ss')}</td>
          </tr>`);
                }
              }
            }

            httpBridge.respond(
              request.requestId,
              200,
              'text/html',
              html.replace('{{session_data}}', sessionData.reverse().join('')),
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
    });

    return () => {
      httpBridge.stop();
    };
  }, []);
  // useEffect(() => {
  //   logTracker.current!.track({
  //     testCaseId: '2',
  //     testCaseDescription: 'Mount the app',
  //     eventData: 0,
  //   });
  //   log(0);
  // }, []);

  const log = useCallback((index: number) => {
    logTracker.current!.track({
      testCaseId: '2',
      testCaseDescription: 'Logging data',
      eventData: index,
    });
    if (index < 100) {
      setTimeout(() => {
        log(index + 1);
      }, 1000);
    }
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
