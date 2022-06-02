import React from 'react';
import {TextInput as RnTextInput, TextInputProps} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function TextInput - Component for rendering the React Native TextInput component with tracking.
 * @param {TextInputProps} props - Object containing TextInput properties.
 * @returns {JSX} TextInput View.
 */
export function TextInput(props: TextInputProps): JSX.Element {
  const {filteredProps} = useLoggingFunctions(props, ComponentTypes.TextInput);

  return <RnTextInput {...filteredProps}>{props.children}</RnTextInput>;
}
