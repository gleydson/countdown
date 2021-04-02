import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  interpolate,
  Extrapolate,
  event,
  Value,
  useDerivedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

import { SafeArea, Container, ContainerTimer, Timer } from './styles';

const { width, height } = Dimensions.get('screen');

const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;
const MINUTES_IN_MILLISECONDS = 60000;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function Home() {
  const inputRef = useRef<TextInput>(null);

  const [scrollX] = useState(() => new Value(0));
  const [duration, setDuration] = useState(timers[0]);

  const timerAnimation = useSharedValue(height);
  const textInputAnimation = useSharedValue(timers[0]);

  const inputAnimatedProps = useAnimatedProps(
    () => ({ text: String(Math.ceil(textInputAnimation.value)) }),
    [],
  );

  const animation = useCallback(() => {
    textInputAnimation.value = duration;
    timerAnimation.value = withTiming(0, { duration: 300 }, () => {
      timerAnimation.value = withTiming(height, {
        duration: duration * MINUTES_IN_MILLISECONDS,
      });
      textInputAnimation.value = withTiming(
        0,
        {
          duration: duration * MINUTES_IN_MILLISECONDS,
        },
        () => {
          textInputAnimation.value = duration;
        },
      );
    });
  }, [duration, textInputAnimation, timerAnimation]);

  const buttonAnimation = useDerivedValue(
    () =>
      timerAnimation.value < height
        ? withTiming(1, { duration: 300 })
        : withDelay(400, withTiming(0, { duration: 300 })),
    [],
  );

  const viewStyle = useAnimatedStyle(
    () => ({ transform: [{ translateY: timerAnimation.value }] }),
    [],
  );

  const textDurationStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        buttonAnimation.value,
        [0, 1],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    }),
    [],
  );

  const textTimersStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        buttonAnimation.value,
        [0, 1],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }),
    [],
  );

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        buttonAnimation.value,
        [0, 1],
        [1, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            buttonAnimation.value,
            [0, 1],
            [0, 200],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  return (
    <SafeArea>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'red',
            width,
            height,
          },
          viewStyle,
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
          },
        ]}
      >
        <TouchableOpacity onPress={animation}>
          <Animated.View
            style={[
              {
                width: 80,
                height: 80,
                borderRadius: 80,
                backgroundColor: 'blue',
              },
              buttonStyle,
            ]}
          />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: ITEM_SIZE,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            },
            textDurationStyle,
          ]}
        >
          <AnimatedTextInput
            ref={inputRef}
            style={{
              fontSize: ITEM_SIZE * 0.8,
              fontFamily: 'Menlo',
              color: 'black',
              fontWeight: '900',
            }}
            editable={false}
            animatedProps={inputAnimatedProps}
            defaultValue={String(duration)}
          />
        </Animated.View>
        <AnimatedFlatList
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          onScroll={event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}
          onMomentumScrollEnd={ev => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.x / ITEM_SIZE,
            );
            setDuration(timers[index]);
            // textInputAnimation.value = timers[index];
          }}
          contentContainerStyle={{
            paddingHorizontal: ITEM_SPACING,
          }}
          style={[{ flexGrow: 0 }, textTimersStyle]}
          data={timers}
          keyExtractor={item => String(item)}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const opacityOutputRange = [0.4, 1, 0.4];
            const scaleOutputRange = [0.6, 1, 0.6];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: opacityOutputRange,
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: scaleOutputRange,
            });

            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Animated.Text
                  style={{
                    fontSize: ITEM_SIZE * 0.8,
                    fontFamily: 'Menlo',
                    color: 'black',
                    fontWeight: '900',
                    opacity,
                    transform: [{ scale }],
                  }}
                >
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </SafeArea>
  );
}

export default Home;
