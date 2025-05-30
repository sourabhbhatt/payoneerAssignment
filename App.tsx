/*
  App Entry:
  - State Management: Redux Toolkit + Redux Persist
*/

import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '@redux/store';
import RootNavigator from '@navigator/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <RootNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});

export default App;
