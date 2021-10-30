import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles'

const AllClientCard = () => {
    return (
            <TouchableOpacity style={styles.cardContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarOuter}>
                            <Text style={styles.avatarText}>MT</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Michael Thomas</Text>
                            <SimpleLineIcons name="badge" size={30} color="#ffa200" />
                        </View>
                        <Text style={styles.description} numberOfLines={2}>Instagram Lead via PropsBee, Campaign: DRS Campaign-Leads, Ad-set</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.bottomTextContainer}>
                            <EvilIcons name="sc-facebook" size={20} color="#fff" />
                            <Text style={styles.bottomText}>PropsBee</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.rightBottomTextContainer}>
                        <Text style={styles.rightBottomText}>Saritha Splendour Lead</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
    )
}

export default AllClientCard
