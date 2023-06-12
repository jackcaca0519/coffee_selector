import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen'
import SearchingScreen from '../pages/SearchingScreen';
import FavoriteScreen from '../pages/FavoriteScreen'
import SettingsScreen from '../pages/SettingsScreen';
import CoffeeDetail from '../pages/CoffeeDetail'
import WebPage from '../pages/WebPage'

const Stack = createStackNavigator();

CoffeeStack = ({ name, content }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={name}
                options={({ route }: passingProps) => ({
                    title: route.name
                })}
                component={content}
            />
            <Stack.Screen name="Detail"
                options={({ route }: passingProps) => ({ title: route.params!.item.title })}
                component={CoffeeDetail}>
            </Stack.Screen>
            <Stack.Screen name="WebPage"
                options={() => ({ title: '' })}
                component={WebPage}>
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export const HomeScene = () => (
    <CoffeeStack name="Home" content={HomeScreen} />
)
export const SearchingScene = () => (
    <CoffeeStack name="Searching" content={SearchingScreen} />
)
export const FavoriteScene = () => (
    <CoffeeStack name="Favorite" content={FavoriteScreen} />
)
export const SettingsScene = () => (
    <CoffeeStack name="Settings" content={SettingsScreen} />
)