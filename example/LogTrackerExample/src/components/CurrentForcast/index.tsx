import {useMountLogger} from 'applogger';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CurrentForecast = ({currentWeather, temperatureText}) => {
  useMountLogger('current_forecast', {currentWeather});

  return (
    <View style={styles.currentView}>
      <Text style={styles.timeZone}>{currentWeather.timezone}</Text>
      <View style={styles.mainInfoContainer}>
        <View style={styles.currentTempView}>
          {currentWeather.current && (
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@2x.png`,
              }}
              resizeMode={'contain'}
            />
          )}
          <Text style={styles.currentDegree}>
            {Math.round(currentWeather.current && currentWeather.current.temp)}
            {temperatureText}
          </Text>
        </View>
        <Text style={styles.description}>
          {currentWeather.current &&
            currentWeather.current.weather[0].description}
        </Text>
      </View>
      <View style={styles.secondaryInfoContainer}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Feels</Text>
            <Text style={styles.details}>
              {currentWeather.current &&
                Math.round(currentWeather.current.feels_like)}
              {temperatureText}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Low</Text>
            <Text style={styles.details}>
              {currentWeather.daily &&
                Math.round(currentWeather.daily[0].temp.min)}
              {temperatureText}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>High</Text>
            <Text style={styles.details}>
              {currentWeather.daily &&
                Math.round(currentWeather.daily[0].temp.max)}
              {temperatureText}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Wind</Text>
            <Text style={styles.details}>
              {currentWeather.current && currentWeather.current.wind_speed} m/s
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Humidity</Text>
            <Text style={styles.details}>
              {currentWeather.current && currentWeather.current.humidity}%
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Rain</Text>
            <Text style={styles.details}>
              {currentWeather.daily > 0 ? currentWeather.daily[0].rain : '0'} MM
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  currentTempView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainInfoContainer: {
    alignItems: 'center',
  },
  description: {
    color: 'white',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  secondaryInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    width: '95%',
    maxWidth: 478,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  timeZone: {
    color: 'white',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 15,
  },
  currentDegree: {
    color: 'white',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 60,
  },
  row: {
    flexDirection: 'row',
    width: ' 100%',
    justifyContent: 'space-between',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 18,
    color: 'black',
  },
  details: {
    color: 'black',
    fontSize: 15,
    textTransform: 'capitalize',
  },
});

export default CurrentForecast;
