import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const AppStates = {
  Active: 'active',
  InActive: 'inactive',
  Background: 'background',
};

export const useAppStateListener = () => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => appStateSubscription.remove();
  });
  return {
    isAppInBackground:
      appState === AppStates.InActive || appState === AppStates.Background,
  };
};
