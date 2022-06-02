import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {TouchableOpacity} from '../TouchableOpacity';
import useHelperMenuData from './useHelperMenuData';

/**
 * @function HelperMenu - Component for rendering the helper menu.
 * @returns {JSX} HelperMenu View.
 */
function HelperMenu() {
  const {
    isVisible,
    sessionControlText,
    trackingControlText,
    enableUploadButtons,
    uploadCurrentSessionLogs,
    uploadAllSessionLogs,
    shareUrl,
    deleteAllLogs,
    hideMenu,
    deleteCurrentSessionLogs,
    handleSession,
    handleTracking,
  } = useHelperMenuData();

  /**
   * @constant {Animated.Value} yOffset Animated value to control y position of the container.
   */
  const yOffset: Animated.Value = useMemo(() => {
    return new Animated.Value(500);
  }, []);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(yOffset, {
        duration: 500,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const closeMenu: () => void = useCallback(() => {
    Animated.timing(yOffset, {
      duration: 500,
      toValue: 500,
      useNativeDriver: false,
    }).start(() => {
      hideMenu();
    });
  }, [hideMenu, yOffset]);

  const cancelButtonTextStyle: Record<string, any>[] = useMemo(
    () => [styles.optionText, {color: 'red'}],
    [],
  );

  const optionsTextStyle: Record<string, any>[] = useMemo(
    () => [styles.optionText, {color: '#6798D4'}],
    [],
  );

  const optionWithBottomBorderStyle: Record<string, any>[] = useMemo(
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
            testID="share_server_url"
            style={optionWithBottomBorderStyle}
            onPress={shareUrl}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Share server URL</Text>
          </TouchableOpacity>
          {enableUploadButtons ? (
            <View>
              <TouchableOpacity
                testID="upload_current_session_log"
                style={optionWithBottomBorderStyle}
                onPress={uploadCurrentSessionLogs}
                activeOpacity={0.7}>
                <Text style={optionsTextStyle}>Upload current session log</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="upload_all_log"
                style={optionWithBottomBorderStyle}
                onPress={uploadAllSessionLogs}
                activeOpacity={0.7}>
                <Text style={optionsTextStyle}>Upload all log</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            testID="delete_current_session_logs"
            style={optionWithBottomBorderStyle}
            onPress={deleteCurrentSessionLogs}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Delete current session logs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="delete_all_logs"
            style={optionWithBottomBorderStyle}
            onPress={deleteAllLogs}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Delete all logs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="tracking_control"
            style={optionWithBottomBorderStyle}
            onPress={handleTracking}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>{trackingControlText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="session_control"
            style={styles.optionButton}
            onPress={handleSession}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>{sessionControlText}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          testID="cancel"
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
