import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTracker} from 'applogger';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/components/RootNavigation/RootNavigation';
import {LogTrackerContainer} from 'applogger';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {navigationRef, onNavigationStateChange} = useTracker();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onNavigationStateChange}>
      <LogTrackerContainer>
        <RootNavigation />
      </LogTrackerContainer>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
