import { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useTasks } from '@/presentation/hooks/useTasks';
import LinearGradient from 'react-native-linear-gradient';

type TaskGroupCardProps = {
  title: string;
  groupId: string;
  onPress: () => void;
  onDelete: () => void;
};

const TaskGroupCard = ({
  title,
  groupId,
  onPress,
  onDelete,
}: TaskGroupCardProps) => {
  const { tasks, fetchTasks } = useTasks(groupId);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TaskGroupCardContainer
      colors={['#3DE9F5', '#15DFED', '#02AAB6']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <TouchableOpacity onPress={onPress}>
        <TaskGroupTitle>{title}</TaskGroupTitle>
        <TaskGroupDescription>{tasks.length} tasks</TaskGroupDescription>
      </TouchableOpacity>
      <DeleteButton onPress={onDelete}>
        <DeleteButtonText>X Delete</DeleteButtonText>
      </DeleteButton>
    </TaskGroupCardContainer>
  );
};

const TaskGroupCardContainer = styled(LinearGradient)`
  width: 150px;
  height: 100px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const TaskGroupTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const TaskGroupDescription = styled.Text`
  font-size: 14px;
  color: #fff;
`;

const DeleteButton = styled.TouchableOpacity`
  margin-top: 8px;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-size: 14px;
  text-align: center;
`;

export default TaskGroupCard;
