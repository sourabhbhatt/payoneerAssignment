import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useGetTasksQuery} from '../store/tasksApi';
import {addTask, markSynced, resetSync} from '../store/slices/tasksSlice';

import {COLORS} from 'constants/colors';
import {STRINGS} from 'constants/strings';

import {RootState} from '@redux/store';
import SyncIndicator from '@components/SyncIndicator';
import useNetworkStatus from '@hooks/useNetworkStatus';

const TaskSyncer = () => {
  const dispatch = useDispatch();
  const isConnected = useNetworkStatus();
  const syncedOnce = useSelector((state: RootState) => state.tasks.syncedOnce);
  const [isSyncing, setIsSyncing] = useState(false);

  const {data, isSuccess, isFetching} = useGetTasksQuery(undefined, {
    skip: !isConnected || syncedOnce,
  });

  useEffect(() => {
    if (isSuccess && data && !syncedOnce) {
      setIsSyncing(true);
      data.forEach((task: any) => {
        dispatch(
          addTask({
            id: task.id,
            title: task.title,
            description: 'Synced from API',
            completed: task.completed,
          }),
        );
      });
      dispatch(markSynced());
      setTimeout(() => setIsSyncing(false), 1000);
    }
  }, [isSuccess, data, syncedOnce, dispatch]);

  const handleRetry = () => {
    if (isConnected) dispatch(resetSync());
  };

  if (isSyncing || (isFetching && isConnected)) {
    return <SyncIndicator />;
  }

  if (!isConnected) {
    return (
      <View style={styles.offlineBox}>
        <Text style={styles.offlineText}>{STRINGS.OFFLINE_TITLE}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={handleRetry}>
          <Text style={styles.retrySync}>{`↻ ${STRINGS.RETRY_SYNC}`} </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

export default TaskSyncer;

const styles = StyleSheet.create({
  offlineBox: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.WARNING,
  },
  retrySync: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
});
