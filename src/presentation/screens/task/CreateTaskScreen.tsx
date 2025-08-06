import React, { useLayoutEffect } from 'react';
import { useTasks } from '@/presentation/hooks/useTasks';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';
import CreateTaskForm from '@/presentation/components/task/CreateTaskForm';

type CreateTaskScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateTask'
>;

const CreateTaskScreen = ({ route, navigation }: CreateTaskScreenProps) => {
  const { groupId, groupTitle } = route.params;
  const { createTask, loading } = useTasks(groupId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Create Task in ${groupTitle}` });
  }, [navigation, groupTitle]);

  const onSubmit = async (data: CreateTaskEntity) => {
    await createTask({
      groupId,
      completed: false,
      title: data.title,
    });

    navigation.goBack();
  };

  return <CreateTaskForm onSubmit={onSubmit} loading={loading} />;
};

export default CreateTaskScreen;
