import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable, TextInput, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import * as Linking from 'expo-linking';
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import axios from "../../../axios"
import GroupSelectionPlaceholder from '../../Components/GroupSelectionPlaceholder'
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import DateTimePicker from '@react-native-community/datetimepicker';

const FacebookLeadDetailScreen = ({ route, navigation }) => {

    const { leadId, leadItem } = route.params;

    const refRBSheet = useRef();
    const refCallLog = useRef();
    const refNote = useRef();
    const refGroup = useRef();
    const refActivity = useRef();
    const refFollow = useRef();

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)

    const [showNavbarText, setShowNavbarText] = useState(false)
    const [activityLogType, setActivityLogType] = useState("")
    const [noteText, setNoteText] = useState("")
    const [noteTextErrorValue, setNoteTextErrorValue] = useState("")
    const [noteTextError, setNoteTextError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [groupData, setGroupData] = React.useState([]);
    const [leadGroupData, setLeadGroupData] = React.useState([]);
    const [newLeadGroupData, setNewLeadGroupData] = React.useState([]);
    const [leadDetail, setLeadDetail] = React.useState({});
    const [activityData, setActivityData] = React.useState([]);
    const [activityObject, setActivityObject] = React.useState({});
    const [followChecked, setFollowChecked] = useState("NEVER")

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const [date, setDate] = useState(new Date());
    const [modeDateTime, setModeDateTime] = useState('date');
    const [showDateTime, setShowDateTime] = useState(false);

    const handleScroll = (event) => {
        event.nativeEvent.contentOffset.y > 56 ? setShowNavbarText(true) : setShowNavbarText(false)
    }

    const callHandler = () => {
        Linking.openURL(`tel:+91${leadDetail.phone}`)
        refCallLog.current.open()
        setActivityLogType('Phone Call')
    }
    const smsHandler = () => {
        Linking.openURL(`sms:${leadDetail.phone}`)
        refCallLog.current.open()
        setActivityLogType('Message')
    }
    const emailHandler = () => {
        Linking.openURL(`mailto:${leadDetail.email}`)
        refCallLog.current.open()
        setActivityLogType('Email')
    }
    const whatsappHandler = () => {
        Linking.openURL(`whatsapp://send?phone=+91${leadDetail.phone}`)
        refCallLog.current.open()
        setActivityLogType('Whatsapp')
    }

    const noteTextHandler = (text) => {
        setNoteTextError(false)
        setNoteTextErrorValue('')
        setNoteText(text)
    }

    useEffect(() => {
        loadLeadData();
        loadActivityData();
    }, [leadId, reload])

    const loadLeadData = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/leads/view/${leadId}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setLeadDetail(resp?.data?.leads)
                setLeadGroupData(resp?.data?.leads.groups)
                setNoteText(resp?.data?.leads.notes === null ? "" : resp?.data?.leads.notes)
            }

            if (resp?.data?.error) {
                console.log(resp?.data?.error);
                if (resp?.data?.error === "Unauthorised") {
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                    return;
                }
            }


        } catch (e) { console.log(e) }
        setShowLoader(false)
    }

    const loadActivityData = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/activity/view-all/${leadId}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setActivityData(resp?.data?.groups)
            }

            if (resp?.data?.error) {
                console.log(resp?.data?.error);
                if (resp?.data?.error === "Unauthorised") {
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                    return;
                }
            }


        } catch (e) { console.log(e) }
        setShowLoader(false)
    }

    const checkBoxHandler = (id) => {

        let group = groupData.findIndex((obj => obj.id == id));
        groupData[group].isChecked = groupData[group].isChecked === undefined ? true : !groupData[group].isChecked
        if (groupData[group].isChecked === true) {
            let newLeadGroupObj = {}
            let newLeadGroup = newLeadGroupData.findIndex((obj => obj.group_id == id));
            if (newLeadGroup == -1) {
                newLeadGroupObj['lead_id'] = (leadId).toString();
                newLeadGroupObj['group_id'] = (id).toString();
                setNewLeadGroupData([...newLeadGroupData, newLeadGroupObj]);
            } else {
                newLeadGroupData[newLeadGroup].lead_id = (leadId).toString();
                newLeadGroupData[newLeadGroup].group_id = (id).toString();
                setNewLeadGroupData([...newLeadGroupData]);
            }

        } else {
            let newLeadGroup = newLeadGroupData.filter((obj => obj.group_id != id));
            setNewLeadGroupData(newLeadGroup);
        }
        setGroupData([...groupData]);

    }


    useEffect(() => {
        let mounted = true

        if (mounted) {
            setLeadDetail(leadItem)
            setNoteText(leadItem.notes === null ? "" : leadItem.notes)
            setLeadGroupData(leadItem.groups)
        }
        return () => mounted = false;
    }, [leadId])

    const groupBtnHandler = () => {
        refRBSheet.current.close()
        setLeadGroupData(leadItem.groups)
        setGroupData([])
        getGroups();
        refGroup.current.open()
    }

    const getGroups = async () => {
        setLoading(true)
        try {
            const resp = await axios.get('/groups/view-all', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                let receivedData = resp?.data?.groups
                let data = await groupLeadAssignHandler(receivedData)
                setGroupData(data)
                setLoading(false)
            }

            if (resp?.data?.error) {
                console.log(resp?.data?.error);
                if (resp?.data?.error === "Unauthorised") {
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                }
            }


        } catch (e) { console.log(e); setLoading(false) }

    }

    const groupLeadAssignHandler = (receivedData) => {
        return new Promise((resolve, reject) => {
            let newArr = [];
            receivedData.map(async (item, index) => {
                if (leadGroupData.some(i => i['id'] === item.id)) {
                    receivedData[index].isChecked = true;
                    let newLeadGroupObj = {}
                    newLeadGroupObj['lead_id'] = (leadId).toString();
                    newLeadGroupObj['group_id'] = (item.id).toString();
                    newArr.push(newLeadGroupObj)
                }
            })
            setNewLeadGroupData([...newArr]);
            resolve(receivedData)
        })
    }

    const saveGroupRefHandler = async () => {
        if (newLeadGroupData.length === 0) {
            setShowErrorToasterMsg('Please select a group')
            setShowErrorToaster(true)
            setTimeout(() => {
                setShowErrorToaster(false)
            }, 1000);
            return;
        }
        setShowLoader(true)
        refGroup.current.close();
        try {
            const response = await axios.post('/lead-group/create', { input: newLeadGroupData }, {
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
                }, 1000);
                loadLeadData();
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

    const saveNotesRefHandler = async () => {

        setShowLoader(true)
        refNote.current.close()
        try {
            const response = await axios.post(`/leads/edit-note/${leadId}`, {
                notes: (noteText).length > 0 ? noteText : null,
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
                }, 1000);
                loadLeadData();
            }

            if (response?.data?.rateLimit) {
                setShowErrorToasterMsg(response?.data?.rateLimit)
                setShowErrorToaster(true)
                setTimeout(() => {
                    setShowErrorToaster(false)
                }, 1000);
            }

            if (response?.data?.errors?.notes) {
                setNoteTextError(true)
                setNoteTextErrorValue(response?.data?.errors?.notes?.msg)
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

    const saveActivityRefHandler = async () => {

        setShowLoader(true)
        refCallLog.current.close()
        try {
            const response = await axios.post(`/activity/create/${leadId}`, {
                type: activityLogType,
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
                }, 1000);
                loadActivityData();
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

    const ActivityOptionHandler = (item) => {
        setActivityObject(item)
        refActivity.current.open()
    }

    const ActivityDeleteHandler = async () => {
        setShowLoader(true)
        refActivity.current.close()
        try {
            const response = await axios.delete(`/activity/delete/${activityObject.id}`, {
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
                }, 1000);
                loadActivityData();
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

    const ActivityEditHandler = () =>{
        refActivity.current.close()
        navigation.navigate('ActivityEditModal',{activity:activityObject, name:leadDetail.name})
    }

    const followCheckBoxHandler = async (value) =>{
        setFollowChecked(value);
        setShowLoader(true)
        refFollow.current.close()
        if(value==="SOMEDAY"){
            updateFollowUp({
                type:"SOMEDAY",
                description:null,
                timestamp:null
            })
        }else if(value==="TODAY"){
            updateFollowUp({
                type:"TODAY",
                description:null,
                timestamp:new Date()
            })
        }else if(value==="TOMORROW"){
            updateFollowUp({
                type:"TOMORROW",
                description:null,
                timestamp:new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            })
        }else if(value==="CUSTOM"){
            showDatepicker()
        }else if(value==="NEVER"){
            updateFollowUp({
                type:"NEVER",
                description:null,
                timestamp:null
            })
        }
    }

    const updateFollowUp = async (obj) => {
        try {
            const response = await axios.post(`/follow-up/create/${leadDetail.id}`, obj, {
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
                }, 1000);
                loadActivityData();
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
    }

    const onChangeDateTimePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDateTime(Platform.OS === 'ios');
        setDate(currentDate);
        updateFollowUp({
            type:"CUSTOM",
            description:null,
            timestamp:currentDate
        })
    };

    const showMode = (currentMode) => {
        setShowDateTime(true);
        setModeDateTime(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    {showNavbarText ?
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>

                            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
                            <Text style={styles.backButtonText}>{leadDetail.name}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                            <MaterialIcons name="arrow-back" size={25} color="black" />
                        </TouchableOpacity>}
                    <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.backButtonText}>Options</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middleContainer}>
                    <ScrollView onScroll={handleScroll}>
                        <View style={styles.HeadingTextContainer}>
                            <Text style={styles.HeadingText}>{leadDetail.name}</Text>
                        </View>

                        <View style={styles.SocialButtonContainer}>
                            <TouchableOpacity style={styles.SocialButton} onPress={callHandler}>
                                <Ionicons name="call" size={25} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.SocialButton} onPress={smsHandler}>
                                <MaterialIcons name="message" size={25} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.SocialButton} onPress={emailHandler}>
                                <Ionicons name="ios-mail-sharp" size={25} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.SocialButton} onPress={whatsappHandler}>
                                <Ionicons name="logo-whatsapp" size={25} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.FollowGroupButtonContainer}>
                            <TouchableOpacity style={styles.FollowGroupButton} onPress={() =>refFollow.current.open()}>
                                <MaterialIcons name="schedule" size={45} color="white" />
                                <Text style={styles.FollowGroupText}>Schedule Follow Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.FollowGroupButton} onPress={() => groupBtnHandler()}>
                                <MaterialIcons name="group-add" size={45} color="white" />
                                <Text style={styles.FollowGroupText}>Tap to add groups</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailContainer}>
                            <Text style={styles.detailHeaderText}>LEAD DETAIL</Text>
                            <Text style={styles.detailText}>Facebook Lead via {leadDetail.leadSource}</Text>
                            <Text style={styles.detailText}>Campaign: {leadDetail.ad}</Text>
                            <Text style={styles.detailText}>Adset: {leadDetail.adset}</Text>
                            <Text style={styles.detailText}>Ad: {leadDetail.ad}</Text>
                            <Text style={styles.detailText}>Full Name: {leadDetail.name}</Text>
                            <Text style={styles.detailText}>Phone Number: {leadDetail.phone}</Text>
                            <Text style={styles.detailText}>Job Title: {leadDetail.job}</Text>
                            <Text style={styles.detailText}>Email: {leadDetail.email}</Text>
                            <Text style={styles.detailText}>{leadDetail.extraInfo}</Text>
                        </View>

                        <Pressable style={styles.noteContainer} onPress={() => refNote.current.open()} >
                            <Text style={styles.detailHeaderText}>NOTES</Text>
                            <Text style={styles.detailText}>{leadDetail.notes === null ? "Tap to add note." : leadDetail.notes}</Text>
                        </Pressable>

                        <View style={styles.timelineContainer}>
                            <Text style={styles.timelineHeaderText}>TIMELINE</Text>
                            <TouchableOpacity style={styles.timelineItemContainer} onPress={() => navigation.navigate('ActivityModal',{leadId:leadDetail.id, name:leadDetail.name})}>
                                <View style={styles.addActivityIcon}><Ionicons name="ios-add-sharp" size={25} color="#33b9ff" /></View>
                                <Text style={styles.addActivityText}>Add Activity</Text>
                            </TouchableOpacity>
                            {activityData.map(item => (

                                <View key={item.id}>
                                    <View style={styles.timeLine}></View>
                                    <TouchableOpacity style={styles.timelineItemOtherContainer} onPress={() => ActivityOptionHandler(item)}>
                                        <View style={styles.timelineIcon}>
                                            {item.type === "Phone Call" ? <Ionicons name="call" size={20} color="white" /> : null}
                                            {item.type === "Whatsapp" ? <Ionicons name="logo-whatsapp" size={20} color="white" /> : null}
                                            {item.type === "Message" ? <MaterialIcons name="message" size={20} color="white" /> : null}
                                            {item.type === "Email" ? <Ionicons name="ios-mail-sharp" size={20} color="white" /> : null}
                                        </View>
                                        <View style={styles.timelineDetailText}>
                                            <View style={styles.timelineDateContainer}>
                                                <Text style={styles.timelineDate}>{new Date(item.created_at).getDate()} {getMonthInWord(new Date(item.created_at).getMonth() + 1)}</Text>
                                                <Text style={styles.timelineTime}>{formatAMPM(new Date(item.created_at))}</Text>
                                            </View>
                                            <Text style={styles.timelineText}>{item.type}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View>
                                <View style={styles.timeLine}></View>
                                <View style={styles.timelineItemOtherContainer}>
                                    <View style={styles.timelineIcon}><Ionicons name="ios-person-add" size={20} color="white" /></View>
                                    <View style={styles.timelineDetailText}>
                                        <View style={styles.timelineDateContainer}>
                                            <Text style={styles.timelineDate}>{new Date(leadDetail.created_at).getDate()} {getMonthInWord(new Date(leadDetail.created_at).getMonth() + 1)}</Text>
                                            <Text style={styles.timelineTime}>{formatAMPM(new Date(leadDetail.created_at))}</Text>
                                        </View>
                                        <Text style={styles.timelineText}>Client added to Leadqart</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>QUICK RESPONSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomMaskPopUp refRBSheet={refRBSheet} height={260}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options</Text>
                    </View>
                    <TouchableOpacity onPress={() => groupBtnHandler()} style={styles.optionsContainer}>
                        <MaterialIcons name="group-add" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Add to Groups</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <FontAwesome5 name="user-check" size={18} color="#33b9ff" />
                        <Text style={styles.optionsText}>Mark as New Lead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Lead</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
            <BottomMaskPopUp refRBSheet={refCallLog} height={300}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.logOptionsMainContainer}>
                        <View style={styles.logIconContainer}>
                            <View style={styles.SocialButton}>
                                {activityLogType === "Phone Call" ? <Ionicons name="call" size={25} color="white" /> : null}
                                {activityLogType === "Message" ? <MaterialIcons name="message" size={25} color="white" /> : null}
                                {activityLogType === "Email" ? <Ionicons name="ios-mail-sharp" size={25} color="white" /> : null}
                                {activityLogType === "Whatsapp" ? <Ionicons name="logo-whatsapp" size={25} color="white" /> : null}
                            </View>
                            <Text style={styles.logText}>{activityLogType}</Text>
                        </View>
                        <View style={styles.logBtnContainer}>
                            <TouchableOpacity style={styles.LogApproveBtn} onPress={() => saveActivityRefHandler()}>
                                <Text style={styles.logBtnText}>Add {activityLogType} To Log Activity</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.LogDiscardBtn} onPress={() => refCallLog.current.close()}>
                                <Text style={styles.logBtnText}>Discard</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomMaskPopUp>
            <BottomMaskPopUp refRBSheet={refNote} height={370}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Notes</Text>
                    </View>
                    <View style={[styles.NoteOptionBackground]}>
                        <View style={styles.logIconContainer}>
                            {noteTextError ? <Text style={{ color: 'red', paddingVertical: 10 }}>{noteTextErrorValue}</Text> : null}
                            <TextInput placeholder="Enter notes..." style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={noteTextError ? "red" : "#ccc"} onChangeText={text => noteTextHandler(text)} defaultValue={noteText} />
                        </View>
                        <View style={styles.logBtnContainer}>
                            <TouchableOpacity style={styles.LogApproveBtn} onPress={() => saveNotesRefHandler()}>
                                <Text style={styles.logBtnText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.LogDiscardBtn} onPress={() => refNote.current.close()}>
                                <Text style={styles.logBtnText}>Discard</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomMaskPopUp>
            <BottomMaskPopUp refRBSheet={refGroup} height={550}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Manage Groups</Text>
                    </View>
                    {loading ? <GroupSelectionPlaceholder /> :
                        <View style={[styles.groupOptionScrollBackground]}>
                            <ScrollView style={[styles.groupOptionScroll]}>
                                {groupData.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.checkBoxContainer} onPress={() => checkBoxHandler(item.id)} key={index}>
                                            <Text style={styles.checkBoxText}>{item.name}</Text>
                                            {item.isChecked == undefined || item.isChecked == false ?
                                                <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> :
                                                <Fontisto name="checkbox-active" size={18} color="#33b9ff" />
                                            }
                                        </TouchableOpacity>
                                    )
                                })}


                            </ScrollView>
                            <View style={styles.logBtnContainer}>
                                <TouchableOpacity style={styles.LogApproveBtn} onPress={() => saveGroupRefHandler()}>
                                    <Text style={styles.logBtnText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.LogDiscardBtn} onPress={() => refGroup.current.close()}>
                                    <Text style={styles.logBtnText}>Discard</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                </View>
            </BottomMaskPopUp>
            <BottomMaskPopUp refRBSheet={refActivity} height={200}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options: {activityObject.type} on {new Date(activityObject.created_at).getDate()} {getMonthInWord(new Date(activityObject.created_at).getMonth() + 1)} {new Date(activityObject.created_at).getFullYear()}</Text>
                    </View>
                    <TouchableOpacity onPress={() => ActivityEditHandler()} style={styles.optionsContainer}>
                        <FontAwesome5 name="user-check" size={18} color="#33b9ff" />
                        <Text style={styles.optionsText}>View or Edit Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ActivityDeleteHandler()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Activity</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
            <BottomMaskPopUp refRBSheet={refFollow} height={390}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Schedule Follow Up</Text>
                    </View>
                    <View style={[styles.groupOptionScrollBackground]}>
                        <ScrollView style={[styles.groupOptionScroll]}>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => followCheckBoxHandler("TODAY")} >
                                <Text style={styles.checkBoxText}>Today</Text>
                                {followChecked === "TODAY" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => followCheckBoxHandler("TOMORROW")} >
                                <Text style={styles.checkBoxText}>Tomorrow</Text>
                                {followChecked === "TOMORROW" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => followCheckBoxHandler("CUSTOM")} >
                                <Text style={styles.checkBoxText}>Select custom date & time</Text>
                                {followChecked === "CUSTOM" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => followCheckBoxHandler("SOMEDAY")} >
                                <Text style={styles.checkBoxText}>Someday</Text>
                                {followChecked === "SOMEDAY" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkBoxContainer} onPress={() => followCheckBoxHandler("NEVER")} >
                                <Text style={styles.checkBoxText}>Never</Text>
                                {followChecked === "NEVER" ?
                                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> :
                                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" /> 
                                }
                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                </View>
            </BottomMaskPopUp>

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

            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />

        </SafeAreaView>
    )
}

export default FacebookLeadDetailScreen
