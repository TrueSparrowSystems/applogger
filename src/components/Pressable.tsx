import React from 'react';
import {Pressable as RnPressable, PressableProps} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function Pressable - Component for rendering the React Native Pressable component with tracking.
 * @param {PressableProps} props - Object containing Pressable properties.
 * @returns {JSX} Pressable View.
 */
export function Pressable(props: PressableProps): JSX.Element {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return <RnPressable {...filteredProps}>{props.children}</RnPressable>;
}
