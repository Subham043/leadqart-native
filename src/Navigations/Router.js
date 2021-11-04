import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/index'
import LoginScreen from '../Screens/Login/index'
import RegisterScreen from '../Screens/Register/index'
import ForgotPasswordScreen from '../Screens/ForgotPassword/index'
import OtpScreen from '../Screens/Otp/index'
import ResetPasswordScreen from '../Screens/ResetPassword/index'
import AddGroupScreen from '../Screens/AddGroup/index'
import AddMessageScreen from '../Screens/AddMessage/index'
import AddFileScreen from '../Screens/AddFile/index'
import AddPageScreen from '../Screens/AddPage/index'
import FacebookLeadDetailScreen from '../Screens/FacebookLeadDetail/index'
import GroupsListScreen from '../Screens/GroupsList/index'
import FollowUpListScreen from '../Screens/FollowUpList/index'
import LeadSearchListScreen from '../Screens/LeadSearchList/index'
import BottomTab from '../Navigations/BottomTab'

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddGroup"
                    component={AddGroupScreen}
                    options={{
                        title: 'Add Group', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="AddMessage"
                    component={AddMessageScreen}
                    options={{
                        title: 'Add Message', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="AddFile"
                    component={AddFileScreen}
                    options={{
                        title: 'Add File', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="AddPage"
                    component={AddPageScreen}
                    options={{
                        title: 'Add Page', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="FacebookLeadDetail"
                    component={FacebookLeadDetailScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GroupsList"
                    component={GroupsListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FollowUpList"
                    component={FollowUpListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LeadSearchList"
                    component={LeadSearchListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signin"
                    component={LoginScreen}
                    options={{
                        title: 'Sign In', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="Signup"
                    component={RegisterScreen}
                    options={{
                        title: 'Sign Up', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{
                        title: 'Forgot Password', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="OTP"
                    component={OtpScreen}
                    options={{
                        title: 'Verification', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                    options={{
                        title: 'Reset Password', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                            alignItems: 'center',
                        }, headerTitleAlign: 'center'
                    }}
                />
                {/* <Stack.Screen
                    name="fb"
                    component={FacebookScreen}
                    options={{ headerShown: false }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
