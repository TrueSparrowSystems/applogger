import React, {useEffect, useState, useCallback} from 'react';
import {OPEN_WEATHER_API_KEY} from '@env';
export default function useSearchScreen() {
  const [toggleSearch, setToggleSearch] = useState('city');
  const [city, setCity] = useState('Toronto');
  const [postalCode, setPostalCode] = useState('L4W1S9');
  const [lat, setLat] = useState(43.6532);
  const [long, setLong] = useState(-79.3832);
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(false);

  const fetchLatLongHandler = () => {
    console.log('OPEN_WEATHER_API_KEY', OPEN_WEATHER_API_KEY);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${OPEN_WEATHER_API_KEY}`,
    )
      .then(res => res.json())
      .then(data => {
        setLat(data.coord.lat);
        setLong(data.coord.lon);
      });
  };

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

  const fetchByPostalHandler = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${OPEN_WEATHER_API_KEY}&components=postal_code:${postalCode}`,
    )
      .then(res => res.json())
      .then(data => {
        setLat(data.results[0].geometry.location.lat);
        setLong(data.results[0].geometry.location.lng);
      });
  };

  const getTemperatureText = useCallback(
    (isCelsius?: boolean) => {
      return isCelsius ? '°C' : '°F';
    },
    [isCelsius],
  );

  return {
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
    fetchLatLongHandler,
    fetchByPostalHandler,
    isCelsius,
    setIsCelsius,
    getTemperatureText,
  };
}
