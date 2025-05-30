import React, {FC} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {COLORS} from 'constants/colors';
import {STRINGS} from 'constants/strings';

const SyncIndicator: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.PRIMARY} />
      <Text style={styles.text}>{STRINGS.SYNCING_TASK}</Text>
    </View>
  );
};

export default SyncIndicator;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.CARD_BG,
  },
  text: {
    fontSize: 14,
    color: COLORS.TEXT,
  },
});
