import {StyleSheet, Button, View} from 'react-native';
import React from 'react';

const CustomButton = props => {
  const {title, onPress} = props;
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
});
