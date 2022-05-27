import {useCallback, useEffect, useRef} from 'react';
import {AppState, Keyboard} from 'react-native';
import {LogTypes} from '../constants/LogTypes';
import LogTracker from '../LogTracker/index';

export function useTracker() {
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      LogTracker.track({
        description: 'Keyboard Shown',
        type: LogTypes.KeyboardState,
        params: {state: 'shown'},
      });
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      LogTracker.track({
        description: 'Keyboard Hidden',
        type: LogTypes.KeyboardState,
        params: {state: 'hidden'},
      });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // let appCurrentState = '';
      // if (
      //   appState.current.match(/inactive|background/) &&
      //   nextAppState === 'active'
      //   appCurrentState = 'App is in back'
      // ) {
      //   console.log('App has come to the foreground!');
      // }

      // appState.current = nextAppState;

      LogTracker.track({
        description: `App state changed to ${nextAppState}`,
        type: LogTypes.AppState,
        params: {appState: nextAppState},
      });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const screenNameRef = useRef('');
  const navigationRef: any = useRef();

  const setRef = useCallback(
    ref => {
      navigationRef.current = ref;
    },
    [navigationRef],
  );

  const onNavigationStateChange = useCallback(() => {
    const previousScreenName = screenNameRef.current;
    const currentScreenName = navigationRef.current?.getCurrentRoute()?.name;
    console.log({previousScreenName, currentScreenName});
    if (currentScreenName && previousScreenName !== currentScreenName) {
      console.log('currentScreenName is ', currentScreenName, 'now track this');
      LogTracker.track({
        description: `Navigate to ${currentScreenName} screen`,
        type: LogTypes.Navigation,
        params: {currentScreenName, previousScreenName},
      });
    }
    screenNameRef.current = currentScreenName;
  }, []);
  return {
    navigationRef: setRef,
    onNavigationStateChange,
  };
}
