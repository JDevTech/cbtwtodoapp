import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button } from 'react-native';
import { CreateTaskGroupEntity } from '@/domain/entities/create-task-group.entity';

interface CreateTaskGroupFormProps {
  onSubmit: (data: CreateTaskGroupEntity) => void;
}

const CreateTaskGroupForm = ({ onSubmit }: CreateTaskGroupFormProps) => {
  const { control, handleSubmit } = useForm<CreateTaskGroupEntity>();

  return (
    <View style={{ gap: 12 }}>
      <Text>Nombre del grupo</Text>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ borderWidth: 1, padding: 8 }}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Descripción (opcional)</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ borderWidth: 1, padding: 8 }}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button title="Crear grupo" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CreateTaskGroupForm;
