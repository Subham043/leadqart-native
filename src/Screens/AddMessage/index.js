import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import styles from './styles'

const AddMessageScreen = () => {

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ScrollView style={styles.topContainer}>

                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Message Title</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter message title" style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Message Template</Text>
                        <View style={styles.inputTextAreaContainer}>
                            <TextInput placeholder="Enter message template" style={styles.textArea} multiline={true} numberOfLines={4} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={() => console.log("hello")}>
                        <Text style={styles.textStyle}>CREATE MESSAGE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddMessageScreen
