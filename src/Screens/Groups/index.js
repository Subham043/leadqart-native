import React, { useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import GroupCard from '../../Components/GroupCard';
import GroupModal from '../../Components/GroupModal';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux"
import { setGroupModal, selectGroupModal } from "../../../app/feature/groupModalSlice"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GroupsScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const loaderModal = useSelector(selectGroupModal)

    const [refreshing, setRefreshing] = React.useState(false);

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const actions = [
        {
          text: "Add Group",
          icon: require("../../../assets/images/floaticon1.png"),
          name: "add_group",
          position: 1,
          color:"#33b9ff",
        },
      ];

    return (
        <View style={styles.container}>

        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <GroupCard name="NEW LEADS" number="222" color="#33b9ff" />
            <GroupCard name="AS - Interested/Oppurtunities" number="25" color="#A59903" />
            <GroupCard name="Dead Leads" number="17" color="red" />
            <GroupCard name="VG - Deals" number="222" color="green" />
        </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name==="add_group" ? navigation.navigate('AddGroup') : null;
                }}
                color="#ffa200"
            />

            <GroupModal />
        </View>
    )
}

export default GroupsScreen
