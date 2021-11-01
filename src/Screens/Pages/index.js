import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import PageCard from '../../Components/PageCard';
import GroupModal from '../../Components/GroupModal';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux"
import { setGroupModal, selectGroupModal } from "../../../app/feature/groupModalSlice"

const PagesScreen = () => {

    const dispatch = useDispatch();
    const loaderModal = useSelector(selectGroupModal)
    const actions = [
        {
          text: "Add Page",
          icon: require("../../../assets/images/floaticon1.png"),
          name: "add_page",
          position: 1,
          color:"#33b9ff",
        },
      ];

    return (
        <View style={styles.container}>

        <ScrollView style={styles.ScrollContainer}>
            <PageCard name="Cjn Properties" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
            <PageCard name="Follow Up - Vaibhav" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
            <PageCard name="Provident Park Square" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
            <PageCard name="Welcome Message" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
        </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name==="add_page" ? dispatch(setGroupModal(!loaderModal)) : null;
                }}
                color="#ffa200"
            />

            <GroupModal />
        </View>
    )
}

export default PagesScreen
