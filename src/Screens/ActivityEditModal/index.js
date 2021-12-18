import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, Pressable, Platform, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import axios from "../../../axios"
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'

const ActivityEditModal = ({ navigation, route }) => {

    const { activity, name } = route.params;

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)

    const [activityLogType, setActivityLogType] = useState(activity.type)
    const [dateInput, setDateInput] = useState(new Date(activity.timestamp!== null?activity.timestamp:activity.created_at))
    const [isChecked, setIsChecked] = useState(activity.type)

    const [date, setDate] = useState(new Date(activity.timestamp!== null?activity.timestamp:activity.created_at));
    const [modeDateTime, setModeDateTime] = useState('date');
    const [showDateTime, setShowDateTime] = useState(false);

    const [message, setMessage] = useState(activity.description!== null?activity.description:"")
    const [messageErrorValue, setMessageErrorValue] = useState("")
    const [messageError, setMessageError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const refGroup = useRef();

    const onChangeDateTimePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDateTime(Platform.OS === 'ios');
        setDate(currentDate);
        setDateInput(currentDate);
        if(modeDateTime==="date") {
            showMode('time');
        }
    };

    const showMode = (currentMode) => {
        setShowDateTime(true);
        setModeDateTime(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    

    const checkBoxHandler = (value) => {
        setIsChecked(value)
        setActivityLogType(value)
        refGroup.current.close()
    }

    const getMonthInWord = (month) => {
        switch (month) {
            case 1:
                return "Jan";
                break;
            case 2:
                return "Feb";
                break;
            case 3:
                return "Mar";
                break;
            case 4:
                return "Apr";
                break;
            case 5:
                return "May";
                break;
            case 6:
                return "Jun";
                break;
            case 7:
                return "Jul";
                break;
            case 8:
                return "Aug";
                break;
            case 9:
                return "Sep";
                break;
            case 10:
                return "Oct";
                break;
            case 11:
                return "Nov";
                break;
            case 12:
                return "Dec";
                break;
            default:
                return "Jan";
                break;
        }
    }

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const messageHandler = (text) => {
        setMessage(text);
    }

    const saveActivityRefHandler = async () => {

        setShowLoader(true)
        try {
            const response = await axios.post(`/activity/edit/${activity.id}`, {
                type: activityLogType,
                timestamp: dateInput,
                description: message
            }, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            setShowLoader(false)
            if (response?.data?.message) {
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
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                }
                setShowErrorToasterMsg(response?.data?.error)
                setShowErrorToaster(true)
                setTimeout(() => {
                    setShowErrorToaster(false)
                }, 1000);
            }

        } catch (error) {
            setShowLoader(false)
            console.log(error);
        }
        setShowLoader(false)

    }

    return (
        <SafeAreaView style={{ ...styles.mainContainer }}>
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>

                        <MaterialIcons name="arrow-back-ios" size={25} color="white" />
                        <Text style={styles.backButtonText}>Edit Activity With {name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <ScrollView style={styles.topModalContainer}>

                        <View style={styles.inputGroupContainer}>
                            <Text style={styles.label}>Activity Type</Text>
                            <Pressable onPress={() => refGroup.current.open()} style={styles.inputTextAreaContainer}>
                                <View style={styles.dateTimePickerContainer}>
                                    {activityLogType === "Phone Call" ? <Ionicons name="call" size={25} color="#ffa200" /> : null}
                                    {activityLogType === "Message" ? <MaterialIcons name="message" size={25} color="#ffa200" /> : null}
                                    {activityLogType === "Email" ? <Ionicons name="ios-mail-sharp" size={25} color="#ffa200" /> : null}
                                    {activityLogType === "Whatsapp" ? <Ionicons name="logo-whatsapp" size={25} color="#ffa200" /> : null}
                                    <Text style={styles.inputText}>{activityLogType}</Text>
                                </View>
                                <Text style={styles.uploadText}>SELECT</Text>
                            </Pressable>
                        </View>
                        <View style={styles.inputGroupContainer}>
                            <Text style={styles.label}>Activity Timestamp</Text>
                            <Pressable onPress={() => showDatepicker()} style={styles.inputTextAreaContainer}>
                                <View style={styles.dateTimePickerContainer}>
                                    <AntDesign name="clockcircle" size={25} color="#ffa200" />
                                    <Text style={styles.inputText}>{dateInput.getDate()} {getMonthInWord(dateInput.getDate() + 1)} {dateInput.getFullYear()}, {formatAMPM(dateInput)}</Text>
                                </View>
                                <Text style={styles.uploadText}>SELECT</Text>
                            </Pressable>
                        </View>
                        <View style={styles.inputGroupContainer}>
                            <Text style={styles.label}>Description</Text>
                            {messageError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{messageErrorValue}</Text> : null}
                            <View style={styles.inputTextAreaBigContainer}>
                                <TextInput placeholder="Enter description" style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={messageError ? "red" : "#ccc"} onChangeText={text => messageHandler(text)} value={message} />

                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={() => saveActivityRefHandler()}
                            style={styles.saveContainer}>
                            <Text style={styles.textStyle}>UPDATE ACTIVITY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showDateTime && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={modeDateTime}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDateTimePicker}
                />
            )}
            <BottomMaskPopUp refRBSheet={refGroup} height={350}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Select Activity Type</Text>
                    </View>
                    <View style={[styles.groupOptionScrollBackground]}>
                        <ScrollView style={[styles.groupOptionScroll]}>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => checkBoxHandler("Phone Call")} >
                                <Text style={styles.checkBoxText}>Phone Call</Text>
                                {isChecked === "Phone Call" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => checkBoxHandler("Message")} >
                                <Text style={styles.checkBoxText}>Message</Text>
                                {isChecked === "Message" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => checkBoxHandler("Email")} >
                                <Text style={styles.checkBoxText}>Email</Text>
                                {isChecked === "Email" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => checkBoxHandler("Whatsapp")} >
                                <Text style={styles.checkBoxText}>Whatsapp</Text>
                                {isChecked === "Whatsapp" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                </View>
            </BottomMaskPopUp>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default ActivityEditModal
