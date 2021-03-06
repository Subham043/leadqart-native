import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/index'
import LoginScreen from '../Screens/Login/index'
import RegisterScreen from '../Screens/Register/index'
import ForgotPasswordScreen from '../Screens/ForgotPassword/index'
import OtpScreen from '../Screens/Otp/index'
import LoginOtpScreen from '../Screens/LoginOtp/index'
import ResetPasswordScreen from '../Screens/ResetPassword/index'
import AddGroupScreen from '../Screens/AddGroup/index'
import AddMessageScreen from '../Screens/AddMessage/index'
import FacebookConfigurationScreen from '../Screens/FacebookConfiguration/index'
import EditMessageScreen from '../Screens/EditMessage/index'
import EditFileScreen from '../Screens/EditFile/index'
import EditPageScreen from '../Screens/EditPage/index'
import AddFileScreen from '../Screens/AddFile/index'
import ImportLeadScreen from '../Screens/ImportLead/index'
import AddPageScreen from '../Screens/AddPage/index'
import AddLeadScreen from '../Screens/AddLead/index'
import ProfileScreen from '../Screens/Profile/index'
import AddDriveLeadScreen from '../Screens/AddDriveLead/index'
import InviteUserScreen from '../Screens/InviteUser/index'
import FacebookLeadDetailScreen from '../Screens/FacebookLeadDetail/index'
import ViewMessageScreen from '../Screens/ViewMessage/index'
import SendMessageScreen from '../Screens/SendMessage/index'
import SendFileScreen from '../Screens/SendFile/index'
import SendPageScreen from '../Screens/SendPage/index'
import ViewFileScreen from '../Screens/ViewFile/index'
import ViewPageScreen from '../Screens/ViewPage/index'
import GroupsListScreen from '../Screens/GroupsList/index'
import NewLeadListScreen from '../Screens/NewLeadList/index'
import FollowUpListScreen from '../Screens/FollowUpList/index'
import LeadSearchListScreen from '../Screens/LeadSearchList/index'
import ClientSenderListScreen from '../Screens/ClientSenderList/index'
import AssignedLeadsListScreen from '../Screens/AssignedLeadsList/index'
import AssignLeadsListScreen from '../Screens/AssignLeadsList/index'
import ContentSenderListScreen from '../Screens/ContentSenderList/index'
import LoadingScreen from '../Screens/Loading/index'
import ActivityModal from '../Screens/ActivityModal/index'
import ActivityEditModal from '../Screens/ActivityEditModal/index'
import IntegrationScreen from '../Screens/Integration/index'
import BottomTab from '../Navigations/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "../../axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken } from "../../app/feature/refreshTokenSlice"
import WebPage from '../Screens/WebPage';
import PdfView from '../Screens/PdfView';

const Stack = createNativeStackNavigator();


let accessToken = null;
let refreshToken = null;


const Router = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        let mounted = true;
        setLoading(true)
        refreshToken = await getDataAsync('refreshToken')
        if (refreshToken !== null) {
            const response = await axios.get('/refresh-token', {
                headers: {
                    'refreshtoken': refreshToken,
                },
            });
            
            if (response?.data?.message) {
                if (mounted) {
                    setUserRedux(response?.data.accessToken, response?.data.refreshToken)
                    .then((resp)=>{})
                    // storeDataAsync("refreshToken", response?.data.refreshToken);
                    // dispatch(login(response?.data.accessToken));
                    // dispatch(setRefreshToken(response?.data.refreshToken));
                }
            }

            if (response?.data?.error) {
                // console.log(response?.data?.error);
                if (mounted) {
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                }

            }
        } else {
            if (mounted) {
                await AsyncStorage.removeItem('refreshToken')
                dispatch(logout());
                dispatch(removeRefreshToken());
            }
        }

        setLoading(false);

        return () => mounted = false;
    }, [refreshToken])

    const setUserRedux = (accessToken, refreshToken) => {
        return new Promise((resolve, reject) => {
            storeDataAsync("refreshToken", refreshToken);
            dispatch(login(accessToken));
            dispatch(setRefreshToken(refreshToken));
            resolve("done")
        })
    }

    const getDataAsync = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            // await AsyncStorage.removeItem(key)
            return (JSON.parse(value));
        } catch (e) {
            // error reading value
            console.log("error: ", e);
        }
    }

    const storeDataAsync = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
            console.log(e);
        }
    }


    return (
        <NavigationContainer>
            {loading ? <LoadingScreen /> :
                <Stack.Navigator>
                    {user !== null ?
                        <>
                            <Stack.Screen
                                name="Main"
                                component={BottomTab}
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
                                name="FacebookConfiguration"
                                component={FacebookConfigurationScreen}
                                options={{
                                    title: 'Facebook Configuration', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="EditMessage"
                                component={EditMessageScreen}
                                options={{
                                    title: 'Edit Message', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="EditFile"
                                component={EditFileScreen}
                                options={{
                                    title: 'Edit File', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="EditPage"
                                component={EditPageScreen}
                                options={{
                                    title: 'Edit Page', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
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
                                name="ImportLead"
                                component={ImportLeadScreen}
                                options={{
                                    title: 'Import Lead', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
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
                                name="AddLead"
                                component={AddLeadScreen}
                                options={{
                                    title: 'Add Lead', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={ProfileScreen}
                                options={{
                                    title: 'Edit Profile', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="AddDriveLead"
                                component={AddDriveLeadScreen}
                                options={{
                                    title: 'Import Lead', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="InviteUser"
                                component={InviteUserScreen}
                                options={{
                                    title: 'Invite User', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="Integration"
                                component={IntegrationScreen}
                                options={{
                                    title: 'Integration', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
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
                                name="ViewMessage"
                                component={ViewMessageScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SendMessage"
                                component={SendMessageScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SendFile"
                                component={SendFileScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SendPage"
                                component={SendPageScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ViewFile"
                                component={ViewFileScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ViewPage"
                                component={ViewPageScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="GroupsList"
                                component={GroupsListScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="NewLeadList"
                                component={NewLeadListScreen}
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
                                name="ClientSenderList"
                                component={ClientSenderListScreen}
                                options={{
                                    title: 'Select a client', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="AssignedLeadsList"
                                component={AssignedLeadsListScreen}
                                options={{
                                    title: 'Assigned Leads', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="AssignLeadsList"
                                component={AssignLeadsListScreen}
                                options={{
                                    title: 'Assign Leads', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Screen
                                name="ContentSenderList"
                                component={ContentSenderListScreen}
                                options={{
                                    title: 'Select a content', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }}
                            />
                            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                                <Stack.Screen name="ActivityModal" component={ActivityModal} options={{ headerShown: false }} />
                                <Stack.Screen name="ActivityEditModal" component={ActivityEditModal} options={{ headerShown: false }} />
                                <Stack.Screen name="WebPage" component={WebPage} options={{
                                    title: 'Content Page Preview', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }} />
                                <Stack.Screen name="PdfView" component={PdfView} options={{
                                    title: 'Content File Preview', headerStyle: { backgroundColor: '#33b9ff' }, headerTintColor: '#fff', headerTitleStyle: {
                                        alignItems: 'center',
                                    }, headerTitleAlign: 'center'
                                }} />
                            </Stack.Group>
                        </> :
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
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
                                name="LoginOtp"
                                component={LoginOtpScreen}
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
                        </>}
                    {/* <Stack.Screen
                    name="fb"
                    component={FacebookScreen}
                    options={{ headerShown: false }}
                /> */}
                </Stack.Navigator>}
        </NavigationContainer>
    )
}

export default Router
