import React from 'react';
import {View} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
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
  const {filteredProps} = useLoggingFunctions(
    Component.props,
    ComponentTypes.Component,
  );

  delete Component.props;
  Component = {...Component, props: filteredProps};
  return Component;
}
