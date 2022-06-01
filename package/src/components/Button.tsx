import React from 'react';
import {Button as RnButton, ButtonProps} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Button(props: ButtonProps) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return <RnButton {...filteredProps} />;
}
