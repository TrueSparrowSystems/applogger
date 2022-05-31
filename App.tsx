import React from 'react';
import {SafeAreaView, View, StatusBar, StyleSheet} from 'react-native';

import HelperMenu from './src/components/HelperMenu';
import {useWebServer} from './src/hooks/useWebServer';

const App = () => {
  useWebServer();

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <HelperMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%', backgroundColor: 'red'},
});

export default App;
