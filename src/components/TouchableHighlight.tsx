import {capitalize} from 'lodash';
import React, {useCallback, useMemo} from 'react';
import {TouchableHighlight as RnTouchableHighlight} from 'react-native';
import LogTracker from '../LogTracker/index';

export function TouchableHighlight(props: any) {
  const onPress = useCallback(
    (event: any) => {
      if (props.testId) {
        let buttonName = capitalize(props.testId.replaceAll('_', ' '));
        console.log('buttonName: ', buttonName);
        console.log('buttonName.toLowerCase(): ', buttonName.toLowerCase());
        console.log(
          'buttonName.toLowerCase().endsWith(button): ',
          buttonName.toLowerCase().trim().endsWith('button'),
        );
        if (buttonName.toLowerCase().trim().endsWith('button')) {
        } else {
          buttonName = `${buttonName} button`;
        }

        LogTracker.track({
          stepDescription: `Tap on ${buttonName} (#${props.testId})`,
          type: 'Tap',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onPress(event);
    },
    [props],
  );

  const onLongPress = useCallback(
    (event: any) => {
      if (props.testId && props.onLongPress) {
        let buttonName = capitalize(props.testId.replaceAll('_', ' '));
        console.log('buttonName: ', buttonName);
        console.log('buttonName.toLowerCase(): ', buttonName.toLowerCase());
        console.log(
          'buttonName.toLowerCase().endsWith(button): ',
          buttonName.toLowerCase().trim().endsWith('button'),
        );
        if (buttonName.toLowerCase().trim().endsWith('button')) {
        } else {
          buttonName = `${buttonName} button`;
        }

        LogTracker.track({
          stepDescription: `LongPress on ${buttonName} (#${props.testId})`,
          type: 'Tap',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onLongPress(event);
    },
    [props],
  );

  const onPressIn = useCallback(
    (event: any) => {
      if (props.testId && props.onPressIn) {
        let buttonName = capitalize(props.testId.replaceAll('_', ' '));
        console.log('buttonName: ', buttonName);
        console.log('buttonName.toLowerCase(): ', buttonName.toLowerCase());
        console.log(
          'buttonName.toLowerCase().endsWith(button): ',
          buttonName.toLowerCase().trim().endsWith('button'),
        );
        if (buttonName.toLowerCase().trim().endsWith('button')) {
        } else {
          buttonName = `${buttonName} button`;
        }

        LogTracker.track({
          stepDescription: `Press In on ${buttonName} (#${props.testId})`,
          type: 'Tap',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onPressIn(event);
    },
    [props],
  );

  const onPressOut = useCallback(
    (event: any) => {
      if (props.testId && props.onPressOut) {
        let buttonName = capitalize(props.testId.replaceAll('_', ' '));
        console.log('buttonName: ', buttonName);
        console.log('buttonName.toLowerCase(): ', buttonName.toLowerCase());
        console.log(
          'buttonName.toLowerCase().endsWith(button): ',
          buttonName.toLowerCase().trim().endsWith('button'),
        );
        if (buttonName.toLowerCase().trim().endsWith('button')) {
        } else {
          buttonName = `${buttonName} button`;
        }

        LogTracker.track({
          stepDescription: `Press Out on ${buttonName} (#${props.testId})`,
          type: 'Tap',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onPressOut(event);
    },
    [props],
  );

  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPress;
    delete propsCopy.onLongPress;
    delete propsCopy.onPressIn;
    delete propsCopy.onPressOut;
    return propsCopy;
  }, [props]);

  return (
    <RnTouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...filteredProps}>
      {props.children}
    </RnTouchableHighlight>
  );
}
