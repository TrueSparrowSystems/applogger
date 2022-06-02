import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/components/RootNavigation/RootNavigation';
import {useAppLogger, useTracker, HelperMenu} from 'applogger';

function App() {
  useAppLogger({port: 5561});
  const {navigationRef, onNavigationStateChange} = useTracker();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onNavigationStateChange}>
      <HelperMenu />
      <RootNavigation />
    </NavigationContainer>
  );
}

export default App;
