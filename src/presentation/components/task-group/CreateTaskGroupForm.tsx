import React from 'react';
import styled from 'styled-components/native';
import CustomButton from '../common/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { CreateTaskGroupEntity } from '@/domain/entities/create-task-group.entity';

interface CreateTaskGroupFormProps {
  loading: boolean;
  onSubmit: (data: CreateTaskGroupEntity) => void;
}

const CreateTaskGroupForm = ({
  onSubmit,
  loading,
}: CreateTaskGroupFormProps) => {
  const { control, handleSubmit } = useForm<CreateTaskGroupEntity>();

  return (
    <CreateTaskGroupFormContainer>
      <CustomTextInputLabel>Group's Name</CustomTextInputLabel>
      <Controller
        name="title"
        control={control}
        rules={{ required: 'The group name is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <CustomTextInput onChangeText={onChange} value={value} />
            {error && (
              <CustomTextInputError>{error.message}</CustomTextInputError>
            )}
          </>
        )}
      />

      <CustomButton
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        title={loading ? 'Creating...' : 'Create Task Group'}
      />
    </CreateTaskGroupFormContainer>
  );
};

const CreateTaskGroupFormContainer = styled.View`
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

export default CreateTaskGroupForm;
