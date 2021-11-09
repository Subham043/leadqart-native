import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Keyboard, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../../Components/ColorPicker'
import styles from './styles'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux"
import Toaster from '../../Components/Toaster'

const AddGroupScreen = ({ navigation }) => {

  const user = useSelector(selectUser)
  const rToken = useSelector(selectRefreshToken)
  const dispatch = useDispatch();

  const [name, setName] = useState("")
  const [nameErrorValue, setNameErrorValue] = useState("")
  const [nameError, setNameError] = useState(false)
  const [colorPicker, setColorPicker] = useState("#C0392B")
  const [showLoader, setShowLoader] = useState(false)
  const [showErrorToaster, setShowErrorToaster] = useState(false)
  const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
  const [showToaster, setShowToaster] = useState(false)
  const [showToasterMsg, setShowToasterMsg] = useState("")

  const nameHandler = (text) => {
    setName(text);
    if (text == '') {
      setNameError(true)
      setNameErrorValue('Please enter group name')
      return;
    } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
      setNameError(true)
      setNameErrorValue('Please enter a valid group name')
      return;
    } else {
      setNameError(false)
      setNameErrorValue('')
    }
  }

  const createGroup = async () => {

    Keyboard.dismiss()

    if (name == '') {
      setNameError(true)
      setNameErrorValue('Please enter group name')
      return;
    } else {
      setNameError(false)
      setNameErrorValue('')
    }

    if (nameError) {
      return;
    } else {
      setShowLoader(true)
      getTokens();
      try {
        const response = await axios.post('/groups/create', { name, color: colorPicker }, {
          headers: {
            'authorization': 'bearer ' + user,
          },
        });
        setShowLoader(false)
        if (response?.data?.message) {
          // console.log(response?.data?.message);
          setShowToasterMsg(response?.data?.message)
          setShowToaster(true)
          setTimeout(() => {
            setShowToaster(false)
            dispatch(setReload(true));
            navigation.goBack()
          }, 1000);
        }

        if (response?.data?.rateLimit) {
          setShowErrorToasterMsg(response?.data?.rateLimit)
          setShowErrorToaster(true)
          setTimeout(() => {
            setShowErrorToaster(false)
          }, 1000);
        }

        if (response?.data?.error) {
          if (response?.data?.error === "Unauthorised") {
            storeDataAsync("accessToken", response?.data.accessToken);
            storeDataAsync("refreshToken", response?.data.refreshToken);
            dispatch(login(response?.data.accessToken));
            dispatch(setRefreshToken(response?.data.refreshToken));
            return;
          }
          setShowErrorToasterMsg(response?.data?.error)
          setShowErrorToaster(true)
          setTimeout(() => {
            setShowErrorToaster(false)
          }, 1000);
        }

        if (response?.data?.errors?.name) {
          setNameError(true)
          setNameErrorValue(response?.data?.errors?.name?.msg)
        }

      } catch (error) {
        setShowLoader(false)
        console.log(error);
      }
    }



  }

  const getTokens = async () => {
    if (rToken !== null || rToken !== undefined) {
      const response = await axios.get('/refresh-token', {
        headers: {
          'refreshtoken': rToken,
        },
      });
      if (response?.data?.message) {
        storeDataAsync("accessToken", response?.data.accessToken);
        storeDataAsync("refreshToken", response?.data.refreshToken);
        dispatch(login(response?.data.accessToken));
        dispatch(setRefreshToken(response?.data.refreshToken));
      }

      if (response?.data?.error) {
        // console.log(response?.data?.error);
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
        dispatch(logout());
        dispatch(removeRefreshToken());
      }
    } else {
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('refreshToken')
      dispatch(logout());
      dispatch(removeRefreshToken());
      return;
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
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.topContainer}>
          {nameError ? <Text style={{ color: 'red', marginTop: 10, paddingHorizontal: 10, }}>{nameErrorValue}</Text> : null}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Group Name</Text>
            <TextInput placeholder="Enter group name" style={styles.input} placeholderTextColor={nameError ? "red" : "#ccc"} onChangeText={text => nameHandler(text)} defaultValue={name} />
          </View>
          <View style={styles.inputColorContainer}>
            <Text style={styles.label}>Group Color</Text>
            <ColorPalette
              scaleToWindow={false}
              onChange={color => setColorPicker(color)}
              value={colorPicker}
              colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9',]}
              title={""}
              icon={
                <AntDesign name={'check'} size={25} color={'#fff'} />
              }
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.saveContainer}
            onPress={createGroup}>
            <Text style={styles.textStyle}>CREATE GROUP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader status={showLoader} />
      <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
      <Toaster message={showToasterMsg} status={showToaster} />
    </View>
  )
}

export default AddGroupScreen
