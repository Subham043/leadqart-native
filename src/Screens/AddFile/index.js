import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import styles from './styles'

const AddFileScreen = () => {

    const _pickDocument = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({});
            console.log(file);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ScrollView style={styles.topContainer}>

                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>File Title</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter title" style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Select PDF</Text>
                        <Pressable onPress={() => _pickDocument()} style={styles.inputTextAreaContainer}>
                            <Text style={styles.inputText}>Select a PDF file</Text>
                            <Text style={styles.uploadText}>UPLOAD</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={() => console.log("hello")}>
                        <Text style={styles.textStyle}>SAVE FILE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddFileScreen
