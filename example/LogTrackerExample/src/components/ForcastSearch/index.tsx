import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const ForecastSearch = ({
  toggleSearch,
  setToggleSearch,
  city,
  setCity,
  fetchLatLongHandler,
  fetchByPostalHandler,
  setPostalCode,
  postalCode,
}) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.searchBy}>
        <Text style={styles.buttonLabel}>Search By</Text>
        <Button
          style={styles.buttons}
          title="City"
          color={toggleSearch === 'city' ? 'white' : 'rgba(255, 255, 255, 0.6)'}
          accessibilityLabel="Search Weather By City"
          onPress={setToggleByCity}
        />
        <Button
          style={styles.buttons}
          title="Postal Code/Zip"
          color={toggleSearch === 'city' ? 'rgba(255, 255, 255, 0.6)' : 'white'}
          accessibilityLabel="Search Weather By ZIP/Postal Code"
          onPress={setToggleByPostal}
        />
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
