import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type TaskCardProps = {
  title: string;
  createdAt: Date;
  onPress: () => void;
};

const TaskCard = ({ title, createdAt, onPress }: TaskCardProps) => {
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
      </TouchableOpacity>
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

const TaskCardCreatedAt = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export default TaskCard;
