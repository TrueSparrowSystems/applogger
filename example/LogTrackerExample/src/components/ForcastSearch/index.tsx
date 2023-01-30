import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Pressable, Switch} from '@truesparrow/applogger';

const ForecastSearch = ({
  toggleSearch,
  city,
  setCity,
  fetchWeatherData,
  setPostalCode,
  postalCode,
  isCelsius,
  setIsCelsius,
}) => {
  const navigation = useNavigation();
  const handleSubmit = e => {
    fetchWeatherData();
  };

  const onTemperatureChange = useCallback(
    value => {
      setIsCelsius(value);
    },
    [setIsCelsius],
  );

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBy}>
        <Pressable onPress={() => onBackPress()}>
          <Text style={styles.buttonLabel}>Back</Text>
        </Pressable>
        {/* {toggleSearch == 'city' ? (
          <Button
            style={styles.buttons}
            title="Postal Code/Zip"
            color={
              toggleSearch === 'city' ? 'rgba(255, 255, 255, 0.6)' : 'black'
            }
            accessibilityLabel="Search Weather By ZIP/Postal Code"
            onPress={setToggleByPostal}
          />
        ) : (
          <Button
            style={styles.buttons}
            title="City"
            color={
              toggleSearch === 'city' ? 'black' : 'rgba(255, 255, 255, 0.6)'
            }
            accessibilityLabel="Search Weather By City"
            onPress={setToggleByCity}
          />
        )} */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.buttonLabel}>°F</Text>
          <Switch
            testID={'temp_unit_change_switch'}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isCelsius ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onTemperatureChange}
            value={isCelsius}
          />
          <Text style={styles.buttonLabel}>°C</Text>
        </View>
      </View>

      <Text style={{color: 'white'}}>Text Input Wrapper</Text>
      <TextInput
        testID={'weather_search_text_field'}
        style={styles.searchCity}
        onChangeText={toggleSearch === 'city' ? setCity : setPostalCode}
        value={toggleSearch === 'city' ? city : postalCode}
        placeholder={
          'Enter City Name'
          // toggleSearch === 'city' ? 'Search By City' : 'Search By Postal Code'
        }
        placeholderTextColor="gray"
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
    borderWidth: 1,
    borderColor: 'red',
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
    marginTop: 5,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '95%',
    maxWidth: 700,
    color: 'black',
  },
});

export default ForecastSearch;
