import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import styles from './styles'

const AddPageScreen = () => {

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
                        <Text style={styles.label}>Page Title</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter page title" style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Page Description</Text>
                        <View style={styles.inputTextAreaContainer}>
                            <TextInput placeholder="Enter page description" style={styles.textArea} multiline={true} numberOfLines={4} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Image</Text>
                        <Pressable onPress={() => _pickDocument()} style={styles.inputFileContainer}>
                            <Text style={styles.inputText}>Select an image file</Text>
                            <Text style={styles.uploadText}>UPLOAD</Text>
                        </Pressable>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Youtube Video ID</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter youtube video id" style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Address</Text>
                        <View style={styles.inputTextAreaContainerAddress}>
                            <TextInput placeholder="Enter address" style={styles.textArea} multiline={true} numberOfLines={4} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={() => console.log("hello")}>
                        <Text style={styles.textStyle}>CREATE PAGE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddPageScreen
