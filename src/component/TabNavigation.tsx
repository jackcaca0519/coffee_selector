import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HomeScene, SearchingScene, FavoriteScene, SettingsScene } from './utils/CoffeeStack';

const routes = [
    {
        name: '首頁',
        id: 'HomeScene',
        icon: { ios: 'ios-home', android: 'home' },
        component: <HomeScene />,
    },
    {
        name: '搜尋',
        id: 'SearchScene',
        icon: { ios: 'ios-search', android: 'search' },
        component: <SearchingScene />,
    },
    {
        name: '最愛',
        id: 'FavoriteScene',
        icon: { ios: 'ios-heart', android: 'heart' },
        component: <FavoriteScene />,
    },
    // {
    //     name: '設定',
    //     id: 'SettingsScene',
    //     icon: { ios: 'ios-settings', android: 'settings' },
    //     component: <SettingsScene />,
    // },
];

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        for (let i = 0; i < routes.length; i += 1) {
                            if (route.name === routes[i].name) {
                                iconName = focused
                                    ? routes[i].icon[Platform.OS === 'ios' ? 'ios' : 'android']
                                    : `${routes[i].icon[Platform.OS === 'ios' ? 'ios' : 'android']
                                    }-outline`;
                                break;
                            }
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                {routes.map((route) => {
                    const EachScene = () => route.component;
                    return (
                        <Tab.Screen
                            name={route.name}
                            component={EachScene}
                            key={route.id}
                        />
                    );
                })}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default TabNavigation;