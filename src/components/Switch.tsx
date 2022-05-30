import React from 'react';
import {Switch as RnSwitch, SwitchProps} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Switch(props: SwitchProps) {
  const {onValueChange, filteredProps} = useLoggingFunctions(
    props,
    ComponentTypes.Switch,
  );

  return (
    <RnSwitch onValueChange={onValueChange} {...filteredProps}>
      {props.children}
    </RnSwitch>
  );
}
