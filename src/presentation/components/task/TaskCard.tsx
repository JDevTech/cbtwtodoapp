import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type TaskCardProps = {
  title: string;
  createdAt: Date;
  completed: boolean;
  onPress: () => void;
  onDelete: () => void;
};

const TaskCard = ({
  title,
  createdAt,
  completed,
  onPress,
  onDelete,
}: TaskCardProps) => {
  const formatDate = (dateToFormat: Date) => {
    let dateObj: Date;
    if (dateToFormat instanceof Date) {
      dateObj = dateToFormat;
    } else if (
      dateToFormat &&
      typeof (dateToFormat as any).toDate === 'function'
    ) {
      dateObj = (dateToFormat as any).toDate();
    } else {
      dateObj = new Date(dateToFormat);
    }

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <TaskCardContainer
      colors={['#3DE9F5', '#15DFED', '#02AAB6']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <TaskCardTitle>{title}</TaskCardTitle>
        <TaskCardCreatedAt>{formatDate(createdAt)}</TaskCardCreatedAt>
        <TaskCardCheckbox checked={completed}>
          {completed && <TaskCardCheckboxIcon>✓</TaskCardCheckboxIcon>}
        </TaskCardCheckbox>
      </TouchableOpacity>
      <DeleteButton onPress={onDelete}>
        <DeleteButtonText>X Delete</DeleteButtonText>
      </DeleteButton>
    </TaskCardContainer>
  );
};

const TaskCardContainer = styled(LinearGradient)`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const TaskCardTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;

const TaskCardCheckbox = styled.View<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
`;

const TaskCardCheckboxIcon = styled.Text`
  color: #3de9f5;
  font-size: 16px;
`;

const TaskCardCreatedAt = styled.Text`
  font-size: 14px;
  color: #fff;
`;

const DeleteButton = styled.TouchableOpacity`
  margin-top: 8px;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

export default TaskCard;
