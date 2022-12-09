/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Snackbar from 'react-native-snackbar';
import colors from './styles/colors';
import LoginButton from './components/LoginButton';

const App = () => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {}, [address]);

  useEffect(() => {
    error &&
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.error,
      });
  }, [error]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <LoginButton onResult={setAddress} onError={setError} />
    </SafeAreaView>
  );
};

export default App;
