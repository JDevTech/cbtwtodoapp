import React, { useCallback, useLayoutEffect } from 'react';
import { useTasks } from '@/presentation/hooks/useTasks';
import { useFocusEffect } from '@react-navigation/native';
import { TaskEntity } from '@/domain/entities/task.entity';
import TaskCard from '@/presentation/components/task/TaskCard';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@/presentation/components/common/CustomButton';

type TasksListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TasksList'
>;

const TasksListScreen = ({ route, navigation }: TasksListScreenProps) => {
  const { groupId, groupTitle } = route.params;
  const { tasks, fetchTasks } = useTasks(groupId);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Tasks in ${groupTitle}` });
  }, [navigation, groupTitle]);

  const handleToggleTask = (taskId: string) => {
    console.log('Toggle task:', taskId);
  };

  const handleAddTask = () => {
    navigation.navigate('CreateTask', { groupId, groupTitle });
  };

  const renderItem = ({ item }: { item: TaskEntity }) => (
    <TaskCard
      title={item.title}
      createdAt={item.createdAt}
      onPress={() => handleToggleTask(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No hay tareas.</Text>}
      />

      <CustomButton title="Create Task" onPress={handleAddTask} />
    </View>
  );
};

export default TasksListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  completedTask: {
    backgroundColor: '#c8e6c9',
  },
  taskTitle: {
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
  },
});
