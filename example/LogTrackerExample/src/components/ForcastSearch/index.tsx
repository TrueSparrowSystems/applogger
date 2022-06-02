import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Switch,
} from 'react-native';

const ForecastSearch = ({
  toggleSearch,
  setToggleSearch,
  city,
  setCity,
  fetchLatLongHandler,
  fetchByPostalHandler,
  setPostalCode,
  postalCode,
  isCelsius,
  setIsCelsius,
}) => {
  const navigation = useNavigation();
  const handleSubmit = e => {
    if (toggleSearch === 'city') {
      //api call
      fetchLatLongHandler();
    }
    if (toggleSearch === 'postal') {
      fetchByPostalHandler();
    }
  };

  const setToggleByCity = () => {
    setToggleSearch('city');
  };

  const setToggleByPostal = () => {
    setToggleSearch('postal');
  };

  const onTemperatureChange = useCallback(value => {
    setIsCelsius(value);
  }, []);

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBy}>
        <Pressable onPress={() => onBackPress()}>
          <Text style={styles.buttonLabel}>Back</Text>
        </Pressable>
        {toggleSearch == 'city' ? (
          <Button
            style={styles.buttons}
            title="City"
            color={
              toggleSearch === 'city' ? 'white' : 'rgba(255, 255, 255, 0.6)'
            }
            accessibilityLabel="Search Weather By City"
            onPress={setToggleByCity}
          />
        ) : (
          <Button
            style={styles.buttons}
            title="Postal Code/Zip"
            color={
              toggleSearch === 'city' ? 'rgba(255, 255, 255, 0.6)' : 'white'
            }
            accessibilityLabel="Search Weather By ZIP/Postal Code"
            onPress={setToggleByPostal}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.buttonLabel}>°F</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isCelsius ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onTemperatureChange}
            value={isCelsius}
          />
          <Text style={styles.buttonLabel}>°C</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchCity}
        onChangeText={toggleSearch === 'city' ? setCity : setPostalCode}
        value={toggleSearch === 'city' ? city : postalCode}
        placeholder={
          toggleSearch === 'city' ? 'Search By City' : 'Search By Postal Code'
        }
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  buttons: {
    color: 'black',
    backgroundColor: 'gray',
  },
  searchBy: {
    flexDirection: 'row',
    color: 'white',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%',
    maxWidth: 700,
  },
  buttonLabel: {
    color: 'white',
    marginRight: 10,
  },
  searchCity: {
    height: 50,
    margin: 12,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '95%',
    maxWidth: 700,
  },
});

export default ForecastSearch;
