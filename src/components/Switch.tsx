import React, {useMemo} from 'react';
import {Switch as RnSwitch} from 'react-native';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function Switch(props: any) {
  const {onValueChange} = useLoggingFunctions(props);
  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onChange;
    delete propsCopy.onValueChange;
    return propsCopy;
  }, [props]);

  return (
    <RnSwitch onValueChange={onValueChange} {...filteredProps}>
      {props.children}
    </RnSwitch>
  );
}
