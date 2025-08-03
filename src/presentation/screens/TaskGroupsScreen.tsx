import React from 'react';
import { RootStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

type TaskGroupsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskGroups'
>;

const TaskGroupsScreen = ({ navigation }: TaskGroupsScreenProps) => {
  const taskGroups = [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' },
  ];

  const handleAddGroup = () => {
    // TODO: show modal or navigate to AddGroup screen
  };

  const handleSelectGroup = (groupId: string) => {
    navigation.navigate('TasksList', { groupId });
  };

  return (
    <View>
      <Text>Task Groups</Text>
      <FlatList
        data={taskGroups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectGroup(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Task Group" onPress={handleAddGroup} />
    </View>
  );
};

export default TaskGroupsScreen;
