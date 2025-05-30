import {Task} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TaskState = {
  data: Task[];
  syncedOnce: boolean;
};

const defaultTasks: Task[] = [
  {
    id: Date.now(),
    title: 'This is the first task',
    description: 'Default task-01',
    completed: false,
  },
  {
    id: Date.now() + 1,
    title: 'This is the second task',
    description: 'Default task-02',
    completed: true,
  },
];

const initialState: TaskState = {
  data: defaultTasks,
  syncedOnce: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.data.push(action.payload);
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.data.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    updateTask(
      state,
      action: PayloadAction<{id: number; title: string; description: string}>,
    ) {
      const {id, title, description} = action.payload;
      const task = state.data.find(t => t.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.data = state.data.filter(t => t.id !== action.payload);
    },
    clearTaskList(state) {
      state.data = defaultTasks;
    },
    markSynced(state) {
      state.syncedOnce = true;
    },
    resetSync(state) {
      state.syncedOnce = false;
    },
  },
});

export const {
  addTask,
  toggleTask,
  updateTask,
  deleteTask,
  markSynced,
  resetSync,
  clearTaskList,
} = tasksSlice.actions;

export default tasksSlice.reducer;
