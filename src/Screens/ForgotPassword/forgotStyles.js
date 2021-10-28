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
        transform: [
            { rotate: '180deg' },
          ],
          marginTop:Dimensions.get('window').height-705
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
})


export default styles;
