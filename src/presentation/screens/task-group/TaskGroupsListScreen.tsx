import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTaskGroups } from '@/presentation/hooks/useTaskGroups';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@/presentation/components/common/CustomButton';
import CustomLoader from '@/presentation/components/common/CustomLoader';
import TaskGroupCard from '@/presentation/components/task-group/TaskGroupCard';
import NotContentAvailable from '@/presentation/components/common/NotContentAvailable';

type TaskGroupsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskGroups'
>;

const TaskGroupsListScreen = ({ navigation }: TaskGroupsScreenProps) => {
  const {
    loading,
    fetchTaskGroups,
    deleteTaskGroup,
    groups: taskGroups,
  } = useTaskGroups();

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

  const handleDeleteGroup = async (groupId: string) => {
    await deleteTaskGroup(groupId);
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <TaskGroupContainer>
      <FlatList
        numColumns={2}
        data={taskGroups}
        keyExtractor={item => item.id}
        columnWrapperStyle={FlatListStyleSheet.flatList}
        ListEmptyComponent={<NotContentAvailable />}
        renderItem={({ item }) => (
          <TaskGroupCard
            groupId={item.id}
            title={item.title}
            onDelete={() => handleDeleteGroup(item.id)}
            onPress={() => handleSelectGroup(item.id, item.title)}
          />
        )}
      />
      <CustomButton title="Create Task Group" onPress={handleAddGroup} />
    </TaskGroupContainer>
  );
};

const TaskGroupContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const FlatListStyleSheet = StyleSheet.create({
  flatList: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    display: 'flex',
  },
});

export default TaskGroupsListScreen;
