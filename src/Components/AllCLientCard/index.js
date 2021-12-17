import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles'

const AllClientCard = ({ navigation, item }) => {


    const getInitials = (value) => {
        return value.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }

    return (
            <TouchableOpacity onPress={() => navigation.navigate('FacebookLeadDetail',{
                leadId:item.id, 
                leadItem:item
            })} style={styles.cardContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarOuter}>
                            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{item.name}</Text>
                            {item.newLead===1 ?
                            <SimpleLineIcons name="badge" size={30} color="#ffa200" /> : null }
                        </View>
                        <Text style={styles.description} numberOfLines={2}>Facebook Lead via {(item.facebookPage)!=null?item.facebookPage:item.leadSource}, Campaign: {(item.adset)!=null?item.adset:item.ad}, Ad-set</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.bottomTextContainer}>
                            <EvilIcons name="sc-facebook" size={20} color="#fff" />
                            <Text style={styles.bottomText}>{(item.facebookPage)!=null?item.facebookPage:item.leadSource}</Text>
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
