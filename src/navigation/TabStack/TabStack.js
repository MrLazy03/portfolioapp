import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'styled-components/native';
import AddUserScreen from '../../screens/AddUserScreen';
import ViewUserScreen from '../../screens/ViewUserScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const TabStack = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="AddUserScreen"
      backBehavior="initialRoute"
      screenOptions={{
        statusBarColor: theme.colors.card,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          paddingBottom: 5,
          height: 50,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 15,
        },
        headerTintColor: 'white',
        headerTitle: 'Portfolio',
      }}>
      <Tab.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'person-add' : 'person-add-outline'}
              size={24}
              color={focused ? 'white' : 'whitesmoke'}
            />
          ),
          title: 'Add User',
          tabBarLabelStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="ViewUserScreen"
        component={ViewUserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'people' : 'people-outline'}
              size={24}
              color={focused ? 'white' : 'whitesmoke'}
            />
          ),
          title: 'View Users',
          tabBarLabelStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
