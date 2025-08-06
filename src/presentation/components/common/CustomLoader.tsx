import styled from 'styled-components/native';

const LoaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoaderText = styled.Text`
  color: #999;
  font-size: 18px;
  font-weight: bold;
`;

const CustomLoader = () => {
  return (
    <LoaderContainer>
      <LoaderText>Loading...</LoaderText>
    </LoaderContainer>
  );
};

export default CustomLoader;
