import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  withSpring,
  FadeInRight,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ICONS from '@assets/icons';
import {COLORS} from 'constants/colors';
import {TodoItemProps} from '../types';

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const checkScale = useSharedValue(completed ? 1 : 0);

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(checkScale.value)}],
    backgroundColor: completed ? COLORS.PRIMARY : 'transparent',
  }));

  const handleToggle = () => {
    checkScale.value = completed ? 0 : 1;
    onToggle(id);
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      style={styles.itemContainer}>
      <Pressable onPress={handleToggle} style={styles.checkbox}>
        <Animated.View style={[styles.innerCheck, animatedCheckStyle]} />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={[styles.title, completed && styles.strikeText]}>
          {title}
        </Text>
        {!!description && (
          <Text style={[styles.desc, completed && styles.strikeText]}>
            {description}
          </Text>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.editBtn}
        onPress={() => onEdit(id, title || '', description || '')}>
        <Image source={ICONS.EDIT} style={styles.editIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.deleteBtn}
        onPress={() => onDelete(id)}>
        <Image source={ICONS.BIN} style={styles.bin} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    marginBottom: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    backgroundColor: COLORS.CARD_BG,
    /* Shadow */
    shadowRadius: 4,
    shadowOpacity: 0.05,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {width: 0, height: 2},
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.PRIMARY,
  },
  innerCheck: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  textContainer: {flex: 1},
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT,
  },
  desc: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.DESCRIPTION,
  },
  strikeText: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bin: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.PRIMARY,
  },
  editBtn: {
    paddingLeft: 8,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: COLORS.PRIMARY,
  },
});
