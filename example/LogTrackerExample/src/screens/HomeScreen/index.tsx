import {useNavigation} from '@react-navigation/native';
import {
  Switch,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'applogger';
import React, {useCallback, useState} from 'react';
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const onSearchByCityPressed = useCallback(() => {
    navigation.navigate('SearchScreen');
  }, [navigation]);

  const onCrashButtonPress = useCallback(() => {
    const test: any = {};
    console.log(test.should.crash);
  }, []);

  const [isSecureEntry, setIsSecureEntry] = useState(false);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            1. Shake the device to open the helper menu.
          </Text>
          <Text style={styles.text}>
            2. Open the logger UI using the link in the helper menu to observe
            the generated logs.
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.smallText}>TouchableOpacity Wrapper Example</Text>
          <TouchableOpacity
            testID="homescreen_search_by_city_name"
            onPress={onSearchByCityPressed}
            style={styles.btnContainer}>
            <Text style={styles.smallText}>Search By City Name</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.infoContainer}>
        <Text>TouchableHighlight Wrapper Example</Text>
        <TouchableHighlight
          style={styles.btnContainer}
          testID="homescreen_search_by_zip_code"
          underlayColor={'darkgrey'}
          onPress={onSearchByCityPressed}>
          <Text>Search By Zip Code</Text>
        </TouchableHighlight>
      </View> */}
        <View style={styles.infoContainer}>
          <Text style={styles.smallText}>TextInput Wrapper Example</Text>
          <TextInput
            testID="homescreen_text_input"
            value={text}
            secureTextEntry={isSecureEntry}
            placeholder="Entered text will be logged."
            placeholderTextColor="gray"
            style={styles.btnContainer}
            onChangeText={newText => setText(newText)}
          />
          <View style={styles.switchContainer}>
            <Switch
              testID="homescreen_redact_text_switch"
              value={isSecureEntry}
              onValueChange={value => setIsSecureEntry(value)}
            />
            <Text style={styles.flipText}>
              Flip to redact the text input in log.
            </Text>
          </View>
        </View>
        <TouchableHighlight
          style={styles.btnContainer}
          testID="homescreen_crash_button"
          underlayColor={'darkgrey'}
          onPress={onCrashButtonPress}>
          <Text style={styles.smallText}>
            Click on the button to crash the application
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  btnContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
    color: 'black',
  },
  btn: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    marginVertical: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    color: 'black',
  },
  smallText: {
    fontSize: 14,
    color: 'black',
  },
  flipText: {
    marginLeft: 16,
    fontSize: 14,
    marginTop: 8,
    color: 'black',
  },
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
