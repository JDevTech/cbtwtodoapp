import React from 'react';
import { RootStackParamList } from './types';
import TasksListScreen from '../screens/task/TaskListScreen';
import { NavigationContainer } from '@react-navigation/native';
import CreateTaskScreen from '../screens/task/CreateTaskScreen';
import TaskGroupsListScreen from '../screens/task-group/TaskGroupsListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTaskGroupScreen from '../screens/task-group/CreateTaskGroupScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskGroups" component={TaskGroupsListScreen} />
        <Stack.Screen
          name="CreateTaskGroup"
          component={CreateTaskGroupScreen}
          options={{ title: 'New Task Group' }}
        />

        <Stack.Screen name="TasksList" component={TasksListScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        {/* Add other screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
