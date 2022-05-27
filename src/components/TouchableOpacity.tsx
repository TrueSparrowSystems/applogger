import React from 'react';
import {TouchableOpacity as RnTouchableOpacity} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableOpacity(props: any) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableOpacity {...filteredProps}>{props.children}</RnTouchableOpacity>
  );
}
