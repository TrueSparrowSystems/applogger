import React, {useMemo} from 'react';
import {Button as RnButton, ButtonProps} from 'react-native';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Button(props: any) {
  const {onPress} = useLoggingFunctions(props);

  const filteredProps: ButtonProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPress;
    return propsCopy;
  }, [props]);

  return (
    <RnButton onPress={onPress} {...filteredProps}>
      {props.children}
    </RnButton>
  );
}
