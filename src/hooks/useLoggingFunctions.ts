import {capitalize} from 'lodash';
import {MutableRefObject, useCallback, useMemo, useRef} from 'react';
import Constants from '../constants/Constants';
import {LogTypes} from '../constants/LogTypes';
import LogTracker from '../LogTracker';

const CALLBACK_TIMEOUT = 500;

/**
 * @function useLoggingFunctions Hook to get all common logging functions
 * @param  {any} props props passed to the component
 * @param  {string} type type of the component
 * @returns {Object} object with all common logging functions
 */
export function useLoggingFunctions(props: any, type: string) {
  const callbackTimeoutMap: MutableRefObject<Record<string, boolean>> = useRef({
    onChange: false,
  });

  /**
   * @function isFunctionCallBlocked function to check whether function call is blocked
   * @param  {string} functionName
   * @returns boolean
   */
  const isFunctionCallBlocked = useCallback((functionName: string) => {
    return !!callbackTimeoutMap.current[functionName];
  }, []);

  /**
   * @function blockFunctionCall function to block function call
   * @param  {string} functionName
   * @param  {number} timeout
   */
  const blockFunctionCall = useCallback(
    (functionName: string, timeout = CALLBACK_TIMEOUT) => {
      if (callbackTimeoutMap.current[functionName]) {
        return;
      }
      callbackTimeoutMap.current[functionName] = true;
      setTimeout(() => {
        callbackTimeoutMap.current[functionName] = false;
      }, timeout);
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
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onLongPress Tracking  Function overriding onLongPress
   * @param  {any} event onLongPress event
   */
  const onLongPress = useCallback(
    (event: any) => {
      if (props.onLongPress) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onPressIn Tracking  Function overriding onPressIn
   * @param  {any} event onPressIn event
   */
  const onPressIn = useCallback(
    (event: any) => {
      if (props.onPressIn) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onPressOut Tracking  Function overriding onPressOut
   * @param  {any} event onPressOut event
   */
  const onPressOut = useCallback(
    (event: any) => {
      if (props.onPressOut) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onChange Tracking  Function overriding onChange
   * @param  {any} event onChange event
   */
  const onChange = useCallback(
    (event: any) => {
      const functionName = 'onChange';
      if (props?.onChange) {
        if (!isFunctionCallBlocked(functionName)) {
          blockFunctionCall(functionName);
          if (props.testID) {
            let componentName = capitalize(props.testID.replaceAll('_', ' '));
            console.log('componentName: ', componentName);

            if (!componentName.toLowerCase().trim().endsWith(type)) {
              componentName = `${componentName} ${type}`;
            }

            const {
              nativeEvent: {eventCount, text},
            } = event;

            LogTracker.track({
              description: '',
              type: LogTypes.Text,
              params: {
                testId: props.testID,
                eventCount,
                text,
              },
            });
          }
        }
        props.onChange(event);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

  /**
   * @function onChangeText Tracking  Function overriding onChangeText
   * @param  {any} newText new text from input
   */
  const onChangeText = useCallback(
    (newText: any) => {
      const functionName = 'onChangeText';

      if (props?.onChangeText) {
        if (!isFunctionCallBlocked(functionName)) {
          blockFunctionCall(functionName);
          if (props.testID) {
            let componentName = capitalize(props.testID.replaceAll('_', ' '));
            console.log('componentName: ', componentName);

            if (!componentName.toLowerCase().trim().endsWith(type)) {
              componentName = `${componentName} ${type}`;
            }
            LogTracker.track({
              description: `Text change on ${componentName} (#${props.testID})`,
              type: LogTypes.Text,
              params: {
                testId: props.testID,
                text: props?.secureTextEntry
                  ? Constants.REDACTED_TEXT
                  : newText,
              },
            });
          }
        }
        props.onChangeText(newText);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

  /**
   * @function onContentSizeChange Tracking  Function overriding onContentSizeChange
   * @param  {any} event onContentSizeChange event
   */
  const onContentSizeChange = useCallback(
    (event: any) => {
      const functionName = 'onContentSizeChange';

      if (props?.onContentSizeChange) {
        if (!isFunctionCallBlocked(functionName)) {
          blockFunctionCall(functionName);
          if (props.testID) {
            let componentName = capitalize(props.testID.replaceAll('_', ' '));
            console.log('componentName: ', componentName);

            if (!componentName.toLowerCase().trim().endsWith(type)) {
              componentName = `${componentName} ${type}`;
            }

            const {
              nativeEvent: {
                contentSize: {width, height},
              },
            } = event;

            LogTracker.track({
              description: '',
              type: LogTypes.Layout,
              params: {
                testId: props.testID,
                width,
                height,
              },
            });
          }
        }
        props.onContentSizeChange(event);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

  /**
   * @function onEndEditing Tracking  Function overriding onEndEditing
   * @param  {any} event onEndEditing event
   */
  const onEndEditing = useCallback(
    (event: any) => {
      if (props?.onEndEditing) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onFocus Tracking  Function overriding onFocus
   * @param  {any} event onFocus event
   */
  const onFocus = useCallback(
    (event: any) => {
      if (props?.onFocus) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onKeyPress Tracking  Function overriding onKeyPress
   * @param  {any} event onKeyPress event
   */
  const onKeyPress = useCallback(
    (event: any) => {
      const functionName = 'onKeyPress';
      if (props?.onKeyPress) {
        if (!isFunctionCallBlocked(functionName)) {
          blockFunctionCall(functionName);
          if (props.testID) {
            let componentName = capitalize(props.testID.replaceAll('_', ' '));
            console.log('componentName: ', componentName);

            if (!componentName.toLowerCase().trim().endsWith(type)) {
              componentName = `${componentName} ${type}`;
            }

            const {
              nativeEvent: {key},
            } = event;

            LogTracker.track({
              description: '',
              type: LogTypes.Tap,
              params: {
                testId: props.testID,
                keyPressed: key,
              },
            });
          }
        }
        props.onKeyPress(event);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

  /**
   * @function onLayout Tracking Function overriding onLayout
   * @param  {any} event onLayout event
   */
  const onLayout = useCallback(
    (event: any) => {
      const functionName = 'onLayout';

      if (props?.onLayout) {
        if (!isFunctionCallBlocked(functionName)) {
          blockFunctionCall(functionName);
          if (props.testID) {
            let componentName = capitalize(props.testID.replaceAll('_', ' '));
            console.log('componentName: ', componentName);

            if (!componentName.toLowerCase().trim().endsWith(type)) {
              componentName = `${componentName} ${type}`;
            }

            LogTracker.track({
              description: `Layout on ${componentName} (#${props.testID})`,
              type: LogTypes.Layout,
              params: {
                testId: props.testID,
              },
            });
          }
        }
        props.onLayout(event);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

  /**
   * @function onScroll Tracking  Function overriding onScroll
   * @param  {any} event onScroll event
   */
  const onScroll = useCallback(
    (event: any) => {
      const functionName = 'onScroll';

      if (props?.onScroll) {
        if (!isFunctionCallBlocked(functionName)) {
          blockFunctionCall(functionName);
          if (props.testID) {
            let componentName = capitalize(props.testID.replaceAll('_', ' '));
            console.log('componentName: ', componentName);

            if (!componentName.toLowerCase().trim().endsWith(type)) {
              componentName = `${componentName} ${type}`;
            }

            const {
              nativeEvent: {contentOffset},
            } = event;

            LogTracker.track({
              description: '',
              type: LogTypes.Scroll,
              params: {
                testId: props.testID,
                contentOffset,
              },
            });
          }
        }
        props.onScroll(event);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

  /**
   * @function onSelectionChange Tracking Function overriding onSelectionChange
   * @param  {any} event onSelectionChange event
   */
  const onSelectionChange = useCallback(
    (event: any) => {
      if (props?.onSelectionChange) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }

          const {
            nativeEvent: {
              selection: {start, end},
            },
          } = event;

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onSubmitEditing Tracking  Function overriding onSubmitEditing
   * @param  {any} event onSubmitEditing event
   */
  const onSubmitEditing = useCallback(
    (event: any) => {
      if (props?.onSubmitEditing) {
        if (props.testID) {
          let componentName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('componentName: ', componentName);

          if (!componentName.toLowerCase().trim().endsWith(type)) {
            componentName = `${componentName} ${type}`;
          }
          const {
            nativeEvent: {text},
          } = event;

          LogTracker.track({
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
    [props, type],
  );

  /**
   * @function onValueChange Tracking  Function overriding onValueChange
   * @param  {any} event onValueChange event
   */
  const onValueChange = useCallback(
    (value: any) => {
      if (props.testID && props.onValueChange) {
        let componentName = capitalize(props.testID.replaceAll('_', ' '));
        console.log('componentName: ', componentName);

        if (componentName.toLowerCase().trim().endsWith(type)) {
          componentName = `${componentName} ${type}`;
        }

        LogTracker.track({
          description: `Value change to ${value} for ${componentName} - (#${props.testID})`,
          type: LogTypes.Tap,
          params: {
            testID: props.testID,
          },
        });
        props.onValueChange(value);
      }
    },
    [props, type],
  );

  /**
   * @function onRefresh Tracking Function overriding onRefresh
   */
  const onRefresh = useCallback(() => {
    const testId = props.testID;
    if (testId && props.onRefresh) {
      let componentName = capitalize(props.testID.replaceAll('_', ' '));
      console.log('componentName: ', componentName);

      if (!componentName.toLowerCase().trim().endsWith(type)) {
        componentName = `${componentName} ${type}`;
      }

      LogTracker.track({
        description: `on Refresh called for ${componentName} (#${testId})`,
        type: LogTypes.Refresh,
        params: {
          testId: testId,
        },
      });
      props.onRefresh();
    }
  }, [props, type]);

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
