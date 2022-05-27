/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {LogTypes} from '../constants/LogTypes';
import LogTracker from '../LogTracker';

/**
 * Hooks to logs the mounting and unmounting of a component.
 * @param componentId Id of the component to be mounted.
 * @param params Additional parameter to log.
 */
export function useMountLogger(componentId: string, params: any) {
  useEffect(() => {
    LogTracker.track({
      description: `mounting ${componentId}.`,
      type: LogTypes.Mount,
      params: params,
    });

    return () => {
      LogTracker.track({
        description: `unmounting ${componentId}.`,
        type: LogTypes.Mount,
        params: params,
      });
    };
  }, [componentId]);
}
