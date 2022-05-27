import React from 'react';
import {TouchableWithoutFeedback as RnTouchableWithoutFeedback} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableWithoutFeedback(props: any) {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return (
    <RnTouchableWithoutFeedback {...filteredProps}>
      {props.children}
    </RnTouchableWithoutFeedback>
  );
}
