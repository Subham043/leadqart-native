import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage:{
        width:Dimensions.get('window').width,
        height:100,
        resizeMode: "cover",
    },
    backgroundImage2:{
        width:Dimensions.get('window').width,
        height:100,
        resizeMode: "cover",
        marginTop:30,
        transform: [
            { rotate: '180deg' },
          ],
          marginTop:Dimensions.get('window').height-595
    },
    innerContainer:{
        width:'100%',
        alignItems: 'center',
        padding:10,
    },
    logoImage:{
        width:200,
        height:200,
        resizeMode: "contain"
    },
    formContainer:{
        flex:1,
        width:'100%',
        padding:10
    },
    label:{
        textAlign:'left',
        fontWeight: 'bold',
        fontSize:18,
        marginBottom:10
    },
    input:{
        width:'100%',
        height:50,
        textAlign:'left',
        borderColor: '#ccc',
        borderWidth: 1,
        padding:10,
        borderRadius:3,
        marginBottom:25,
        color: '#000'
    },
    forgotBtn:{
        textAlign:'right',
        fontWeight: 'bold',
        fontSize:18,
        marginBottom:25
    },
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
    error:{
        textAlign:'left',
        fontSize:18,
        color:'red',
        marginTop:-20,
        marginBottom:25
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
