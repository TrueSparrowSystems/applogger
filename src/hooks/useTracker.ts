import {useCallback, useEffect, useRef} from 'react';
import {AppState, Keyboard} from 'react-native';
import {LogTypes} from '../constants/LogTypes';
import {getLogTracker} from '../LogTracker/index';

/**
 * @function useTracker Hook to track changes in navigation, keyboard activity and app states
 */
export function useTracker() {
  const logTracker = getLogTracker();
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      logTracker.track({
        description: 'Keyboard Shown',
        type: LogTypes.KeyboardState,
        params: {state: 'shown'},
      });
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      logTracker.track({
        description: 'Keyboard Hidden',
        type: LogTypes.KeyboardState,
        params: {state: 'hidden'},
      });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [logTracker]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // let appCurrentState = '';
      // if (
      //   appState.current.match(/inactive|background/) &&
      //   nextAppState === 'active'
      //   appCurrentState = 'App is in back'
      // ) {
      // }

      // appState.current = nextAppState;

      logTracker.track({
        description: `App state changed to ${nextAppState}`,
        type: LogTypes.AppState,
        params: {appState: nextAppState},
      });
    });

    return () => {
      subscription.remove();
    };
  }, [logTracker]);

  const screenNameRef = useRef('');
  const navigationRef: any = useRef();

  /**
   * @function setRef function to set navigation ref
   * @param  {any} (ref
   */
  const setRef = useCallback(
    (ref: any) => {
      navigationRef.current = ref;
    },
    [navigationRef],
  );

  /**
   * @function onNavigationStateChange to handle navigation state changes
   * @param  {} (
   */
  const onNavigationStateChange = useCallback(() => {
    if (!screenNameRef.current) {
      screenNameRef.current =
        navigationRef.current?.getRootState()?.routeNames?.[0];
    }
    const previousScreenName = screenNameRef.current;
    const currentScreenName = navigationRef.current?.getCurrentRoute()?.name;
    if (currentScreenName && previousScreenName !== currentScreenName) {
      logTracker.track({
        description: `Navigate to ${currentScreenName} screen`,
        type: LogTypes.Navigation,
        params: {currentScreenName, previousScreenName},
      });
    }
    screenNameRef.current = currentScreenName;
  }, [logTracker]);

  /**
   * @function setRef function to set navigation ref
   * @function onNavigationStateChange to handle navigation state changes
   */
  return {
    navigationRef: setRef,
    onNavigationStateChange,
  };
}
