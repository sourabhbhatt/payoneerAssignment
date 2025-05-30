import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  Pressable,
  View,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {COLORS} from 'constants/colors';

type Props = {
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const FAB: React.FC<Props> = ({onPress, label = '+', style, textStyle}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      style={({pressed}) => [styles.wrapper, style, pressed && {opacity: 0.8}]}
      accessibilityRole="button"
      accessibilityLabel="Floating Action Button">
      <Animated.View style={[styles.fab, animatedStyle]}>
        <Text style={[styles.text, textStyle]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  wrapper: {
    right: 24,
    zIndex: 10,
    bottom: 30,
    position: 'absolute',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    // shadow
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {width: 0, height: 3},
  },
  text: {
    fontSize: 28,
    color: COLORS.TEXT,
    fontWeight: 'bold',
  },
});
