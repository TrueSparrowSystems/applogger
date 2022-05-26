import {capitalize} from 'lodash';
import React, {useCallback, useMemo} from 'react';
import {TextInput as RnTextInput, TextInputProps} from 'react-native';
import LogTracker from '../LogTracker/index';

export function TextInput(props: any) {
  const onPressIn = useCallback(
    (event: any) => {
      if (props?.onPressIn) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Press in on ${textInputName} (#${props.testID})`,
            type: 'Tap',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onPressIn(event);
      }
    },
    [props],
  );
  const onPressOut = useCallback(
    (event: any) => {
      if (props?.onPressOut) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Press out on ${textInputName} (#${props.testID})`,
            type: 'Tap',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onPressOut(event);
      }
    },
    [props],
  );
  const onChange = useCallback(
    (event: any) => {
      if (props?.onChange) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Change in ${textInputName} (#${props.testID})`,
            type: 'Text',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onChange(event);
      }
    },
    [props],
  );
  const onChangeText = useCallback(
    (newText: any) => {
      if (props?.onChangeText) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }
          console.log('currentText: ', newText);

          LogTracker.track({
            stepDescription: `Text change on ${textInputName} (#${props.testID})`,
            type: 'Text',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onChangeText(newText);
      }
    },
    [props],
  );
  const onContentSizeChange = useCallback(
    (event: any) => {
      if (props?.onContentSizeChange) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Content size change on ${textInputName} (#${props.testID})`,
            type: 'Layout',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onContentSizeChange(event);
      }
    },
    [props],
  );
  const onEndEditing = useCallback(
    (event: any) => {
      if (props?.onEndEditing) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Editing ended on ${textInputName} (#${props.testID})`,
            type: 'Text',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onEndEditing(event);
      }
    },
    [props],
  );
  const onFocus = useCallback(
    (event: any) => {
      if (props?.onFocus) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Focus on ${textInputName} (#${props.testID})`,
            type: 'Layout',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onFocus(event);
      }
    },
    [props],
  );
  const onKeyPress = useCallback(
    (event: any) => {
      if (props?.onKeyPress) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }
          console.log('key press: ', event?.nativeEvent?.key);

          LogTracker.track({
            stepDescription: `Key press on ${textInputName} (#${props.testID})`,
            type: 'Tap',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onKeyPress(event);
      }
    },
    [props],
  );
  const onLayout = useCallback(
    (event: any) => {
      if (props?.onLayout) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Layout on ${textInputName} (#${props.testID})`,
            type: 'Layout',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onLayout(event);
      }
    },
    [props],
  );
  const onScroll = useCallback(
    (event: any) => {
      if (props?.onScroll) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          LogTracker.track({
            stepDescription: `Scroll on ${textInputName} (#${props.testID})`,
            type: 'Scroll',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onScroll(event);
      }
    },
    [props],
  );
  const onSelectionChange = useCallback(
    (event: any) => {
      if (props?.onSelectionChange) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          const {start, end} = event?.nativeEvent?.selection;
          console.log('selection: ', {start, end});

          LogTracker.track({
            stepDescription: `Text input selection change on ${textInputName} (#${props.testID})`,
            type: 'Text',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onSelectionChange(event);
      }
    },
    [props],
  );
  const onSubmitEditing = useCallback(
    (event: any) => {
      if (props?.onSubmitEditing) {
        if (props.testID) {
          let textInputName = capitalize(props.testID.replaceAll('_', ' '));
          console.log('textInputName: ', textInputName);
          console.log(
            'textInputName.toLowerCase(): ',
            textInputName.toLowerCase(),
          );
          console.log(
            'textInputName.toLowerCase().endsWith(textInput): ',
            textInputName.toLowerCase().trim().endsWith('textInput'),
          );
          if (textInputName.toLowerCase().trim().endsWith('textInput')) {
          } else {
            textInputName = `${textInputName} textInput`;
          }

          const {text, eventCount, target} = event?.nativeEvent;
          console.log({text, eventCount, target});

          LogTracker.track({
            stepDescription: `Text input submit on ${textInputName} (#${props.testID})`,
            type: 'Text',
            params: {
              testId: props.testID,
            },
          });
        }

        props.onSubmitEditing(event);
      }
    },
    [props],
  );

  const filteredProps: TextInputProps = useMemo(() => {
    const propsCopy = {...props};
    delete propsCopy.onPressIn;
    delete propsCopy.onPressOut;
    delete propsCopy.onChange;
    delete propsCopy.onChangeText;
    delete propsCopy.onContentSizeChange;
    delete propsCopy.onEndEditing;
    delete propsCopy.onFocus;
    delete propsCopy.onKeyPress;
    delete propsCopy.onScroll;
    delete propsCopy.onSelectionChange;
    delete propsCopy.onSubmitEditing;
    return propsCopy;
  }, [props]);

  return (
    <RnTextInput
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onChange={onChange}
      onChangeText={onChangeText}
      onContentSizeChange={onContentSizeChange}
      onEndEditing={onEndEditing}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      onLayout={onLayout}
      onScroll={onScroll}
      onSelectionChange={onSelectionChange}
      onSubmitEditing={onSubmitEditing}
      {...filteredProps}>
      {props.children}
    </RnTextInput>
  );
}
