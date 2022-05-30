import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {TouchableOpacity} from '../TouchableOpacity';
import useHelperMenuData from './useHelperMenuData';

function HelperMenu() {
  const {
    serverUrl,
    isVisible,
    sessionControlText,
    uploadLogs,
    copyLink,
    hideMenu,
    deleteCurrentSessionLogs,
    handleSession,
  } = useHelperMenuData();

  const yOffset = new Animated.Value(300);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(yOffset, {
        duration: 500,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  const closeMenu = () => {
    Animated.timing(yOffset, {
      duration: 500,
      toValue: 300,
      useNativeDriver: false,
    }).start(() => {
      hideMenu();
    });
  };

  const cancelButtonTextStyle = useMemo(
    () => [styles.optionText, {color: 'red'}],
    [],
  );
  const optionsTextStyle = useMemo(
    () => [styles.optionText, {color: '#6798D4'}],
    [],
  );
  const optionWithBottomBorderStyle = useMemo(
    () => [
      styles.optionButton,
      {borderBottomWidth: 1, borderColor: '#A8BEC466'},
    ],
    [],
  );

  return isVisible ? (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.modalStyle,
          {
            transform: [
              {
                translateY: yOffset,
              },
            ],
          },
        ]}>
        <View style={styles.optionButtonContainer}>
          <TouchableOpacity
            style={optionWithBottomBorderStyle}
            onPress={copyLink}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Copy Link: {serverUrl}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={optionWithBottomBorderStyle}
            onPress={uploadLogs}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Upload log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={optionWithBottomBorderStyle}
            onPress={deleteCurrentSessionLogs}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Delete current session logs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleSession}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>{sessionControlText}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cancelButtonContainer}
          onPress={closeMenu}
          activeOpacity={0.7}>
          <Text style={cancelButtonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  ) : null;
}

export default HelperMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalStyle: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12,
    tablet: {
      padding: 20,
    },
  },
  optionButtonContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
  },
  cancelButtonContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
