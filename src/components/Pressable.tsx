import {capitalize} from 'lodash';
import React, {useCallback, useMemo} from 'react';
import {Pressable as RnPressable} from 'react-native';
import LogTracker from '../LogTracker/index';

export function TouchableOpacity(props: any) {
  const onPress = useCallback(
    (event: any) => {
      if (props.testId && props.onPress) {
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
          stepDescription: `Tap on ${buttonName} (#${props.testId})`,
          type: 'PressIn',
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
          stepDescription: `Tap on ${buttonName} (#${props.testId})`,
          type: 'PressOut',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onPressOut(event);
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
          stepDescription: `Tap on ${buttonName} (#${props.testId})`,
          type: 'LongPress',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onLongPress(event);
    },
    [props],
  );

  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPress;
    delete propsCopy.onPressIn;
    delete propsCopy.onPressOut;
    delete propsCopy.onLongPress;
    return propsCopy;
  }, [props]);

  return (
    <RnPressable
      {...filteredProps}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}>
      {props.children}
    </RnPressable>
  );
}
