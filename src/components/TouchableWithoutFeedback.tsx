import React from 'react';
import {
  TouchableWithoutFeedback as RnTouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableWithoutFeedback(props: TouchableWithoutFeedbackProps) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableWithoutFeedback {...filteredProps}>
      {props.children}
    </RnTouchableWithoutFeedback>
  );
}
