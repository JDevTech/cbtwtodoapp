import React from 'react';
import styled from 'styled-components/native';
import CustomButton from '../common/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';

interface CreateTaskFormProps {
  loading: boolean;
  onSubmit: (data: CreateTaskEntity) => void;
}

const CreateTaskForm = ({ onSubmit, loading }: CreateTaskFormProps) => {
  const { control, handleSubmit } = useForm<CreateTaskEntity>();

  return (
    <CreateTaskFormContainer>
      <CustomTextInputLabel>Task's Title</CustomTextInputLabel>
      <Controller
        control={control}
        name="title"
        rules={{ required: 'The title is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <CustomTextInput value={value} onChangeText={onChange} />
            {error && (
              <CustomTextInputError>{error.message}</CustomTextInputError>
            )}
          </>
        )}
      />

      <CustomButton
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        title={loading ? 'Creating...' : 'Create Task'}
      />
    </CreateTaskFormContainer>
  );
};

const CreateTaskFormContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const CustomTextInputLabel = styled.Text`
  margin-bottom: 8px;
`;

const CustomTextInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 12px;
`;

const CustomTextInputError = styled.Text`
  color: red;
`;

export default CreateTaskForm;
