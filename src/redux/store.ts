import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';

import reduxStorage from '@utils/storage';
import {tasksApi} from '@features/tasks/store/tasksApi';
import tasksReducer from '@features/tasks/store/slices/tasksSlice';

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: [tasksApi.reducerPath], // because I need fresh data every time
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(tasksApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
