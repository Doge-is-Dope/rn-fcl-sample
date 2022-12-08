/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  NativeModules,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const {FclModule} = NativeModules;

const LoginButton = ({onResult}) => {
  const handleOnPress = async () => {
    try {
      onResult('');
      const address = await FclModule.login();
      onResult(`Address: ${address}`);
    } catch (error) {
      onResult(`Error: ${error.message}`);
    }
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleOnPress}>
      <Text style={styles.buttonText}>Login with Blocto</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0075FF" />
      <LoginButton onResult={setResult} />
      {result && <Text style={styles.bodyText}>{result}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#0075FF',
    margin: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  bodyText: {
    marginHorizontal: 20,
    color: '#232528',
  },
});

export default App;
