import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LeadSocialButton from '../../Components/LeadSocialButton';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';

const FacebookLeadDetailScreen = ({ navigation }) => {

    const refRBSheet = useRef();
    const [showNavbarText, setShowNavbarText] = useState(false)

    const handleScroll = (event) => {
        event.nativeEvent.contentOffset.y > 56 ? setShowNavbarText(true) : setShowNavbarText(false)
    }


    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    {showNavbarText ? 
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        
                        <MaterialIcons name="arrow-back-ios" size={25} color="black" />
                        <Text style={styles.backButtonText}>Michael Botsium</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="black" />
                    </TouchableOpacity> }
                    <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.backButtonText}>Options</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middleContainer}>
                    <ScrollView onScroll={handleScroll}>
                        <View style={styles.HeadingTextContainer}>
                            <Text style={styles.HeadingText}>Michael Botsium</Text>
                        </View>

                        <View style={styles.SocialButtonContainer}>
                            <LeadSocialButton>
                                <Ionicons name="call" size={25} color="white" />
                            </LeadSocialButton>
                            <LeadSocialButton>
                                <MaterialIcons name="message" size={25} color="white" />
                            </LeadSocialButton>
                            <LeadSocialButton>
                                <Ionicons name="ios-mail-sharp" size={25} color="white" />
                            </LeadSocialButton>
                            <LeadSocialButton>
                                <Ionicons name="logo-whatsapp" size={25} color="white" />
                            </LeadSocialButton>
                        </View>

                        <View style={styles.FollowGroupButtonContainer}>
                            <TouchableOpacity style={styles.FollowGroupButton}>
                                <MaterialIcons name="schedule" size={45} color="white" />
                                <Text style={styles.FollowGroupText}>Schedule Follow Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.FollowGroupButton}>
                                <MaterialIcons name="group-add" size={45} color="white" />
                                <Text style={styles.FollowGroupText}>Tap to add groups</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailContainer}>
                            <Text style={styles.detailHeaderText}>LEAD DETAIL</Text>
                            <Text style={styles.detailText}>Facebook Lead via PropsBee</Text>
                            <Text style={styles.detailText}>Campaign: DRS Campaign - Leads</Text>
                            <Text style={styles.detailText}>Adset: DRS Campaign -Leads</Text>
                            <Text style={styles.detailText}>Ad: DRS Campaign Leads</Text>
                            <Text style={styles.detailText}>Full Name: PREM mindri</Text>
                            <Text style={styles.detailText}>Phone Number: +919901762218</Text>
                            <Text style={styles.detailText}>Job Title: admin it</Text>
                            <Text style={styles.detailText}>Email: sharmilafeb7@gmail.com</Text>
                            <Text style={styles.detailText}>Are You Looking For 1, 2 And 3Bhk Apartments ?: Prem</Text>
                        </View>

                        <Pressable style={styles.noteContainer}>
                            <Text style={styles.detailHeaderText}>NOTES</Text>
                            <Text style={styles.detailText}>Tap to add note.</Text>
                        </Pressable>

                        <View style={styles.timelineContainer}>
                            <Text style={styles.timelineHeaderText}>TIMELINE</Text>
                            <TouchableOpacity style={styles.timelineItemContainer}>
                                <View style={styles.addActivityIcon}><Ionicons name="ios-add-sharp" size={25} color="#33b9ff" /></View>
                                <Text style={styles.addActivityText}>Add Activity</Text>
                            </TouchableOpacity>
                            <View>
                                <View style={styles.timeLine}></View>
                                <TouchableOpacity style={styles.timelineItemOtherContainer}>
                                    <View style={styles.timelineIcon}><Ionicons name="call" size={20} color="white" /></View>
                                    <View style={styles.timelineDetailText}>
                                        <View style={styles.timelineDateContainer}>
                                            <Text style={styles.timelineDate}>26 Oct</Text>
                                            <Text style={styles.timelineTime}>1:23pm</Text>
                                        </View>
                                        <Text style={styles.timelineText}>Phone Call</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View style={styles.timeLine}></View>
                                <TouchableOpacity style={styles.timelineItemOtherContainer}>
                                    <View style={styles.timelineIcon}><Ionicons name="logo-whatsapp" size={20} color="white" /></View>
                                    <View style={styles.timelineDetailText}>
                                        <View style={styles.timelineDateContainer}>
                                            <Text style={styles.timelineDate}>26 Oct</Text>
                                            <Text style={styles.timelineTime}>1:23pm</Text>
                                        </View>
                                        <Text style={styles.timelineText}>Whatsapp</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View style={styles.timeLine}></View>
                                <View style={styles.timelineItemOtherContainer}>
                                    <View style={styles.timelineIcon}><Ionicons name="ios-person-add" size={20} color="white" /></View>
                                    <View style={styles.timelineDetailText}>
                                        <View style={styles.timelineDateContainer}>
                                            <Text style={styles.timelineDate}>26 Oct</Text>
                                            <Text style={styles.timelineTime}>1:23pm</Text>
                                        </View>
                                        <Text style={styles.timelineText}>Client added to Leadqart</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>QUICK RESPONSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomMaskPopUp refRBSheet={refRBSheet} height={260}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options</Text>
                    </View>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <MaterialIcons name="group-add" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Add to Groups</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <FontAwesome5 name="user-check" size={18} color="#33b9ff" />
                        <Text style={styles.optionsText}>Mark as New Lead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Lead</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>

        </SafeAreaView>
    )
}

export default FacebookLeadDetailScreen
