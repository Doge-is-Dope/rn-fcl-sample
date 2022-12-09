import React, {useState} from 'react';
import {
  NativeModules,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import colors from '../styles/colors';

const {FclModule} = NativeModules;

const LoginButton = ({onResult, onError}) => {
  const [address, setAddress] = useState('');

  const handleOnPress = async () => {
    onResult(null);
    onError(null);
    try {
      if (address) {
        setAddress('');
      } else {
        const accountAddress = await FclModule.login();
        setAddress(accountAddress);
        onResult(accountAddress);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      onError(error.message);
    }
  };

  return (
    <TouchableHighlight
      underlayColor={colors.secondary}
      style={styles.buttonContainer}
      onPress={handleOnPress}>
      {address ? (
        <Text style={styles.buttonText}>{address}</Text>
      ) : (
        <Text style={styles.buttonText}>Login with Blocto</Text>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colors.textOnDark,
  },
});

export default LoginButton;
