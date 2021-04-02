import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;

  background-color: ${props => props.theme.colors.secondary};
`;

export const Container = styled.View`
  flex: 1;

  padding: ${props => props.theme.spacing.none}px
    ${props => props.theme.spacing.xm}px;
`;

export const ContainerTimer = styled.View`
  align-items: center;
`;

export const Timer = styled.Text`
  font-size: ${props => props.theme.fontSize['6xl'] * 3.5}px;
  font-weight: 600;
  z-index: 200;
`;
