import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    cardContainer:{
        width:'100%',
        height:140,
        marginBottom:15,
        backgroundColor:'white',
        borderRadius:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    topContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        width:'100%',
        height:'70%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarContainer:{
        width:'30%',
        height:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    avatarOuter:{
        backgroundColor:'#33b9ff',
        borderRadius:37,
        width:74,
        height:74,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText:{
        color:'white',
        fontSize:30,
        fontWeight: 'bold',
        letterSpacing:2
    },
    infoContainer:{
        width:'70%',
        height:'100%',
    },
    titleContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText:{
        fontSize:18
    },
    description:{
        color:'gray',
    },
    bottomContainer:{
       
        width:'100%',
        height:'30%',
        borderTopWidth: 0.5,
        borderTopColor: 'gray',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer:{
        width:'40%',
        height:'100%',
        borderRightWidth: 0.5,
        borderRightColor: 'gray',
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems: 'center',
    },
    bottomTextContainer:{
        width:'90%',
        height:30,
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor:'#4267B2',
        borderRadius:50
    },
    bottomText:{
        color:'#fff'
    },
    rightContainer:{
        width:'60%',
        height:'100%',
        paddingHorizontal:10,
        paddingVertical:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBottomTextContainer:{
        width:'90%',
        height:30,
        backgroundColor:'#ffa200',
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBottomText:{
        color:'#fff'
    }
})


export default styles;