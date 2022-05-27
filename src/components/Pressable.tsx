import React, {useMemo} from 'react';
import {Pressable as RnPressable} from 'react-native';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Pressable(props: any) {
  const {onPress, onLongPress, onPressIn, onPressOut} =
    useLoggingFunctions(props);

  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPress;
    delete propsCopy.onPressIn;
    delete propsCopy.onPressOut;
    delete propsCopy.onLongPress;
    return propsCopy;
  }, [props]);

  return (
    <RnPressable
      {...filteredProps}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}>
      {props.children}
    </RnPressable>
  );
}
