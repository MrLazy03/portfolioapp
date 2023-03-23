import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';

const Input = props => {
  const {label, onChangeText, value, keyboardType} = props;
  return (
    <>
      <Text style={styles.text}>{label}:</Text>

      <TextInput
        style={styles.inputContainer}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});
