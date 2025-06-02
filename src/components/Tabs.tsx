import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {width} from '@utils/helper';
import {COLORS} from 'constants/colors';

type TabProps = {
  tabs: string[];
  onTabChange: (index: number) => void;
};

const Tabs: React.FC<TabProps> = ({tabs, onTabChange}) => {
  const translateX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabWidth = width / tabs.length - 32 / tabs.length;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const handlePress = (index: number) => {
    setActiveIndex(index);
    translateX.value = withSpring(index * tabWidth, {damping: 15});
    onTabChange(index);
  };

  useEffect(() => {
    translateX.value = activeIndex * tabWidth;
  }, []);

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => handlePress(index)}>
          <Text
            style={[
              styles.tabText,
              activeIndex === index && styles.activeText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[styles.activeIndicator, indicatorStyle, {width: tabWidth}]}
      />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    position: 'relative',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.DESCRIPTION,
  },
  activeText: {
    color: COLORS.TEXT,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: COLORS.PRIMARY,
  },
});
