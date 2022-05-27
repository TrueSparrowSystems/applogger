import {capitalize} from 'lodash';
import {MutableRefObject, useCallback, useMemo, useRef} from 'react';
import {LogTypes} from '../constants/LogTypes';
import LogTracker from '../LogTracker';

const CALLBACK_TIMEOUT = 500;

export function useLoggingFunctions(props: any, type: string) {
  const callbackTimeoutMap: MutableRefObject<Record<string, boolean>> = useRef({
    onChange: false,
  });

  const isFunctionCallBlocked = useCallback(functionName => {
    return callbackTimeoutMap.current[functionName];
  }, []);

  const blockFunctionCall = useCallback(
    (functionName, timeout = CALLBACK_TIMEOUT) => {
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

  const onPress = useCallback(
    (event: any) => {
      if (props.testID && props.onPress) {
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
        props.onPress(event);
      }
    },
    [props, type],
  );

  const onLongPress = useCallback(
    (event: any) => {
      if (props.testID && props.onLongPress) {
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
        props.onLongPress(event);
      }
    },
    [props, type],
  );

  const onPressIn = useCallback(
    (event: any) => {
      if (props.testID && props.onPressIn) {
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
        props.onPressIn(event);
      }
    },
    [props, type],
  );

  const onPressOut = useCallback(
    (event: any) => {
      if (props.testID && props.onPressOut) {
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

      props.onPressOut(event);
    },
    [props, type],
  );

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
              description: `Text change on ${componentName} (#${props.testID}): ${newText}`,
              type: LogTypes.Text,
              params: {
                testId: props.testID,
                text: newText,
              },
            });
          }
        }
        props.onChangeText(newText);
      }
    },
    [blockFunctionCall, isFunctionCallBlocked, props, type],
  );

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
    ],
  );

  const filteredProps = useMemo(() => {
    let propsCopy = {...props};

    Object.keys(loggingFunctions).map(functionName => {
      if (propsCopy.hasOwnProperty(functionName)) {
        delete propsCopy[functionName];
        const currentFunction = loggingFunctions[functionName];
        propsCopy = {...propsCopy, currentFunction};
      }
    });
    return propsCopy;
  }, [loggingFunctions, props]);

  return {
    filteredProps,
  };
}
