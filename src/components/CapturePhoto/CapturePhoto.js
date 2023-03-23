import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const CapturePhoto = props => {
  const {photoPath, setPhotoPath, navigation} = props;
  const source = useMemo(() => ({uri: `file://${photoPath}`}), [photoPath]);

  const handleCameraPress = () => {
    console.log('open camera');
    navigation.navigate('CameraScreen');
  };
  return (
    <View>
      <Text style={styles.text}>Add Selfies</Text>
      <View style={styles.container}>
        <Icon
          name={'camera'}
          size={50}
          color="black"
          onPress={handleCameraPress}
        />
        <Image
          source={source}
          style={[styles.image, {height: photoPath ? 200 : 0}]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default CapturePhoto;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingTop: 5,
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
