import React, {useMemo} from 'react';
import {TouchableWithoutFeedback as RnTouchableWithoutFeedback} from 'react-native';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableWithoutFeedback(props: any) {
  const {onPress, onLongPress, onPressIn, onPressOut} =
    useLoggingFunctions(props);
  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPress;
    delete propsCopy.onLongPress;
    delete propsCopy.onPressIn;
    delete propsCopy.onPressOut;
    return propsCopy;
  }, [props]);

  return (
    <RnTouchableWithoutFeedback
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...filteredProps}>
      {props.children}
    </RnTouchableWithoutFeedback>
  );
}
