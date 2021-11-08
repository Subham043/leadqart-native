import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';

const ViewMessageScreen = ({ route,navigation }) => {

    const refRBSheet = useRef();
    const {name,description} = route.params;


    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>
                        <Text style={styles.backButtonText}>{name}</Text>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.backButtonText}>Options</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middleContainer}>
                    <ScrollView>

                        <View style={styles.detailContainer}>
                            <Text style={styles.detailHeaderText}>MESSAGE TEMPLATE</Text>
                            <Text style={styles.detailText}>{description}</Text>
                        </View>

                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>SEND TO CLIENT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomMaskPopUp refRBSheet={refRBSheet} height={200}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options</Text>
                    </View>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <AntDesign name="edit" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Edit Message Template</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Message Template</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>

        </SafeAreaView>
    )
}

export default ViewMessageScreen
