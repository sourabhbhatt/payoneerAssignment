import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import Animated, {
  FadeInUp,
  withTiming,
  FadeOutDown,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {height} from '@utils/helper';
import {COLORS} from 'constants/colors';
import Button from '@components/Button';
import {STRINGS} from 'constants/strings';
import FadeText from '@components/FadeText';
import {OnboardingScreenProps} from '../types';
import {
  clearTaskList,
  resetSync,
} from '@features/tasks/store/slices/tasksSlice';

const INITIAL_RADIUS = 500;
const ENTRY_Y = height / 1.7;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const borderRadius = useSharedValue(INITIAL_RADIUS);
  const translateY = useSharedValue(ENTRY_Y);

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 800});
    borderRadius.value = withTiming(0, {duration: 800});
  }, []);

  const animatedBgStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    borderTopRightRadius: borderRadius.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBg, animatedBgStyle]} />

      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutDown}
        style={styles.content}>
        <FadeText text={STRINGS.APP_TITLE} delay={100} style={styles.title} />
        <FadeText
          delay={300}
          text={STRINGS.APP_DESCRIPTION}
          style={styles.description}
        />
        <FadeText text={STRINGS.APP_KEY_FEATURES_1} delay={500} />
        <FadeText text={STRINGS.APP_KEY_FEATURES_2} delay={700} />
        <FadeText text={STRINGS.APP_KEY_FEATURES_3} delay={900} />

        <Animated.View
          entering={FadeInUp.delay(1100).duration(400)}
          style={styles.buttonContainer}>
          <Button
            colors={COLORS.BUTTON_GRADIENT}
            title={STRINGS.START_BUTTON_LABEL}
            onPress={() => navigation.navigate('Tasks')}
          />
        </Animated.View>
        {/* <Button
          title="Clear Data"
          style={styles.clearBtn}
          onPress={() => {
            dispatch(clearTaskList());
            dispatch(resetSync());
          }}
        /> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  animatedBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.PRIMARY,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    width: '100%',
  },
  clearBtn: {
    marginTop: 16,
  },
});

export default OnboardingScreen;
