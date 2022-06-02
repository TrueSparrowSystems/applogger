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
      <TouchableOpacity
        testID="homescreen_search_by_city_name"
        onPress={onSearchByCityPressed}
        style={styles.btn}>
        <Text>Search By City Name</Text>
      </TouchableOpacity>
      <TouchableHighlight
        testID="homescreen_search_by_zip_code"
        underlayColor={'red'}
        onPress={onSearchByCityPressed}>
        <View style={styles.btn}>
          <Text>Search By Zip Code</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginVertical: 20,
    padding: 20,
  },
});
