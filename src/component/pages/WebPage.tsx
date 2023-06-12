/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import WebViewComponent from '../utils/WebView';
import { View } from 'react-native';
const WebViewScreen = ({ route }) => {
    return (
        <View style={{ flex: 1 }}>
            <WebViewComponent source={route.params.Coffee.webLink} />
        </View>
    );
};
export default WebViewScreen;