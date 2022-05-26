import {capitalize} from 'lodash';
import {useCallback} from 'react';
import LogTracker from '../LogTracker';

export function useLoggingFunctions(props: any) {
  const onPress = useCallback(
    (event: any) => {
      if (props.testID && props.onPress) {
        let buttonName = capitalize(props.testID.replaceAll('_', ' '));
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
          stepDescription: `Tap on ${buttonName} (#${props.testID})`,
          type: 'Tap',
          params: {
            testID: props.testID,
          },
        });
      }

      props.onPress(event);
    },
    [props],
  );

  const onLongPress = useCallback(
    (event: any) => {
      if (props.testID && props.onLongPress) {
        let buttonName = capitalize(props.testID.replaceAll('_', ' '));
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
          stepDescription: `LongPress on ${buttonName} (#${props.testID})`,
          type: 'Tap',
          params: {
            testID: props.testID,
          },
        });
      }

      props.onLongPress(event);
    },
    [props],
  );

  const onPressIn = useCallback(
    (event: any) => {
      if (props.testID && props.onPressIn) {
        let buttonName = capitalize(props.testID.replaceAll('_', ' '));
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
          stepDescription: `Press In on ${buttonName} (#${props.testID})`,
          type: 'Tap',
          params: {
            testID: props.testID,
          },
        });
      }

      props.onPressIn(event);
    },
    [props],
  );

  const onPressOut = useCallback(
    (event: any) => {
      if (props.testID && props.onPressOut) {
        let buttonName = capitalize(props.testID.replaceAll('_', ' '));
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
          stepDescription: `Press Out on ${buttonName} (#${props.testID})`,
          type: 'Tap',
          params: {
            testID: props.testID,
          },
        });
      }

      props.onPressOut(event);
    },
    [props],
  );

  return {
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
  };
}
