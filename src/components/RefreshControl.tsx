import React from 'react';
import {
  RefreshControlProps,
  RefreshControl as RNRefreshControl,
} from 'react-native';
import {ComponentTypes} from '../constants/ComponentTypes';
import {useLoggingFunctions} from '../hooks/useLoggingFunctions';

/**
 * @function RefreshControl - Component for rendering the React Native Refresh Control component with tracking.
 * @param {RefreshControlProps} props Properties for refresh control.
 * @returns {JSX.Element} Refresh Control Component.
 */
export function RefreshControl(props: RefreshControlProps): JSX.Element {
  const {filteredProps} = useLoggingFunctions(
    props,
    ComponentTypes.RefreshControl,
  );

  return (
    <RNRefreshControl {...filteredProps}>{props.children}</RNRefreshControl>
  );
}
