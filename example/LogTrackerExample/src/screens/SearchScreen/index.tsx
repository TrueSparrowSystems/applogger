import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
} from 'react-native';
import CurrentForecast from '../../components/CurrentForcast';
import DailyForecast from '../../components/DailyForecast';
import ForecastSearch from '../../components/ForcastSearch';
import {bgImage} from '../../assets/index';
import useSearchScreen from './useSearchScreen';

export default function SearchScreen() {
  const {
    city,
    setCity,
    fetchLatLongHandler,
    toggleSearch,
    setToggleSearch,
    fetchByPostalHandler,
    setPostalCode,
    postalCode,
    weather,
    isCelsius,
    setIsCelsius,
    getTemperatureText,
  } = useSearchScreen();
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={{width: '100%', height: '100%'}}>
        <ForecastSearch
          city={city}
          setCity={setCity}
          fetchLatLongHandler={fetchLatLongHandler}
          toggleSearch={toggleSearch}
          setToggleSearch={setToggleSearch}
          fetchByPostalHandler={fetchByPostalHandler}
          setPostalCode={setPostalCode}
          postalCode={postalCode}
          isCelsius={isCelsius}
          setIsCelsius={setIsCelsius}
        />
        <CurrentForecast
          currentWeather={weather}
          temperatureText={getTemperatureText(isCelsius)}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          <View style={styles.futureForecastContainer}>
            {weather.daily ? (
              weather.daily.map((day, index) => {
                if (index !== 0) {
                  return (
                    <DailyForecast
                      key={day.dt}
                      day={day}
                      temperatureText={getTemperatureText(isCelsius)}
                    />
                  );
                }
              })
            ) : (
              <Text style={styles.noWeather}>No Weather to show</Text>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
  },
  noWeather: {
    textAlign: 'center',
    color: 'white',
  },
  futureForecastContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
