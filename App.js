import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import Router from './src/Navigations/Router';
import { store } from './app/store';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "./axios"

export default function App() {

  useEffect(async () => {
    const accessToken = await getDataAsync('accessToken')
    const refreshToken = await getDataAsync('refreshToken')
    // console.log("accessToken : ",accessToken)
    // console.log("refreshToken : ",refreshToken)
    if (accessToken === null || accessToken === null) {
      if (refreshToken !== null || refreshToken !== null) {
        const response = await axios.get('/refresh-token', {
          headers: {
            'refreshtoken': refreshToken,
          },
        });
        if (response?.data?.message) {
          storeDataAsync("accessToken", response?.data.accessToken);
          storeDataAsync("refreshToken", response?.data.refreshToken);
          // console.log(response?.data?.message);
        }

        if (response?.data?.error) {
          // console.log(response?.data?.error);
        }
      }
    }
  }, [getDataAsync, storeDataAsync])

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
    <Provider store={store}>
      <StatusBar style="auto" />
      <Router />
    </Provider>
  );
}

