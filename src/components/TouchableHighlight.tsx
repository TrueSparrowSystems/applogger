import React from 'react';
import {
  TouchableHighlight as RnTouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function TouchableHighlight - Component for rendering the React Native TouchableHighlight component with tracking.
 * @param {TouchableHighlightProps} props - Object containing TouchableHighlight properties.
 * @returns {JSX} TouchableHighlight View.
 */
export function TouchableHighlight(
  props: TouchableHighlightProps,
): JSX.Element {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableHighlight {...filteredProps}>
      {props.children}
    </RnTouchableHighlight>
  );
}
