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
          ]
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
    error:{
        textAlign:'left',
        fontSize:18,
        color:'red',
        marginTop:-20,
        marginBottom:25
    },
    input:{
        width:'100%',
        height:50,
        textAlign:'left',
        borderColor: '#ccc',
        color: 'black',
        borderWidth: 1,
        padding:10,
        borderRadius:3,
        marginBottom:25
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
    loader:{
        width:'100%',
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:0,
        zIndex:100000,
        justifyContent: 'center',
    },
    
})


export default styles;
