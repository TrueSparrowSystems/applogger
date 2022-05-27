import React from 'react';
import {TouchableHighlight as RnTouchableHighlight} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableHighlight(props: any) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableHighlight {...filteredProps}>
      {props.children}
    </RnTouchableHighlight>
  );
}
