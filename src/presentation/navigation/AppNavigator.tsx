// src/presentation/navigation/AppNavigator.tsx
import React from 'react';
import { RootStackParamList } from './types';
import TaskGroupsScreen from '../screens/TaskGroupsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskGroups" component={TaskGroupsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
