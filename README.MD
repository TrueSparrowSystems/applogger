# applogger

## Overview:

`applogger` is an application framework that helps minimise QA issue reporting time and developer debugging time by providing a web interface for the logs generated and steps taken by the user on a device using the device's ip address. The user can keep track of their sessions and logs, as well as upload, download, and delete them.

### Some of the functionalities which the framework provides are:

- Track the steps performed by user and generate logs
- Maintain tracking sessions.
- Upload, download or delete session logs.

## Why App Logger?

Given the current workflows, anytime QA reports a problem, they must repeat the identical processes and record them in order to log the issue. They must also submit some data to developers in relation to the reported issue. In the case of random testing, finding out the steps becomes a time-consuming effort, and reproducing the issue can take a long time.

On the developer side, QA data isn't always appropriate for duplicating the problem, and incomplete data can complicate troubleshooting. As a result, debugging time increases, and the issue may go unresolved since it is not reproducible.
To solve these problems, we need session vise tracking of the steps taken and logs of those steps as soon as a user takes an action.

`applogger` framework is made up of a few react native components with customised tracking code and a general wrapper that can wrap around any component. A simple track function can be used by developers to provide tracking logic to custom methods.

The developer can access the app sessions including the steps and associated logs via the web interface using the user's IP address. The web interface includes a session dashboard with a list of sessions and a session details page for each session that includes device information as well as user action and developer logs.

### Other features of the app logger:

- Download Logs - the developer can download session logs in html or json format from web interface.
- Upload Logs - the user can use the helper menu to upload logs for the current or all sessions. In order to use this feature, the developer must provide an upload function.
- Delete Logs - from the helper menu user can delete logs of the current or all sessions.
- Maintain session - From the helper menu, the user can also stop the session, start a new one, and disable or enable tracking in the current one.

# Installation

### Add Dependencies

Install the required packages in your react native project.

```
npm install applogger --save
```

To take benefit of all functionality, `applogger` requires a number of peer dependencies. It is recommended that you follow the install instructions for each package to verify that it is properly configured.

- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- [react-native-device-info](https://www.npmjs.com/package/react-native-device-info)
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values)
- [react-native-http-bridge](https://www.npmjs.com/package/@kingstinct/react-native-http-bridge)
- [react-native-network-info](https://www.npmjs.com/package/react-native-network-info)
- [react-native-shake](https://www.npmjs.com/package/react-native-shake)

```
npm install @react-native-async-storage/async-storage react-native-device-info react-native-fs react-native-get-random-values react-native-http-bridge react-native-network-info react-native-shake
```

Navigate to your ios folder and run:

```
pod install
```

# Usage

To get started, you'll need to call the `useAppLogger` hook in your project's root file. This hook allows you to start and stop the web server, which is necessary for viewing the logs.

`useAppLogger` hook requires a prop of type `appLoggerParams` as mentioned below.

```
type appLoggerParams = {
  port?: number;
  loggerConfig?: LogTrackerConfigInterface;
}
```

`port` is an optional prop on which the server should start, default port is `5561`.
`loggerConfig` is an object of type `LogTrackerConfigInterface`. It's used to configure `applogger`. If not provided, it will use default configuration.

```sh
interface LogTrackerConfigInterface {
  writeFrequencyInSeconds: number;
  uploadLogs?: (
    sessionLogFilePaths: string[],
    onUploadComplete: Function,
  ) => Promise<boolean>;
  clearStorageOnLogUpload: boolean;
  isTrackingDisabled?: boolean;
  logRotateDurationInHours?: number;
  sensitiveDataKeywords?: string[];
}
```

Right now we can configure only below mentioned parameters:

- `writeFrequencyInSeconds` - frequency in which logs should be written in storage, default value is `5`.
- `uploadLogs` - Function to upload the logs to any third party storage serivce like s3. Upload will not work unless developer provides a function for it.
- `clearStorageOnLogUpload` - Boolean to clear the storage when logs are uploaded.
- `isTrackingDisabled` - Flag to disable log tracking. Default values - for production env : true, for dev env : false.
- `logRotateDurationInHours` - Flag to clear the logs after certain intervals.
- `sensitiveDataKeywords` - Array containing sensitive keywords which when encountered in params will be redacted.

Here is a code snippet to configure `applogger` on port 8000.

```sh
import {useAppLogger, HelperMenu} from 'applogger';

function App() {
      const uploadFile = filePath => {
        return new Promise((resolve, reject) => {
          s3.upload(filePath)
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              reject();
            });
        });
      };

      const uploaderFunction = (sessionLogFilePaths, onLogUploadComplete) => {
        return new Promise(resolve => {
          sessionLogFilePaths.forEach((singleSessionLogFilePath, index) => {
            uploadFile(singleSessionLogFilePath).then(() => {
              if (index == sessionLogFilePaths.length - 1) {
                // Call this function to delete log files from local app storage
                onLogUploadComplete();
                return resolve(true);
              }
            });
          });
        });
      };

      const appLoggerParams = {
        port: 8000,
        loggerConfig: {
          writeFrequencyInSeconds: 5,
          uploadLogs: uploaderFunction,
          clearStorageOnLogUpload: false,
          isTrackingDisabled: false,
          logRotateDurationInHours: 24,
          sensitiveDataKeywords: ['password'],
        },
      };

  const {navigationRef, onNavigationStateChange} = useAppLogger(appLoggerParams);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onNavigationStateChange}>
      <RootNavigation />
      <HelperMenu />
    </NavigationContainer>
  );
}
export default App;
```

## Components provided by `applogger`

Following are some of the react native components that applogger provides with tracking.

- Button
- Pressable
- RefreshControl
- Switch
- TextInput
- TouchableHighlight
- TouchableOpacity
- TouchableWithoutFeedback

How to use these components ? - Just import these components from `applogger` instead of `react-native` and provide a testID.

Eg - To import TouchableWithoutFeedback :

```sh
import {TouchableWithoutFeedback} from 'applogger';

<TouchableWithoutFeedback testID={'some_test_id'} />
```

## Supported functions list

Following are few functions that have log tracking enabled in them.

- onChange
- onPress
- onLongPress
- onPressIn
- onPressOut
- onChangeText
- onContentSizeChange
- onEndEditing
- onFocus
- onKeyPress
- onLayout
- onScroll
- onSelectionChange
- onSubmitEditing
- onRefresh
- onValueChange

How to use these functions ? - No change, you can write it as you would normally do and the `applogger` will take care of the rest, provided your component is imported from `applogger`.

## Custom Tracking

You can use tracking for any other function that you choose, in addition to the ones listed above. `applogger` provides a track interface for custom tracking of activity. Here `type` and `params` are mandatory, while other fields are optional.

```sh
interface TrackInterface {
  id?: string;
  description?: string;
  type: string;
  params: any;
  ts?: number;
}
```

Here is an example for custom tracking using `applogger`. Consider keeping track of any error that occurs when loading the image. It's implementation could be as follows.

```sh
import {useCallback} from 'react';
import {Image} from 'react-native';
import {getLogTracker} from 'applogger';

function CustomTrackingDemo() {
    const imageTestID = 'custom_tracking_demo_image';

    const fnOnError = useCallback((error) => {
        const logTracker = getLogTracker();
        logTracker.track({
            description: `Encountered error on image load ${error}`,
            type: 'ImageLoadError',
            params: {
                testId: imageTestID,
              },
            },
        });
    }, []);

    return <Image src="image_url" testID={imageTestID} onError={fnOnError} />
}
```

## How to use Generic component:

The generic component from `appLogger` can be used to integrate app logger with any other component other than those specified above. The only difference would be that the developer would need to wrap the component or list of components in a `ComponentWrapper`. Apart from that, the wrapped components' logic stays unchanged; the developer needs to add the `testID` to the component to which he wishes to add log tracking. As it supports all `ViewProps`, the `ComponentWrapper` can be used in place of the `View` Component. As of now `ComponentWrapper` works only on a single level, which means it does not track action on children components of wrapped components.

Some snippets showing the usage of component wrapper:

```sh
import {ComponentWrapper} from ‘applogger’;

<ComponentWrapper>
    <Component testID="component_test_id" {...props}/>
</ComponentWrapper>
```

```sh
<ComponentWrapper>
    <Component1 testID="component1_test_id" {...props}/>
    <Component2 testID="component2_test_id" {...props}/>
    <Component3 testID="component3_test_id" {...props}/>
</ComponentWrapper>
```

## Contributors

- [Deepesh Kumar Nath](https://github.com/deepesh-kn)
- [Daksh Bhardwaj](https://github.com/dakshbhardwaj)
- [Dhruv Tailor](https://github.com/dhruvtailor7)
- [Mohit Charkha](https://github.com/mohitcharkha)
- [Harsh Siriah](https://github.com/harshsiri110)
- [Vinay Harwani](https://github.com/vinayharwani13)