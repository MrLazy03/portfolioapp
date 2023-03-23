import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const techSkills = [
  {label: 'HTML', value: 'html'},
  {label: 'CSS', value: 'css'},
  {label: 'JavaScript', value: 'javascript'},
  {label: 'React', value: 'react'},
  {label: 'React Native', value: 'reactnative'},
  {label: 'Node.js', value: 'nodejs'},
  {label: 'Express', value: 'express'},
  {label: 'MongoDB', value: 'mongodb'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
];
const DropDownInput = props => {
  const {selectedSkill, setSelectedSkill} = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Text style={styles.text}>Tech Skills:</Text>

      <DropDownPicker
        open={open}
        value={selectedSkill}
        items={techSkills}
        setOpen={setOpen}
        setValue={setSelectedSkill}
        multiple={true}
        min={0}
        stickyHeader={true}
        mode="BADGE"
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
      />
    </>
  );
};

export default DropDownInput;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});
