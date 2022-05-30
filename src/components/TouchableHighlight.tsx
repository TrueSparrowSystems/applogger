import React from 'react';
import {
  TouchableHighlight as RnTouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableHighlight(props: TouchableHighlightProps) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableHighlight {...filteredProps}>
      {props.children}
    </RnTouchableHighlight>
  );
}
