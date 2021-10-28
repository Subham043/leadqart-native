import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    signInBtn:{
        backgroundColor:'#33b9ff',
        paddingHorizontal:50,
        paddingVertical:15,
        borderRadius:25,
        textAlign:'center',
        color: 'white',
        fontWeight: 'bold',
        marginBottom:25
    },
    signUpBtn:{
        textAlign:'center',
        color:'#BDBDBD',
    },
    signUpBtnTxt:{
        color:'#ffa200',
        fontWeight: 'bold',
    },

    NotificationContainer:{
        width:'100%',
        minHeight:100,
        backgroundColor:'transparent',
        // position:'absolute',
        // top:-5,
        zIndex:100000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NotificationInner:{
        width:'95%',
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:2,
        backgroundColor:'#d4edda',
        borderColor:'#d4edda',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    NotificationText:{
        color:'green',
        fontSize:14,
        fontWeight:'bold',
        textAlign: 'center'
    },
    NotificationIcon:{
        marginBottom:10
    },
    signUpBtnNotification:{
        textAlign:'center',
        color:'#000',
        marginTop:10,
    },
})


export default styles;
