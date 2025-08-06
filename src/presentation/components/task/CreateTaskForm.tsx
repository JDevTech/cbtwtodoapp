import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface CreateTaskFormProps {
  onSubmit: (data: CreateTaskEntity) => void;
}

export const CreateTaskForm = ({ onSubmit }: CreateTaskFormProps) => {
  const { control, handleSubmit } = useForm<CreateTaskEntity>();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la tarea</Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: 'El título es obligatorio' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la tarea"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Button title="Agregar Tarea" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
