import React, {useMemo} from 'react';
import {View} from 'react-native';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

export function ComponentWrapper(props: any) {
  let component = props.children;
  const newProps = {...props};
  delete newProps.children;
  if (Array.isArray(component)) {
    return (
      <View {...newProps}>
        {component.map((element: JSX.Element, index) => {
          return (
            <LogTrackingComponentWrapper key={index}>
              {element}
            </LogTrackingComponentWrapper>
          );
        })}
      </View>
    );
  } else {
    return (
      <LogTrackingComponentWrapper>{component}</LogTrackingComponentWrapper>
    );
  }
}

function LogTrackingComponentWrapper(props: any) {
  let Component: JSX.Element = props.children;
  const {onPress, onLongPress, onPressIn, onPressOut} = useLoggingFunctions(
    Component.props,
  );
  const filteredProps = useMemo(() => {
    let propsCopy = {...Component.props};
    if (propsCopy.onPress) {
      delete propsCopy.onPress;
      propsCopy = {...propsCopy, onPress};
    }
    if (propsCopy.onLongPress) {
      delete propsCopy.onLongPress;
      propsCopy = {...propsCopy, onLongPress};
    }
    if (propsCopy.onPressIn) {
      delete propsCopy.onPressIn;
      propsCopy = {...propsCopy, onPressIn};
    }
    if (propsCopy.onPressOut) {
      delete propsCopy.onPressOut;
      propsCopy = {...propsCopy, onPressOut};
    }
    return propsCopy;
  }, [Component.props, onLongPress, onPress, onPressIn, onPressOut]);

  delete Component.props;
  Component = {...Component, props: filteredProps};
  return Component;
}
