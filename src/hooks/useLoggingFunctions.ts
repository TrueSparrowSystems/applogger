import {capitalize} from 'lodash';
import {MutableRefObject, useCallback, useMemo, useRef} from 'react';
import Constants from '../constants/Constants';
import {LogTypes} from '../constants/LogTypes';
import {getLogTracker} from '../LogTracker';
import {TrackInterface} from '../LogTracker/TrackInterface';

const DEBOUNCE_TIMEOUT = 500;

/**
 * @function useLoggingFunctions Hook to get all common logging functions
 * @param  {any} props props passed to the component
 * @param  {string} type type of the component
 * @returns {Object} object with all common logging functions
 */
export function useLoggingFunctions(props: any, type: string) {
  const logTracker = getLogTracker();
  const callbackTimeoutMap: MutableRefObject<Record<string, ReturnType<typeof setTimeout>>> = useRef({});

 /**
   * @function
   * Function which generates the name of the component being tracked.
   * @name getComponentName 
   * @param {string} testID Test id of the component being tracked.
   * @returns {string} Name of the component being tracked.
   */
  const getComponentName = useCallback((testID: string) => {
    let componentName = capitalize(testID.replaceAll?.('_', ' '));
    console.log('componentName: ', componentName);

    if (!componentName.toLowerCase().trim().endsWith(type)) {
      componentName = `${componentName} ${type}`;
    }
    return componentName;
  }, []);

  /**
   * @function
   * Function which limits the call the `logTracker.track` function once per `CALLBACK_TIMEOUT`.
   * @name debouncedLog 
   * @param {string} functionName Name of the function being called.
   * @param {TrackInterface} logData Data to be logged.
   */
  const debouncedLog = useCallback(
    (functionName: string, logData: TrackInterface) => {
      const timeoutId = callbackTimeoutMap.current[functionName]
      if(callbackTimeoutMap.current[functionName]){
        clearTimeout(timeoutId);
      }
      callbackTimeoutMap.current[functionName] = setTimeout(() => {
        logTracker.track(logData);
      }, DEBOUNCE_TIMEOUT);
    },
    [],
  );

  /**
   * @function onPress Tracking  Function overriding onPress
   * @param  {any} event onPress event
   */
  const onPress = useCallback(
    (event: any) => {
      if (props.onPress) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);
          logTracker.track({
            description: `Tap on ${componentName} (#${props.testID})`,
            type: LogTypes.Tap,
            params: {
              testID: props.testID,
            },
          });
        }
        props.onPress(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onLongPress Tracking  Function overriding onLongPress
   * @param  {any} event onLongPress event
   */
  const onLongPress = useCallback(
    (event: any) => {
      if (props.onLongPress) {
        if (props.testID) {
          let componentName = getComponentName(props.testID);

          logTracker.track({
            description: `LongPress on ${componentName} (#${props.testID})`,
            type: LogTypes.Tap,
            params: {
              testID: props.testID,
            },
          });
        }
        props.onLongPress(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onPressIn Tracking  Function overriding onPressIn
   * @param  {any} event onPressIn event
   */
  const onPressIn = useCallback(
    (event: any) => {
      if (props.onPressIn) {
        if (props.testID) {
          let componentName = getComponentName(props.testID);

          logTracker.track({
            description: `Press In on ${componentName} (#${props.testID})`,
            type: LogTypes.Tap,
            params: {
              testID: props.testID,
            },
          });
        }
        props.onPressIn(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onPressOut Tracking  Function overriding onPressOut
   * @param  {any} event onPressOut event
   */
  const onPressOut = useCallback(
    (event: any) => {
      if (props.onPressOut) {
        if (props.testID) {
          let componentName = getComponentName(props.testID);

          logTracker.track({
            description: `Press Out on ${componentName} (#${props.testID})`,
            type: LogTypes.Tap,
            params: {
              testID: props.testID,
            },
          });
        }
      }

      props.onPressOut(event);
    },
    [logTracker, props, type],
  );

  /**
   * @function onChange Tracking  Function overriding onChange
   * @param  {any} event onChange event
   */
  const onChange = useCallback(
    (event: any) => {
      const functionName = 'onChange';
      if (props?.onChange) {
        if (props.testID) {
          let componentName = getComponentName(props.testID);

          const {
            nativeEvent: {eventCount, text},
          } = event;

          const logData: TrackInterface = {
            description: `on Change called for ${componentName} (#${props.testID})`,
            type: LogTypes.Event,
            params: {
              testId: props.testID,
              eventCount,
              text,
            },
          };

          debouncedLog(functionName, logData);
        }
        props.onChange(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onChangeText Tracking  Function overriding onChangeText
   * @param  {any} newText new text from input
   */
  const onChangeText = useCallback(
    (newText: any) => {
      const functionName = 'onChangeText';
      if (props?.onChangeText) {
        
        if (props.testID) {
          const componentName = getComponentName(props.testID);
          const logData: TrackInterface = {
            description: `Text change on ${componentName} (#${props.testID})`,
            type: LogTypes.Text,
            params: {
              testId: props.testID,
              text: props?.secureTextEntry ? Constants.REDACTED_TEXT : newText,
            },
          };
          debouncedLog(functionName, logData);
        }
        props.onChangeText(newText);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onContentSizeChange Tracking  Function overriding onContentSizeChange
   * @param  {any} event onContentSizeChange event
   */
  const onContentSizeChange = useCallback(
    (event: any) => {
      const functionName = 'onContentSizeChange';

      if (props?.onContentSizeChange) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          const {
            nativeEvent: {
              contentSize: {width, height},
            },
          } = event;

          logTracker.track({
            description: `on Content Size Change called for ${componentName} (#${props.testID})`,
            type: LogTypes.Layout,
            params: {
              testId: props.testID,
              width,
              height,
            },
          });
        }
        props.onContentSizeChange(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onEndEditing Tracking  Function overriding onEndEditing
   * @param  {any} event onEndEditing event
   */
  const onEndEditing = useCallback(
    (event: any) => {
      if (props?.onEndEditing) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          logTracker.track({
            description: `Editing ended on ${componentName} (#${props.testID})`,
            type: LogTypes.Text,
            params: {
              testId: props.testID,
            },
          });
        }

        props.onEndEditing(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onFocus Tracking  Function overriding onFocus
   * @param  {any} event onFocus event
   */
  const onFocus = useCallback(
    (event: any) => {
      if (props?.onFocus) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          logTracker.track({
            description: `Focus on ${componentName} (#${props.testID})`,
            type: LogTypes.Layout,
            params: {
              testId: props.testID,
            },
          });
        }

        props.onFocus(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onKeyPress Tracking  Function overriding onKeyPress
   * @param  {any} event onKeyPress event
   */
  const onKeyPress = useCallback(
    (event: any) => {
      const functionName = 'onKeyPress';
      if (props?.onKeyPress) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          const {
            nativeEvent: {key},
          } = event;

          debouncedLog(functionName, {
            description: `on Key Press called for ${componentName} (#${props.testID})`,
            type: LogTypes.Tap,
            params: {
              testId: props.testID,
              keyPressed: key,
            },
          });
        }
        props.onKeyPress(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onLayout Tracking Function overriding onLayout
   * @param  {any} event onLayout event
   */
  const onLayout = useCallback(
    (event: any) => {
      const functionName = 'onLayout';

      if (props?.onLayout) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          debouncedLog(functionName, {
            description: `Layout on ${componentName} (#${props.testID})`,
            type: LogTypes.Layout,
            params: {
              testId: props.testID,
            },
          });
        }
        props.onLayout(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onScroll Tracking  Function overriding onScroll
   * @param  {any} event onScroll event
   */
  const onScroll = useCallback(
    (event: any) => {
      const functionName = 'onScroll';

      if (props?.onScroll) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          const {
            nativeEvent: {contentOffset},
          } = event;

          debouncedLog(functionName, {
            description: `on Scroll called for ${componentName} (#${props.testID})`,
            type: LogTypes.Scroll,
            params: {
              testId: props.testID,
              contentOffset,
            },
          });
        }
        props.onScroll(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onSelectionChange Tracking Function overriding onSelectionChange
   * @param  {any} event onSelectionChange event
   */
  const onSelectionChange = useCallback(
    (event: any) => {
      if (props?.onSelectionChange) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);

          const {
            nativeEvent: {
              selection: {start, end},
            },
          } = event;

          logTracker.track({
            description: `Text input selection change on ${componentName} (#${props.testID})`,
            type: LogTypes.TextSelection,
            params: {
              testId: props.testID,
              start,
              end,
            },
          });
        }

        props.onSelectionChange(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onSubmitEditing Tracking  Function overriding onSubmitEditing
   * @param  {any} event onSubmitEditing event
   */
  const onSubmitEditing = useCallback(
    (event: any) => {
      if (props?.onSubmitEditing) {
        if (props.testID) {
          const componentName = getComponentName(props.testID);
          const {
            nativeEvent: {text},
          } = event;

          logTracker.track({
            description: `Text input submit on ${componentName} (#${props.testID})`,
            type: LogTypes.Text,
            params: {
              testId: props.testID,
              text,
            },
          });
        }

        props.onSubmitEditing(event);
      }
    },
    [logTracker, props, type],
  );

  /**
   * @function onValueChange Tracking  Function overriding onValueChange
   * @param  {any} event onValueChange event
   */
  const onValueChange = useCallback(
    (value: any) => {
      if (props.testID && props.onValueChange) {
        const componentName = getComponentName(props.testID);

        logTracker.track({
          description: `Value change to ${value} for ${componentName} - (#${props.testID})`,
          type: LogTypes.Tap,
          params: {
            testID: props.testID,
          },
        });
      }
      props.onValueChange?.(value);
    },
    [logTracker, props, type],
  );

  /**
   * @function onRefresh Tracking Function overriding onRefresh
   */
  const onRefresh = useCallback(() => {
    const testId = props.testID;
    if (testId && props.onRefresh) {
      const componentName = getComponentName(testId);

      logTracker.track({
        description: `on Refresh called for ${componentName} (#${testId})`,
        type: LogTypes.Refresh,
        params: {
          testId: testId,
        },
      });
    }
    props.onRefresh?.();
  }, [logTracker, props, type]);

  const loggingFunctions: Record<string, (event: any) => void> = useMemo(
    () => ({
      onChange,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      onChangeText,
      onContentSizeChange,
      onEndEditing,
      onFocus,
      onKeyPress,
      onLayout,
      onScroll,
      onSelectionChange,
      onSubmitEditing,
      onRefresh,
      onValueChange,
    }),
    [
      onChange,
      onChangeText,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      onContentSizeChange,
      onEndEditing,
      onFocus,
      onKeyPress,
      onLayout,
      onScroll,
      onSelectionChange,
      onSubmitEditing,
      onRefresh,
      onValueChange,
    ],
  );

  const filteredProps = useMemo(() => {
    let propsCopy = {...props};
    Object.keys(loggingFunctions).map(functionName => {
      if (propsCopy.hasOwnProperty(functionName)) {
        delete propsCopy[functionName];
        const currentFunction = loggingFunctions[functionName];
        propsCopy = {...propsCopy, [functionName]: currentFunction};
      }
    });
    return propsCopy;
  }, [loggingFunctions, props]);

  return {
    filteredProps,
  };
}
