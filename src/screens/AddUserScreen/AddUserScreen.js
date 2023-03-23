import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import DropDownInput from '../../components/DropDownInput';
import CustomButton from '../../components/CustomButton';
import CapturePhoto from '../../components/CapturePhoto';

const AddUserScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  console.log(params, 'aaloo');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    params?.name && setName(params?.name);
    params?.age && setAge(params?.age);
    params?.location && setLocation(params?.location);
    params?.photoUri && setPhotoUri(params?.photoUri);
    params?.selectedSkill && setSelectedSkill(params?.selectedSkill);
    params?.name && setEdit(true);
    params?.index && setIndex(params.index);
    params?.path && setPhotoUri(params?.path);
  }, [params, navigation]);

  const handleSave = async () => {
    if (name && age && selectedSkill.length > 0 && photoUri) {
      console.log('inside if');
      try {
        const newData = {name, age, selectedSkill, photoUri, location};

        let existingData = await AsyncStorage.getItem('usersList');
        if (existingData === null) {
          existingData = [];
        } else {
          existingData = JSON.parse(existingData);
        }

        edit
          ? existingData.splice(index, 1, newData)
          : existingData.push(newData);

        await AsyncStorage.setItem('usersList', JSON.stringify(existingData));

        setName('');
        setAge('');
        setSelectedSkill([]);
        setPhotoUri(null);
        setLocation(null);
        setEdit(false);
        setIndex(null);
      } catch (error) {
        console.log('Error saving data', error);
      }
    } else {
      console.log('please enter details');
    }
  };

  const handleClear = () => {
    setName(null);
    setAge(null);
    setLocation(null);
    setPhotoUri(null);
    setSelectedSkill(null);
  };

  return (
    <View style={styles.container}>
      <Input label="Name" onChangeText={setName} value={name} />
      <Input
        label="Age"
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
      />
      <DropDownInput
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />
      <CapturePhoto
        photoPath={photoUri}
        setPhotoPath={setPhotoUri}
        navigation={navigation}
      />
      <CustomButton title="Save" onPress={handleSave} />
      <CustomButton title="Clear" onPress={handleClear} />
    </View>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
