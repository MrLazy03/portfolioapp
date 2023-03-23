import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from '../../components/UserCard';
import {useIsFocused} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
const ViewUserScreen = props => {
  const isFocused = useIsFocused();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const {navigation} = props;
  const [dataCleared, setDataCleared] = useState(false);
  console.log('nirbhaysl;');
  useEffect(() => {
    const getRegisteredUsers = async () => {
      try {
        const usersData = await AsyncStorage.getItem('usersList');
        setRegisteredUsers(JSON.parse(usersData));
      } catch (error) {
        console.log(error);
      }
    };
    getRegisteredUsers();
  }, [navigation, isFocused, dataCleared]);

  const renderItem = ({item, index}) => {
    return <UserCard item={item} index={index} />;
  };
  const handleClearAll = async () => {
    try {
      await AsyncStorage.removeItem('usersList');
      console.log('cleared');
      setDataCleared(true);
      setRegisteredUsers([]);
    } catch (exception) {
      console.warn('something wrong');
    }
  };

  const renderHeader = () => {
    return <CustomButton title="Clear All Data" onPress={handleClearAll} />;
  };
  return (
    <FlatList
      ListHeaderComponent={renderHeader()}
      data={registeredUsers}
      renderItem={renderItem}
      keyExtractor={item => item.photoUri}
    />
  );
};

export default ViewUserScreen;

const styles = StyleSheet.create({});
