import React from 'react';
import { useTaskGroups } from '@/presentation/hooks/useTaskGroups';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateTaskGroupEntity } from '@/domain/entities/create-task-group.entity';
import CreateTaskGroupForm from '@/presentation/components/task-group/CreateTaskGroupForm';

type CreateTaskGroupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateTaskGroup'
>;

const CreateTaskGroupScreen = ({ navigation }: CreateTaskGroupScreenProps) => {
  const { createTaskGroup, loading } = useTaskGroups();

  const onSubmit = async (data: CreateTaskGroupEntity) => {
    await createTaskGroup({
      title: data.title,
      description: data.description || '',
    });

    navigation.goBack();
  };

  return <CreateTaskGroupForm onSubmit={onSubmit} loading={loading} />;
};

export default CreateTaskGroupScreen;
