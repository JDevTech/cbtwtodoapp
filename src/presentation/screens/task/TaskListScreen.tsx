import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useTasks } from '@/presentation/hooks/useTasks';
import { useFocusEffect } from '@react-navigation/native';
import { TaskEntity } from '@/domain/entities/task.entity';
import TaskCard from '@/presentation/components/task/TaskCard';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@/presentation/components/common/CustomButton';
import CustomLoader from '@/presentation/components/common/CustomLoader';
import NotContentAvailable from '@/presentation/components/common/NotContentAvailable';

type TasksListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TasksList'
>;

const TasksListScreen = ({ route, navigation }: TasksListScreenProps) => {
  const { groupId, groupTitle } = route.params;
  const { tasks, fetchTasks, updateTask, deleteTask, loading } =
    useTasks(groupId);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Tasks in ${groupTitle}` });
  }, [navigation, groupTitle]);

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await updateTask(taskId, {
        completed: !task.completed,
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await deleteTask(taskId);
    }
  };

  const handleAddTask = () => {
    navigation.navigate('CreateTask', { groupId, groupTitle });
  };

  const renderItem = ({ item }: { item: TaskEntity }) => (
    <TaskCard
      title={item.title}
      createdAt={item.createdAt}
      completed={item.completed}
      onPress={() => handleToggleTask(item.id)}
      onDelete={() => handleDeleteTask(item.id)}
    />
  );

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <TaskListContainer>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<NotContentAvailable />}
      />
      <CustomButton title="Create Task" onPress={handleAddTask} />
    </TaskListContainer>
  );
};

const TaskListContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export default TasksListScreen;
