import React, {useMemo} from 'react';
import {TouchableHighlight as RnTouchableHighlight} from 'react-native';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function TouchableHighlight(props: any) {
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
    <RnTouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...filteredProps}>
      {props.children}
    </RnTouchableHighlight>
  );
}
