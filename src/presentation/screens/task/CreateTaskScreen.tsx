import React, { useLayoutEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTasks } from '@/presentation/hooks/useTasks';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type CreateTaskScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateTask'
>;

const CreateTaskScreen = ({ route, navigation }: CreateTaskScreenProps) => {
  const { groupId, groupTitle } = route.params;
  const { createTask, loading } = useTasks(groupId);
  const { control, handleSubmit } = useForm<CreateTaskEntity>();

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

export default CreateTaskScreen;
