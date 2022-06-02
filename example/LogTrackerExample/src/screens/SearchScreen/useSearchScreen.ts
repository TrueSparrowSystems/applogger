import {useEffect, useState, useCallback} from 'react';
import {OPEN_WEATHER_API_KEY} from '@env';

export default function useSearchScreen() {
  const [toggleSearch, setToggleSearch] = useState('city');
  const [city, setCity] = useState('Toronto');
  const [postalCode, setPostalCode] = useState('L4W1S9');
  const [lat, setLat] = useState(43.6532);
  const [long, setLong] = useState(-79.3832);
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLatLongHandler = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${OPEN_WEATHER_API_KEY}`,
      )
        .then(res => res.json())
        .then(data => {
          setLat(data.coord.lat);
          setLong(data.coord.lon);
          resolve();
        })
        .catch(reject);
    });
  }, [city]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=${
        !isCelsius ? 'imperial' : 'metric'
      }&appid=${OPEN_WEATHER_API_KEY}`,
    )
      .then(res => res.json())
      .then(data => {
        setWeather(data);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, [lat, long, isCelsius]);

  const fetchByPostalHandler = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${OPEN_WEATHER_API_KEY}&components=postal_code:${postalCode}`,
      )
        .then(res => res.json())
        .then(data => {
          setLat(data.results[0].geometry.location.lat);
          setLong(data.results[0].geometry.location.lng);
          resolve();
        })
        .catch(reject);
    });
  }, [postalCode]);

  const fetchWeatherData = useCallback(() => {
    if (toggleSearch === 'city') {
      //api call
      return fetchLatLongHandler();
    }
    if (toggleSearch === 'postal') {
      return fetchByPostalHandler();
    }
  }, [fetchByPostalHandler, fetchLatLongHandler, toggleSearch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWeatherData().finally(() => {
      setRefreshing(false);
    });
  }, [fetchWeatherData]);

  const getTemperatureText = useCallback(() => {
    return isCelsius ? '°C' : '°F';
  }, [isCelsius]);

  return {
    refreshing,
    city,
    setCity,
    postalCode,
    setPostalCode,
    lat,
    setLat,
    long,
    setLong,
    weather,
    setWeather,
    toggleSearch,
    setToggleSearch,
    isCelsius,
    setIsCelsius,
    getTemperatureText,
    fetchWeatherData,
    onRefresh,
  };
}
