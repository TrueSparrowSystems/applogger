import {capitalize} from 'lodash';
import {useCallback, useMemo} from 'react';
import {LogTypes} from '../constants/LogTypes';
import LogTracker from '../LogTracker';

export function useLoggingFunctions(props: any, type: string) {
  const onPress = useCallback(
    (event: any) => {
      if (props.testID && props.onPress) {
        let componentName = capitalize(props.testID.replaceAll('_', ' '));
        console.log('componentName: ', componentName);

        if (!componentName.toLowerCase().trim().endsWith(type)) {
          componentName = `${componentName} ${type}`;
        }

        LogTracker.track({
          description: `Tap on ${componentName} (#${props.testID})`,
          type: LogTypes.Tap,
          params: {
            testID: props.testID,
          },
        });
        props.onPress(event);
      }
    },
    [props, type],
  );

  const onLongPress = useCallback(
    (event: any) => {
      if (props.testID && props.onLongPress) {
        let componentName = capitalize(props.testID.replaceAll('_', ' '));
        console.log('componentName: ', componentName);

        if (!componentName.toLowerCase().trim().endsWith(type)) {
          componentName = `${componentName} ${type}`;
        }

        LogTracker.track({
          description: `LongPress on ${componentName} (#${props.testID})`,
          type: LogTypes.Tap,
          params: {
            testID: props.testID,
          },
        });
        props.onLongPress(event);
      }
    },
    [props, type],
  );

  const onPressIn = useCallback(
    (event: any) => {
      if (props.testID && props.onPressIn) {
        let componentName = capitalize(props.testID.replaceAll('_', ' '));
        console.log('componentName: ', componentName);

        if (!componentName.toLowerCase().trim().endsWith(type)) {
          componentName = `${componentName} ${type}`;
        }

        LogTracker.track({
          description: `Press In on ${componentName} (#${props.testID})`,
          type: LogTypes.Tap,
          params: {
            testID: props.testID,
          },
        });
        props.onPressIn(event);
      }
    },
    [props, type],
  );

  const onPressOut = useCallback(
    (event: any) => {
      if (props.testID && props.onPressOut) {
        let componentName = capitalize(props.testID.replaceAll('_', ' '));
        console.log('componentName: ', componentName);

        if (!componentName.toLowerCase().trim().endsWith(type)) {
          componentName = `${componentName} ${type}`;
        }

        LogTracker.track({
          description: `Press Out on ${componentName} (#${props.testID})`,
          type: LogTypes.Tap,
          params: {
            testID: props.testID,
          },
        });
      }

      props.onPressOut(event);
    },
    [props, type],
  );

  const onRefresh = useCallback(() => {
    const testId = props.testID;
    if (testId && props.onRefresh) {
      let componentName = capitalize(props.testID.replaceAll('_', ' '));
      console.log('componentName: ', componentName);

      if (!componentName.toLowerCase().trim().endsWith(type)) {
        componentName = `${componentName} ${type}`;
      }

      LogTracker.track({
        description: `on Refresh called for ${componentName} (#${testId})`,
        type: LogTypes.Refresh,
        params: {
          testId: testId,
        },
      });
    }
    props.onRefresh?.();
  }, [props, type]);

  const filteredProps = useMemo(() => {
    let propsCopy = {...props};
    if (propsCopy.onPress) {
      delete propsCopy.onPress;
      propsCopy = {...propsCopy, onPress};
    }
    if (propsCopy.onLongPress) {
      delete propsCopy.onLongPress;
      propsCopy = {...propsCopy, onLongPress};
    }
    if (propsCopy.onPressIn) {
      delete propsCopy.onPressIn;
      propsCopy = {...propsCopy, onPressIn};
    }
    if (propsCopy.onPressOut) {
      delete propsCopy.onPressOut;
      propsCopy = {...propsCopy, onPressOut};
    }
    if (propsCopy.onRefresh) {
      delete propsCopy.onRefresh;
      propsCopy = {...propsCopy, onRefresh};
    }
    return propsCopy;
  }, [onLongPress, onPress, onPressIn, onPressOut, onRefresh, props]);

  return {
    filteredProps,
  };
}
