import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { Dimensions, Animated, TextInput, ScrollView } from 'react-native';

import {
  Container,
  Scroll,
  Ruler,
  SegmentWrapper,
  Segment,
  SegmentIndicator,
  Input,
  Spacer,
} from './styles';
import { TimeSliderProps, TimeSliderRef } from './types';

const { width } = Dimensions.get('screen');

const minValue = 15;
const segmentsLength = 86;
const segmentWidth = 4;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 60;
const data = [...Array(segmentsLength).keys()].map(i => i + minValue);

const TimeSlider: ForwardRefRenderFunction<TimeSliderRef, TimeSliderProps> = (
  { initialValue = 30 },
  ref,
) => {
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  const [scrollX] = useState(() => new Animated.Value(0));
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const newValue = Math.round(value / snapSegment) + minValue;
      inputRef.current?.setNativeProps({
        text: String(newValue),
      });
      setCurrentValue(newValue);
    });

    setTimeout(() => {
      scrollRef.current?.scrollTo({
        x: (initialValue - minValue) * snapSegment,
        y: 0,
        animated: true,
      });
    }, 1000);

    return () => scrollX.removeAllListeners();
  }, [initialValue, scrollX]);

  useImperativeHandle(
    ref,
    () => ({
      value: currentValue,
    }),
    [currentValue],
  );

  return (
    <Container>
      <Scroll
        ref={scrollRef}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={snapSegment}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true },
        )}
      >
        <Ruler rulerWidth={rulerWidth}>
          <Spacer spacerWidth={spacerWidth} />
          {data.map(i => {
            const tenth = i % 5 === 0;
            return (
              <Segment
                key={String(i)}
                isTenth={tenth}
                isFinal={i - minValue === data.length - 1}
                segmentSpacing={segmentSpacing}
                segmentWidth={segmentWidth}
              />
            );
          })}
          <Spacer spacerWidth={spacerWidth} />
        </Ruler>
      </Scroll>
      <SegmentWrapper indicatorWidth={indicatorWidth}>
        <Input
          ref={inputRef}
          defaultValue={String(minValue)}
          editable={false}
        />
        <SegmentIndicator
          indicatorHeight={indicatorHeight}
          segmentWidth={segmentWidth}
        />
      </SegmentWrapper>
    </Container>
  );
};

export * from './types';

export default forwardRef(TimeSlider);
