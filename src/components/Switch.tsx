import React from 'react';
import {Switch as RnSwitch, SwitchProps} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Switch(props: SwitchProps) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Switch);

  return <RnSwitch {...filteredProps}>{props.children}</RnSwitch>;
}
