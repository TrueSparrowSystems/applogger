import React from 'react';
import {Button as RnButton} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Button(props: any) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return <RnButton {...filteredProps}>{props.children}</RnButton>;
}
