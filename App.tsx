import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {TextInput} from './src/components/TextInput';
import {TouchableOpacity} from './src/components/TouchableOpacity';
import {useWebServer} from './src/hooks/useWebServer';

const App = () => {
  useWebServer();
  return (
    <SafeAreaView>
      <View style={{height: '100%', width: '100%', backgroundColor: 'red'}}>
        <TextInput
          onChangeText={() => {}}
          testID="text-input-test"
          style={{height: 20, borderWidth: 1}}
        />
        <TouchableOpacity
          style={{height: 50, width: 50, backgroundColor: 'green'}}
          testID="touchable-opacity-test"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
