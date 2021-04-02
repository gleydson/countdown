import { Animated, Dimensions } from 'react-native';

import styled from 'styled-components/native';

import {
  SegmentStyledProps,
  RulerStyledProps,
  SegmentIndicatorStyledProps,
  SegmentWrapperStyledProps,
  SpacerStyledProps,
} from './types';

const { width } = Dimensions.get('screen');

export const Container = styled.View`
  position: relative;
`;

export const Scroll = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    justifyContent: 'flex-end',
  },
})``;

export const Ruler = styled.View<RulerStyledProps>`
  width: ${props => props.rulerWidth}px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const Segment = styled.View<SegmentStyledProps>`
  width: ${props => props.segmentWidth}px;
  height: ${props => (props.isTenth ? 40 : 20)}px;
  margin-right: ${({ isFinal, segmentSpacing }) =>
    isFinal ? 0 : segmentSpacing}px;
  margin-left: ${({ isFinal }) => (isFinal ? -4 : 0)}px;
  border-radius: ${props => props.theme.borderRadius.circle}px;

  background-color: ${props => props.theme.colors.tertiary};
`;

export const SegmentWrapper = styled.View<SegmentWrapperStyledProps>`
  position: absolute;
  left: ${props => (width - props.indicatorWidth) / 2}px;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: ${props => props.indicatorWidth}px;
`;

export const SegmentIndicator = styled.View<SegmentIndicatorStyledProps>`
  width: ${props => props.segmentWidth}px;
  height: ${props => props.indicatorHeight}px;
  border-radius: ${props => props.theme.borderRadius.circle}px;

  background-color: ${props => props.theme.colors.secondary};
`;

export const Input = styled.TextInput`
  font-size: ${props => props.theme.fontSize['6xl']}px;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

export const Spacer = styled.View<SpacerStyledProps>`
  width: ${props => props.spacerWidth}px;
`;
