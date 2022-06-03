import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/components/RootNavigation/RootNavigation';
import {useAppLogger, HelperMenu} from 'applogger';

function App() {
  const {navigationRef, onNavigationStateChange} = useAppLogger({port: 5561});

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onNavigationStateChange}>
      <RootNavigation />
      <HelperMenu />
    </NavigationContainer>
  );
}

export default App;
