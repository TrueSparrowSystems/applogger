<h1 align="center">
  <a href="https://plgworks.com/applogger">
    AppLogger </a>
</h1>

<div align="center">
 <image src="https://user-images.githubusercontent.com/22423684/190075493-4df6c7fc-14c5-4684-9c63-1aff15113a2d.png" />
</div>
<p align="center">
 <a href="https://github.com/PLG-Works/applogger/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="AppLogger is released under the MIT license." />
  </a>
    <a href="https://www.npmjs.org/package/react-native">
    <img src="https://img.shields.io/npm/v/@plgworks/applogger?color=brightgreen&label=npm%20package" alt="AppLogger Current npm package version." />
  </a>
</p>

# Overview

`AppLogger` is a React Native mobile application framework that helps in minimizing QA issue-reporting time and developer debugging time by providing a web interface for the logs generated and steps taken by the user on a device using the device's IP address. The user can keep track of their sessions and logs, as well as upload, download, and delete them.

## Why AppLogger?

Whenever an issue is reported, developers need issue reproducible steps along with some data to understand, debug and fix it. A lot of time, finding out these reproducible steps becomes a time-consuming effort.

On the developer side, QA data isn't always accurate for replicating the problem, and incomplete data can complicate troubleshooting. As a result, debugging time increases, and the issue may go unresolved since it is not reproducible.

To solve these problems, we need to track the user actions and application state and allow them to be shared easily.

`AppLogger` provides React Native components with customized tracking to minimize the integration effort in any existing or a new application. It also provides a generic wrapper that can be used with any React Native component. A simple `track` function can be used by developers to provide tracking logic to custom methods.

Developers can access the app sessions including the steps and associated logs via the web interface using the device's IP address. The web interface includes a session dashboard with a list of sessions and a session details page that includes device information as well as user action and developer logs.

### Other features of the AppLogger:

- Session management - from the helper menu, the user can stop the current session, start a new one, and can temporarily disable tracking in the current session.
- Download Logs - session logs can be downloaded in HTML or JSON format from the web interface.
- Upload Logs - helper menu allows tracked session logs to be uploaded on any third party services. To use this feature, you must implement the upload function.
- Delete Logs - from the helper menu user can delete session logs.

**Important Note:** The Web Server would work only in a LAN connection i.e. both devices (one on which application is running, other on which web interface is being accessed) should be on the same network. Also, the application must be running in foreground.

## Sample App

