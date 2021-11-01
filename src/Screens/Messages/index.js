import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import MessageCard from '../../Components/MessageCard';
import GroupModal from '../../Components/GroupModal';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux"
import { setGroupModal, selectGroupModal } from "../../../app/feature/groupModalSlice"

const MessageScreen = () => {

    const dispatch = useDispatch();
    const loaderModal = useSelector(selectGroupModal)
    const actions = [
        {
          text: "Add Message",
          icon: require("../../../assets/images/floaticon1.png"),
          name: "add_message",
          position: 1,
          color:"#33b9ff",
        },
      ];

    return (
        <View style={styles.container}>

        <ScrollView style={styles.ScrollContainer}>
            <MessageCard name="Cjn Properties" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
            <MessageCard name="Follow Up - Vaibhav" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
            <MessageCard name="Provident Park Square" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
            <MessageCard name="Welcome Message" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
        </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name==="add_message" ? dispatch(setGroupModal(!loaderModal)) : null;
                }}
                color="#ffa200"
            />

            <GroupModal />
        </View>
    )
}

export default MessageScreen
