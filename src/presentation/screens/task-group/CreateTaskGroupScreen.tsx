import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTaskGroups } from '@/presentation/hooks/useTaskGroups';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from '@/presentation/navigation/types';
import { CreateTaskGroupEntity } from '@/domain/entities/create-task-group.entity';

type CreateTaskGroupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateTaskGroup'
>;

const CreateTaskGroupScreen = ({ navigation }: CreateTaskGroupScreenProps) => {
  const { control, handleSubmit } = useForm<CreateTaskGroupEntity>();
  const { createTaskGroup, loading } = useTaskGroups();

  const onSubmit = async (data: CreateTaskGroupEntity) => {
    await createTaskGroup({
      title: data.title,
      description: data.description || '',
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Name:</Text>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            style={styles.input}
            onChangeText={onChange}
            placeholder="Enter group name"
          />
        )}
      />
      <Button
        title={loading ? 'Creating...' : 'Create Task Group'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
});

export default CreateTaskGroupScreen;
