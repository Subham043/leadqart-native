import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/index'
import LoginScreen from '../Screens/Login/index'
import RegisterScreen from '../Screens/Register/index'
import ForgotPasswordScreen from '../Screens/ForgotPassword/index'
import OtpScreen from '../Screens/Otp/index'

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signin"
                    component={LoginScreen}
                    options={{ title: 'Sign In', headerStyle: { backgroundColor: '#33b9ff'}, headerTintColor: '#fff',headerTitleStyle: {
                        alignItems: 'center',
                      }, headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                    name="Signup"
                    component={RegisterScreen}
                    options={{ title: 'Sign Up', headerStyle: { backgroundColor: '#33b9ff'}, headerTintColor: '#fff',headerTitleStyle: {
                        alignItems: 'center',
                      }, headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ title: 'Forgot Password', headerStyle: { backgroundColor: '#33b9ff'}, headerTintColor: '#fff',headerTitleStyle: {
                        alignItems: 'center',
                      }, headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                    name="OTP"
                    component={OtpScreen}
                    options={{ title: 'Verification', headerStyle: { backgroundColor: '#33b9ff'}, headerTintColor: '#fff',headerTitleStyle: {
                        alignItems: 'center',
                      }, headerTitleAlign: 'center' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
