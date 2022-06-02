import React from 'react';
import {View} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function ComponentWrapper - Generic wrapper component for tracking events in it's children.
 * @param {any} props - Object containing ComponentWrapper props.
 * @returns {JSX} ComponentWrapper View.
 */
export function ComponentWrapper(props: any): JSX.Element {
  let component: JSX.Element = props.children;
  const newProps: any = {...props};
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

/**
 * @function LogTrackingComponentWrapper - Generic wrapper component for tracking events in it's children.
 * @param {any} props - Object containing LogTrackingComponentWrapper props.
 * @returns {JSX} LogTrackingComponentWrapper View.
 */
function LogTrackingComponentWrapper(props: any): JSX.Element {
  let Component: JSX.Element = props.children;
  const {filteredProps} = useLoggingFunctions(
    Component.props,
    ComponentTypes.Component,
  );

  delete Component.props;
  Component = {...Component, props: filteredProps};
  return Component;
}
