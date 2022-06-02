import React from 'react';
import {
  TouchableOpacity as RnTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function TouchableOpacity - Component for rendering the React Native TouchableOpacity component with tracking.
 * @param {TouchableOpacityProps} props - Object containing TouchableOpacity properties.
 * @returns {JSX} TouchableOpacity View.
 */
export function TouchableOpacity(props: TouchableOpacityProps): JSX.Element {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableOpacity {...filteredProps}>{props.children}</RnTouchableOpacity>
  );
}
