/*
 - Shows button with text and arrow by default
 - On press (if `showArrow` is true), hides text and animates the arrow
 - After animation completes, triggers `onPress` callback
 - Uses Reanimated's `useSharedValue` + `runOnJS` for smooth UX
 */

import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Image,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ICONS from '@assets/icons';
import {COLORS} from 'constants/colors';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  colors?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  showArrow?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  colors,
  style,
  textStyle,
  showArrow = true,
}) => {
  const arrowTranslateX = useSharedValue(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    if (disabled || loading || isAnimating) return;
    if (showArrow) {
      setIsAnimating(true);
      arrowTranslateX.value = withTiming(32, {duration: 400}, finished => {
        if (finished) {
          runOnJS(onPress)();
          runOnJS(setIsAnimating)(false);
          arrowTranslateX.value = 0;
        }
      });
    } else onPress();
  };

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [{translateX: arrowTranslateX.value}],
  }));

  const renderContent = () => {
    if (loading) return <ActivityIndicator color={COLORS.TEXT} />;

    if (showArrow && isAnimating) {
      return (
        <Animated.Image
          source={ICONS.ARROW_BROKEN}
          style={[styles.arrowOnly, animatedArrowStyle]}
        />
      );
    }

    return (
      <View style={styles.row}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {showArrow && <Image source={ICONS.ARROW} style={styles.arrow} />}
      </View>
    );
  };

  const WrapperContent = colors ? (
    <LinearGradient
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.button, fullWidth && {width: '100%'}, style]}>
      {renderContent()}
    </LinearGradient>
  ) : (
    <View style={[styles.button, fullWidth && {width: '100%'}, style]}>
      {renderContent()}
    </View>
  );

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading || isAnimating}
      accessibilityRole="button"
      accessible>
      <View style={[disabled && styles.disabled]}>{WrapperContent}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
  },
  disabled: {opacity: 0.5},
  row: {
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT,
  },
  arrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: COLORS.TEXT,
  },
  arrowOnly: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: COLORS.TEXT,
  },
});

export default Button;
