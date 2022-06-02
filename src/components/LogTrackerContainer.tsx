import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useWebServer} from '../hooks';
import HelperMenu from './HelperMenu';

export function LogTrackerContainer(props: ViewProps) {
  useWebServer();
  return (
    <View style={props?.style || styles.container}>
      <HelperMenu />
      {props?.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
