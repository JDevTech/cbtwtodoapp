import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const NotContentAvailableContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NotContentAvailableTitle = styled.Text`
  color: #999;
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
`;

const NotContentAvailable = () => {
  return (
    <NotContentAvailableContainer>
      <StyledImage source={require('../../../assets/not-content.png')} />
      <NotContentAvailableTitle>
        It seems there's no content
      </NotContentAvailableTitle>
    </NotContentAvailableContainer>
  );
};

const StyledImage = styled(Image)`
  width: 300px;
  height: 300px;
`;

export default NotContentAvailable;
