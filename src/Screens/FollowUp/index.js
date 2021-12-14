import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'
import styles from './styles'
import FollowCard from '../../Components/FollowCard'
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"

const FollowUpScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const [getSomedayCount, setGetSomedayCount] = useState("")
    const [getTodayCount, setGetTodayCount] = useState("")
    const [getOverdueCount, setGetOverdueCount] = useState("")
    const [getUpcomingCount, setGetUpcomingCount] = useState("")

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

     useEffect(() => {
        getCount('get-someday-count');
        getCount('get-today-count');
        getCount('get-overdue-count');
        getCount('get-upcoming-count');
     }, [navigation])

     const getCount = async (type) => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/follow-up/${type}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            // console.log(resp?.data);
            if (resp?.data?.message) {
                if(type=="get-someday-count"){
                    setGetSomedayCount(resp?.data?.count)
                }
                if(type=="get-today-count"){
                    setGetTodayCount(resp?.data?.count)
                }
                if(type=="get-overdue-count"){
                    setGetOverdueCount(resp?.data?.count)
                }
                if(type=="get-upcoming-count"){
                    setGetUpcomingCount(resp?.data?.count)
                }
                
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

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <FollowCard name="OVERDUE" imageUri={require("../../../assets/images/overdue.png")} number={getOverdueCount} navigation={navigation} loadData="get-overdue" />
            <FollowCard name="UPCOMING" imageUri={require("../../../assets/images/upcoming.png")} number={getUpcomingCount} navigation={navigation} loadData="get-upcoming"  />
            <FollowCard name="SOMEDAY" imageUri={require("../../../assets/images/someday.png")} number={getSomedayCount} navigation={navigation} loadData="get-someday"  />
            <FollowCard name="TODAY" imageUri={require("../../../assets/images/today.png")} number={getTodayCount} navigation={navigation} loadData="get-today"  />
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default FollowUpScreen