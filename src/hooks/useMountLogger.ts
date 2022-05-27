/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import LogTracker from '../LogTracker';

/**
 * Hooks to logs the mounting and unmounting of a component.
 * @param componentId Id of the component to be mounted.
 * @param params Additional parameter to log.
 */
export function useMountLogger(componentId: string, params: any) {
  useEffect(() => {
    LogTracker.track({
      stepDescription: `mounting component with id: ${componentId}.`,
      type: 'Mount',
      params: params,
    });

    return () => {
      LogTracker.track({
        stepDescription: `unmounting component with id: ${componentId}.`,
        type: 'Mount',
        params: params,
      });
    };
  }, [componentId]);
}
