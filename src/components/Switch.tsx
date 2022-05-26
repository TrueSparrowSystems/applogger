import {capitalize} from 'lodash';
import React, {useCallback, useMemo} from 'react';
import {Switch as RnSwitch} from 'react-native';
import LogTracker from '../LogTracker/index';

export function Switch(props: any) {
  const onChange = useCallback(
    (event: any) => {
      if (props.testId && props.onChange) {
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
          stepDescription: `On Change called for ${buttonName} (#${props.testId})`,
          type: 'Tap',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onChange(event);
    },
    [props],
  );

  const onValueChange = useCallback(
    (event: any) => {
      if (props.testId && props.onValueChange) {
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
          stepDescription: `onValue change called for ${buttonName} (#${props.testId})`,
          type: 'Tap',
          params: {
            testId: props.testId,
          },
        });
      }

      props.onValueChange(event);
    },
    [props],
  );

  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onChange;
    delete propsCopy.onValueChange;
    return propsCopy;
  }, [props]);

  return (
    <RnSwitch
      onChange={onChange}
      onValueChange={onValueChange}
      {...filteredProps}>
      {props.children}
    </RnSwitch>
  );
}
