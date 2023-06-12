/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import TabNavigation from './src/component/TabNavigation';

import { Provider } from 'react-redux'
import store from './src/assets/redux/store'

const App = () => (
    <Provider store={store}>
        <TabNavigation />
    </Provider>
);

export default App;