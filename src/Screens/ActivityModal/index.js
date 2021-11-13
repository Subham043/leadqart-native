import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const ActivityModal = ({ navigation }) => {

    const [title, setTitle] = useState("")
    const [titleErrorValue, setTitleErrorValue] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [message, setMessage] = useState("")
    const [messageErrorValue, setMessageErrorValue] = useState("")
    const [messageError, setMessageError] = useState(false)

    const titleHandler = () => { }
    const messageHandler = () => { }

    return (
        <SafeAreaView style={{ ...styles.mainContainer }}>
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>

                        <MaterialIcons name="arrow-back-ios" size={25} color="white" />
                        <Text style={styles.backButtonText}>Add Activity With Subham Saha</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <ScrollView style={styles.topModalContainer}>

                        <View style={styles.inputGroupContainer}>
                            <Text style={styles.label}>Activity Type</Text>
                            {titleError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{titleErrorValue}</Text> : null}
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="Enter message title" style={styles.input} placeholderTextColor={titleError ? "red" : "#ccc"} onChangeText={text => titleHandler(text)} defaultValue={title} />
                            </View>
                        </View>
                        <View style={styles.inputGroupContainer}>
                            <Text style={styles.label}>Activity Timestamp</Text>
                            {messageError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{messageErrorValue}</Text> : null}
                            <Pressable style={styles.inputTextAreaContainer}>
                                <View style={styles.dateTimePickerContainer}>
                                    <AntDesign name="clockcircle" size={25} color="#ffa200" />
                                    <Text style={styles.inputText}>time</Text>
                                </View>
                                <Text style={styles.uploadText}>UPLOAD</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.saveContainer}>
                            <Text style={styles.textStyle}>CREATE MESSAGE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ActivityModal
