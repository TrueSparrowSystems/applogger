import React from 'react';
import {Button as RnButton, ButtonProps} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function Button - Component for rendering the React Native Button component with tracking.
 * @param {ButtonProps} props - Object containing Button properties.
 * @returns {JSX} Button View.
 */
export function Button(props: ButtonProps): JSX.Element {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.Button);

  return <RnButton {...filteredProps} />;
}
