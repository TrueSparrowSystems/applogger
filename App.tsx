import React from 'react';
import {SafeAreaView, View, StatusBar, StyleSheet, Text} from 'react-native';

import HelperMenu from './src/components/HelperMenu';
import {TouchableOpacity} from './src/components/TouchableOpacity';
import {useWebServer} from './src/hooks/useWebServer';

const App = () => {
  useWebServer();

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <HelperMenu />
        <TouchableOpacity
          onPress={() => {}}
          testID="Touchable Opacity"
          style={{width: 100, height: 50, backgroundColor: 'green'}}>
          <Text>Touchable</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%', backgroundColor: 'red'},
});

export default App;
