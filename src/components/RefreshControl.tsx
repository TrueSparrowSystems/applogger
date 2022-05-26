import {capitalize} from 'lodash';
import React, {useCallback, useMemo} from 'react';
import {
  RefreshControlProps,
  RefreshControl as RNRefreshControl,
} from 'react-native';
import LogTracker from '../LogTracker';

export function RefreshControl(props: RefreshControlProps) {
  const onRefresh = useCallback(() => {
    const testId = props.testID;
    if (testId) {
      let componentName = capitalize(testId.replaceAll('_', ' '));
      console.log('componentName: ', componentName);
      console.log('componentName.toLowerCase(): ', componentName.toLowerCase());
      console.log(
        'componentName.toLowerCase().endsWith(button): ',
        componentName.toLowerCase().trim().endsWith('component'),
      );
      if (componentName.toLowerCase().trim().endsWith('component')) {
      } else {
        componentName = `${componentName} component`;
      }

      LogTracker.track({
        stepDescription: `on Refresh called for ${componentName} (#${testId})`,
        type: 'Refresh',
        params: {
          testId: testId,
        },
      });
    }

    props.onRefresh?.();
  }, [props]);

  const filteredProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onRefresh;
    return propsCopy;
  }, [props]);

  return (
    <RNRefreshControl {...filteredProps} onRefresh={onRefresh}>
      {props.children}
    </RNRefreshControl>
  );
}
