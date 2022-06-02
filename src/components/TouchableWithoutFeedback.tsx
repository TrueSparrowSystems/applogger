import React from 'react';
import {
  TouchableWithoutFeedback as RnTouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function TouchableWithoutFeedback - Component for rendering the React Native TouchableWithoutFeedback component with tracking.
 * @param {TouchableWithoutFeedbackProps} props - Object containing TouchableWithoutFeedback properties.
 * @returns {JSX} TouchableWithoutFeedback View.
 */
export function TouchableWithoutFeedback(
  props: TouchableWithoutFeedbackProps,
): JSX.Element {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableWithoutFeedback {...filteredProps}>
      {props.children}
    </RnTouchableWithoutFeedback>
  );
}
