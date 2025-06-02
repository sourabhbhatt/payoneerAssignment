import {useDispatch, useSelector} from 'react-redux';
import React, {FC, useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';

import FAB from '@components/FAB';
import Tabs from '@components/Tabs';
import {RootState} from '@redux/store';
import {COLORS} from 'constants/colors';
import {STRINGS} from 'constants/strings';
import FadeText from '@components/FadeText';

import {Task} from '../types';
import TodoItem from '../components/TodoItem';
import CreateTaskModal from './CreateTaskModal';
import TaskSyncer from '../components/TaskSyncer';
import {
  addTask,
  deleteTask,
  resetSync,
  toggleTask,
  updateTask,
} from '../store/slices/tasksSlice';

const TasksScreen: FC = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasks = useSelector((state: RootState) => state?.tasks?.data);
  const filteredTasks = tasks.filter(task =>
    activeTab === 0 ? !task.completed : task.completed,
  );

  const handleAddTask = (title: string, description: string) => {
    dispatch(addTask({id: Date.now(), title, description, completed: false}));
  };

  const handleToggle = (id: number) => dispatch(toggleTask(id));
  const handleDelete = (id: number) => dispatch(deleteTask(id));

  const handleUpdate = (id: number, title: string, description: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      dispatch(updateTask({id, title, description}));
    }
  };

  const handleEdit = (id: number, title: string, description: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
      setModalVisible(true);
    }
  };

  const handleRetry = () => dispatch(resetSync());

  const renderItem = useCallback(
    ({item}: {item: Task}) => (
      <TodoItem
        {...item}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    ),
    [handleEdit, handleToggle, handleDelete],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FadeText text={STRINGS.TODO_TITLE} delay={100} style={styles.title} />
      <TaskSyncer />
      <Tabs tabs={['Pending', 'Completed']} onTabChange={setActiveTab} />
      <FlatList<Task>
        data={filteredTasks}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyExtractor={item => `${item?.id}`}
        ListEmptyComponent={
          <View style={styles.noDataBox}>
            <Text style={styles.noDataTitle}>
              {STRINGS.NO_OFFLINE_TODOS_AVAILABLE}
            </Text>
            <TouchableOpacity onPress={handleRetry} style={styles.retrySyncBtn}>
              <Text style={styles.retrySync}>{`↻ ${STRINGS.FETCH_DATA}`} </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <FAB
        onPress={() => {
          setEditingTask(null);
          setModalVisible(true);
        }}
      />
      <CreateTaskModal
        onAdd={handleAddTask}
        onUpdate={handleUpdate}
        visible={modalVisible}
        taskToEdit={editingTask ?? null}
        onClose={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
      />
    </SafeAreaView>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 16,
    textAlign: 'center',
    color: COLORS.TEXT,
    textDecorationLine: 'underline',
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  noDataBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.BORDER,
  },
  noDataTitle: {
    fontSize: 15,
    color: COLORS.TEXT,
  },
  retrySyncBtn: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.PRIMARY,
  },
  retrySync: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
});
