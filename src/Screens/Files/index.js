import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import FileCard from '../../Components/FileCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import FileCardPlaceholder from '../../Components/FileCardPlaceholder'

const FilesScreen = ({ navigation }) => {

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
                {name:"Cjn Properties"},
                {name:"Follow Up - Vaibhav"},
                {name:"Provident Park Square"},
                {name:"Welcome Message"},
            ]);
        });
    }

    const actions = [
        {
          text: "Add File",
          icon: require("../../../assets/images/file.png"),
          name: "add_file",
          position: 1,
          color:"#33b9ff",
        },
      ];

    return (
        <View style={styles.container}>

        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {loading ? <FileCardPlaceholder /> : null}
            {array.map((item, index) => {
                return (<FileCard name={item.name} key={index} />);
            })}
        </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name==="add_file" ?  navigation.navigate('AddFile') : null;
                }}
                color="#ffa200"
            />

        </View>
    )
}

export default FilesScreen