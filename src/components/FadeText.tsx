import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';

import {COLORS} from 'constants/colors';

interface FadeTextProps {
  text: string;
  delay: number;
  style?: any;
}

const FadeText: FC<FadeTextProps> = ({text, delay, style}) => (
  <Animated.Text
    entering={FadeInUp.delay(delay).duration(400)}
    style={[styles.defaultStyle, style]}>
    {text}
  </Animated.Text>
);

export default FadeText;

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 15,
    marginTop: 8,
    fontWeight: '400',
    color: COLORS.TEXT,
  },
});
