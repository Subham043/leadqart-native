import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientsScreen from '../Screens/Clients/index'
import AccountScreen from '../Screens/Account/index'
import ContentScreen from '../Screens/Content/index'
import FollowUpScreen from '../Screens/FollowUp/index'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Clients') {
                        iconName = focused ? 'home' : 'home';
                            return <SimpleLineIcons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Content') {
                        iconName = focused ? 'filetext1' : 'filetext1';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    } else if (route.name === 'FollowUp') {
                        iconName = focused ? 'bell' : 'bell';
                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'account-cog-outline' : 'account-cog-outline';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }

                    // You can return any component that you like here!
                },
                tabBarActiveTintColor: '#ffa200',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Clients"
                component={ClientsScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Content"
                component={ContentScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="FollowUp"
                component={FollowUpScreen}
                options={{
                    title: 'Follow Ups', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                        alignItems: 'center',
                    }, headerTitleAlign: 'center'
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: 'Account', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                        alignItems: 'center',
                    }, headerTitleAlign: 'center'
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab
