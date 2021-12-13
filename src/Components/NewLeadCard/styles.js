import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    groupMainContainer:{
        paddingHorizontal:10,
        paddingVertical:5,
        width:'100%',
        height:80,
        borderBottomWidth:0.5,
        borderBottomColor:"gray", 
        backgroundColor:"white",
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    leftMainContainer:{
        width:'70%',
        height:'100%',
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    avatarMainContainer:{
        width:60,
        height:60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight:10
    },

    avatarIcon:{
        width:60,
        height:60,
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText:{
        color:'#fff',
        fontWeight: 'bold',
        letterSpacing:2,
        fontSize:18
    },

    groupNameText:{
        fontWeight: 'bold',
    },

    rightMainContainer:{
        width:'30%',
        height:'100%',
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    groupLeadText:{
        fontWeight: 'bold',
    },
})


export default styles;