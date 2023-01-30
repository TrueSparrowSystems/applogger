# How to run the app

- Please make sure you have installed necessary dependencies depending on your development OS and target OS. Follow the guidelines given on official React Native documentation for installing dependencies: https://facebook.github.io/react-native/docs/getting-started#
- Create the Open Weather API key from the Open Weather Map console. Follow [these step](https://openweathermap.org/appid#apikey) to setup create the API key.

- Clone the project
  ```
  git clone https://github.com/TrueSparrowSystems/applogger.git
  cd example/LogTrackerExample
  ```
- Create .env file in the root directory of the project and paste the following lines.
  ```
   OPEN_WEATHER_API_KEY = OPEN_WEATHER_API_KEY_HERE
  ```
- Install the dependencies.
  ```
   npm i
  ```
- For iOS
  ```
   cd ios && pod install && cd ..
   npx react-native run-ios
  ```
- For Android
  ```
   npx react-native run-android
  ```