We have provided a [sample app](https://github.com/PLG-Works/app-logger/tree/master/example/LogTrackerExample) for implementation reference and a quick sneak-peek.

# Installation

```sh
npm install @plgworks/applogger --save
```

### Add Dependencies

`AppLogger` has some peer dependencies. It is recommended that you follow the installation instructions of each package to verify that it is properly configured.

- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- [react-native-device-info](https://www.npmjs.com/package/react-native-device-info)
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values)
- [react-native-http-bridge](https://www.npmjs.com/package/@kingstinct/react-native-http-bridge)
- [react-native-network-info](https://www.npmjs.com/package/react-native-network-info)
- [react-native-shake](https://www.npmjs.com/package/react-native-shake)
- [react-native-exit-app](https://www.npmjs.com/package/react-native-exit-app)
- [react-native-exception-handler](https://www.npmjs.com/package/react-native-exception-handler)

```sh
npm install @react-native-async-storage/async-storage react-native-device-info react-native-fs react-native-get-random-values react-native-http-bridge react-native-network-info react-native-shake react-native-exit-app react-native-exception-handler
```

Navigate to your ios folder and run:

```sh

cd ios

pod install
```

# Usage

To get started, you'll need to call the `useAppLogger` hook in your project's root file. This hook allows you to start and stop the web server, which is necessary for viewing the logs.

`useAppLogger` hook requires a prop of type `AppLoggerParams` as mentioned below.

```typescript
type AppLoggerParams = {
  port?: number;
  loggerConfig?: LogTrackerConfigInterface;
};
```

`port` is an optional prop on which the server should start, default port is `5561`.
`loggerConfig` is an object of type `LogTrackerConfigInterface`. It's used to configure `AppLogger`. If not provided, it will use default configuration.

```typescript
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

We can configure the following parameters:

- `writeFrequencyInSeconds` - frequency in which logs should be written in storage, default value is `5`.
- `uploadLogs` - Function to upload the logs to any third party storage serivce like s3. Upload will not work unless developer provides a function for it.
- `clearStorageOnLogUpload` - Boolean to clear the storage when logs are uploaded.
- `isTrackingDisabled` - Flag to disable log tracking. Default values - for production env : true, for dev env : false.
- `logRotateDurationInHours` - Flag to clear the logs after certain intervals. If not provided, it will not automatically clear the logs from storage.
- `sensitiveDataKeywords` - Array containing sensitive keys which when encountered in params will be redacted.

Here is a code snippet to configure `AppLogger` on port 8000.

```javascript
import {useAppLogger, HelperMenu} from '@plgworks/AppLogger';

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

  const AppLoggerParams = {
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

  const {navigationRef, onNavigationStateChange} =
    useAppLogger(AppLoggerParams);

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

The helper menu can now be accessed by **shaking your device**.
This will enable you to do the following things:

- Share server URL.
- Upload logs.
- Delete Logs.
- Pause/resume current session.
- Stop current session and start a new session.

You can access your logs using the link below.

```
<your-ip-address>:<port>/session
```

For example:

```
192.168.0.1:8000/session
```

This link can be shared from the `Share server URL` option in the helper menu.

## Components provided by `AppLogger`

Following are some of the [React Native components](https://reactnative.dev/docs/components-and-apis) that AppLogger provides with tracking.

- Button
- Pressable
- RefreshControl
- Switch
- TextInput
- TouchableHighlight
- TouchableOpacity
- TouchableWithoutFeedback

How to use these components? Just import these components from `@plgworks/AppLogger` instead of `react-native` and provide a testID.

Eg - To import TouchableWithoutFeedback :

```javascript
import {TouchableWithoutFeedback} from '@plgworks/AppLogger';

<TouchableWithoutFeedback testID={'some_test_id'} />;
```

## How to use Generic component

- The generic component from `AppLogger` can be used to enable tracking for any component other than those listed above.
  - The only additional step would be that to wrap the component (or list of components) in a `ComponentWrapper` and provide a `testID` to those components. Apart from that, the wrapped components' logic stays unchanged.
- As it supports all `ViewProps`, the `ComponentWrapper` can be used in place of the `View` Component.
- As of now `ComponentWrapper` works only on a single level, which means it does not track action on children components of wrapped components.

Example snippets:

```javascript
import {ComponentWrapper} from ‘@plgworks/AppLogger’;

<ComponentWrapper>
    <Component testID="component_test_id" {...props}/>
</ComponentWrapper>
```

```javascript
import {ComponentWrapper} from ‘@plgworks/AppLogger’;
<ComponentWrapper>
  <Component1 testID="component1_test_id" {...props} />
  <Component2 testID="component2_test_id" {...props} />
  <Component3 testID="component3_test_id" {...props} />
</ComponentWrapper>
```

## Supported functions list

Following are the functions that have log tracking enabled in them.

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

How to use these functions? No change, you can write it as you would normally do and the `AppLogger` will take care of the rest, provided your component is imported from `@plgworks/AppLogger` or wrapped inside `ComponentWrapper`.

## Custom Tracking

You can use tracking for any other function that you choose, in addition to the ones listed above. `AppLogger` provides a track interface for custom tracking of activity. Here `type` and `params` are mandatory, while other fields are optional.

```typescript
interface TrackInterface {
  id?: string;
  description?: string;
  type: string;
  params: any;
  ts?: number;
}
```

Here is an example for custom tracking using `AppLogger`. Consider keeping track of any error that occurs when loading the image. It's implementation could be as follows.

```javascript
import {useCallback} from 'react';
import {Image} from 'react-native';
import {getLogTracker} from '@plgworks/AppLogger';

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

## Screenshots

### Sample App

<table>
<tr>
  <td>
<img width="300" src="https://user-images.githubusercontent.com/87412080/172326209-0a63342b-83ef-4e60-8483-435661ba2615.png">
      </td>
     <td>
<img width="300" src="https://user-images.githubusercontent.com/86604753/172822891-ffe2ca97-ff86-4997-b3f9-c4cba7c4eac7.png">
       </td>
   <td>
<img width="300" src="https://user-images.githubusercontent.com/87412080/172326232-66f36f17-770c-4a9b-849d-910bb87b24ac.png">
        </td>
  </tr>
  </table>
  
### Web Interface
<img width="1158" alt="Screenshot 2022-09-15 at 10 19 58 AM" src="https://user-images.githubusercontent.com/22423684/190317302-f49ff346-f64b-410b-a1f8-e0b024c0a917.png">
<img width="1784" alt="Screenshot 2022-09-15 at 10 15 10 AM" src="https://user-images.githubusercontent.com/22423684/190317297-1e823f15-bd40-407e-a999-ed79ec2b187a.png">
<img width="1699" alt="Screenshot 2022-09-15 at 10 15 29 AM" src="https://user-images.githubusercontent.com/22423684/190317277-ed5d9b2d-68c1-4b2b-a03d-f3d449dbde36.png">

## Contribution

We welcome more helping hands to make AppLogger better. Feel free to report issues, raise PRs for fixes & enhancements.

<p align="left">Built with :heart: by <a href="https://plgworks.com/" target="_blank">PLG Works</a></p>

## Contributors

- [Deepesh Kumar Nath](https://github.com/deepesh-kn)
- [Daksh Bhardwaj](https://github.com/dakshbhardwaj)
- [Dhruv Tailor](https://github.com/dhruvtailor7)
- [Mohit Charkha](https://github.com/mohitcharkha)
- [Harsh Siriah](https://github.com/harshsiri110)
- [Vinay Harwani](https://github.com/vinayharwani13)
