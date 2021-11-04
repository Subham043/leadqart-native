import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import PageCard from '../../Components/PageCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import PageCardPlaceholder from '../../Components/PageCardPlaceholder'

const PagesScreen = ({ navigation }) => {


    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [array, setArray] = React.useState([]);

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setArray([]);
        setLoadng(true)
        wait(2000).then(() => { setRefreshing(false); pageLoader() });
    }, []);

    useEffect(() => {
        pageLoader();
    }, [])

    const pageLoader = () => {
        wait(2000).then(() => {
            setLoadng(false)
            setArray([
                {name:"Cjn Properties", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
                {name:"Follow Up - Vaibhav", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
                {name:"Provident Park Square", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
                {name:"Welcome Message", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
            ]);
        });
    }

    const actions = [
        {
          text: "Add Page",
          icon: require("../../../assets/images/page.png"),
          name: "add_page",
          position: 1,
          color:"#33b9ff",
        },
      ];

    return (
        <View style={styles.container}>

        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {loading ? <PageCardPlaceholder /> : null}
            {array.map((item, index) => {
                return (<PageCard name={item.name} description={item.description} key={index} />);
            })}
        </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name==="add_page" ?  navigation.navigate('AddPage') : null;
                }}
                color="#ffa200"
            />

        </View>
    )
}

export default PagesScreen
