import React from 'react';
import {Pressable as RnPressable} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Pressable(props: any) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return <RnPressable {...filteredProps}>{props.children}</RnPressable>;
}
