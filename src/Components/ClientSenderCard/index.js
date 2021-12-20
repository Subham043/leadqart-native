import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';

const ClientSenderCard = ({ navigation, item, type, typeId }) => {


    const getInitials = (value) => {
        return value.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }

    const sendClientHandler = () => {
        if(type==="content-message"){
            navigation.navigate('SendMessage',{
                messageId:typeId, 
                itemId:item.id
            })
        }else if(type==="content-file"){
            navigation.navigate('SendFile',{
                fileId:typeId, 
                itemId:item.id
            })
        }else if(type==="content-page"){
            navigation.navigate('SendPage',{
                pageId:typeId, 
                itemId:item.id
            })
        }
    }

    return (
            <TouchableOpacity onPress={() => sendClientHandler()} style={styles.cardContainer}>
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
                        <Text style={styles.description} numberOfLines={1}>Facebook Lead via {(item.facebookPage)!=null?item.facebookPage:item.leadSource}, Campaign: {(item.adset)!=null?item.adset:item.ad}, Ad-set</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.leftContainer}>
                    {(item.facebookPage) == null || item.facebookPage==="" ?
                        <View style={{ ...styles.bottomTextContainer, backgroundColor: '#953553', }}>
                            <AntDesign name="star" size={20} color="#fff" />
                            <Text numberOfLines={1} style={styles.bottomText}>General Lead</Text>
                        </View> :
                        <View style={{ ...styles.bottomTextContainer, backgroundColor: '#4267B2', }}>
                            <EvilIcons name="sc-facebook" size={20} color="#fff" />
                            <Text numberOfLines={1} style={styles.bottomText}>{item.facebookPage}</Text>
                        </View>
                    }
                    </View>
                    <View style={styles.rightContainer}>
                    {item.newLead == 1 ? <View style={{ ...styles.rightBottomTextContainer, backgroundColor: '#ffa200', }}><Text style={styles.rightBottomText}>New Lead</Text></View> : null}
                    {item.newLead == 2 ? <View style={{ ...styles.rightBottomTextContainer, backgroundColor: '#0000FF', }}><Text style={styles.rightBottomText}>Cold</Text></View> : null}
                    {item.newLead == 3 ? <View style={{ ...styles.rightBottomTextContainer, backgroundColor: '#A020F0', }}><Text style={styles.rightBottomText}>Warm</Text></View> : null}
                    {item.newLead == 4 ? <View style={{ ...styles.rightBottomTextContainer, backgroundColor: '#FFD700', }}><Text style={styles.rightBottomText}>Hot</Text></View> : null}
                    {item.newLead == 5 ? <View style={{ ...styles.rightBottomTextContainer, backgroundColor: '#ff0000', }}><Text style={styles.rightBottomText}>Dead Lead</Text></View> : null}
                    </View>
                </View>
            </TouchableOpacity>
    )
}

export default ClientSenderCard
