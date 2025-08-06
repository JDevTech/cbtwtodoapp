import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const CustomButton = ({ title, onPress, disabled }: CustomButtonProps) => {
  return (
    <ButtonContainer
      colors={['#fe6df6', '#FF00FB', '#FF00FB']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ButtonText onPress={onPress} disabled={disabled}>
        {title}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(LinearGradient)`
  bottom: 40px;
  display: flex;
  min-width: 258px;
  min-height: 58px;
  padding: 12px 16px;
  border-radius: 10px;
  position: absolute;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export default CustomButton;
