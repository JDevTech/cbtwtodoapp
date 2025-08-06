import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTaskGroups } from '@/presentation/hooks/useTaskGroups';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

type TaskGroupsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskGroups'
>;

const TaskGroupsListScreen = ({ navigation }: TaskGroupsScreenProps) => {
  const { loading, fetchTaskGroups, groups: taskGroups } = useTaskGroups();

  useFocusEffect(
    useCallback(() => {
      fetchTaskGroups();
    }, [fetchTaskGroups]),
  );

  const handleAddGroup = () => {
    navigation.navigate('CreateTaskGroup');
  };

  const handleSelectGroup = (groupId: string, groupTitle: string) => {
    navigation.navigate('TasksList', { groupId, groupTitle });
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}

      <FlatList
        data={taskGroups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectGroup(item.id, item.title)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Task Group" onPress={handleAddGroup} />
    </View>
  );
};

export default TaskGroupsListScreen;
