/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'redux-zero/react';

import RootNavigator from './RootNavigator';
import store from './store';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </>
  );
};

export default App;
