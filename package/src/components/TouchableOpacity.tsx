import React from 'react';
import {
  TouchableOpacity as RnTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableOpacity(props: TouchableOpacityProps) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableOpacity {...filteredProps}>{props.children}</RnTouchableOpacity>
  );
}
