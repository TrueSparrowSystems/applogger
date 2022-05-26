import {capitalize} from 'lodash';
import React, {useCallback, useMemo} from 'react';
import {Button as RnButton} from 'react-native';
import LogTracker from '../LogTracker/index';

export function Button(props: any) {
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

  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPress;
    return propsCopy;
  }, [props]);

  return (
    <RnButton onPress={onPress} {...filteredProps}>
      {props.children}
    </RnButton>
  );
}
