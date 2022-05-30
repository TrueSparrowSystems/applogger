import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
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

  const cancelButtonTextStyle = useMemo(
    () => [styles.optionText, {color: 'red'}],
    [],
  );
  const optionsTextStyle = useMemo(
    () => [styles.optionText, {color: 'blue'}],
    [],
  );
  const optionWithBottomBorderStyle = useMemo(
    () => [styles.optionButton, {borderBottomWidth: 1, borderColor: 'blue'}],
    [],
  );

  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.modalStyle}>
        <View style={styles.optionButtonContainer}>
          <TouchableOpacity
            style={optionWithBottomBorderStyle}
            onPress={copyLink}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Copy Link: {serverUrl}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={uploadLogs}
            activeOpacity={0.7}>
            <Text style={optionsTextStyle}>Upload log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
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
          onPress={hideMenu}
          activeOpacity={0.7}>
          <Text style={cancelButtonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
}

export default HelperMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
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
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
