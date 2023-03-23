import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const UserCard = props => {
  const {
    item: {name, age, selectedSkill, photoUri, location},
    index,
  } = props;
  const navigation = useNavigation();
  //   const dispatch = useDispatch();
  //   const handleAddToCard = () => {
  //     console.log('nks');
  //     dispatch(addToCart({productId: id}));
  //   };

  const renderProductImage = () => {
    return (
      <Image
        source={{uri: `file://${photoUri}`}}
        resizeMode="contain"
        style={styles.image}
      />
    );
  };

  const renderUserDetails = () => {
    return (
      <View style={styles.userDetailsContainer}>
        <Text style={styles.text}>Name : {name}</Text>
        <Text style={styles.text}>Age : {age}</Text>

        <Text numberOfLines={3} style={styles.text}>
          Tech Skills : {selectedSkill.join(', ')}
        </Text>
      </View>
    );
  };
  const handleEdit = () => {
    navigation.navigate('AddUserScreen', {
      type: 'edit',
      index,
      name,
      age,
      selectedSkill,
      location,
      photoUri,
    });
  };

  return (
    <TouchableOpacity onPress={handleEdit} style={styles.container}>
      {photoUri && renderProductImage()}
      {renderUserDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginVertical: 5,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  userDetailsContainer: {
    marginLeft: 10,
    padding: 5,
    paddingBottom: 8,
    flex: 4,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  image: {
    borderRadius: 10,
    height: 180,
    marginLeft: 1,
    flex: 2,
    margin: 5,
  },
});

export default UserCard;
