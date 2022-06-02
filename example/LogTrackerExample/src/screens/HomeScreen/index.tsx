import {useNavigation} from '@react-navigation/native';
import {TouchableHighlight, TouchableOpacity} from 'applogger';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const onSearchByCityPressed = useCallback(() => {
    navigation.navigate('SearchScreen');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>TouchableOpacity Wrapper Example</Text>
        <TouchableOpacity
          testID="homescreen_search_by_city_name"
          onPress={onSearchByCityPressed}
          style={styles.btnContainer}>
          <Text>Search By City Name</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text>TouchableHighlight Wrapper Example</Text>
        <TouchableHighlight
          style={styles.btnContainer}
          testID="homescreen_search_by_zip_code"
          underlayColor={'darkgrey'}
          onPress={onSearchByCityPressed}>
          <Text>Search By Zip Code</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          1. Shake the device to open the helper menu.
        </Text>
        <Text style={styles.text}>
          2. Open the logger UI using the link in the helper menu to observe the
          generated logs.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  textContainer: {
    justifyContent: 'center',
    marginVertical: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
});
