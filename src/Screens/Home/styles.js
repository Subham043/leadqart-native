import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage:{
        width:Dimensions.get('window').width,
        height:200,
        resizeMode: "cover",
    },
    innerContainer:{
        paddingHorizontal:10,
    },
    logoImage:{
        resizeMode: "contain",
        aspectRatio:7/2,
        marginTop:25
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:35,
    },
    heading:{
        color:'#ffa200',
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:35
    },
    text:{
        color:'#818181',
        fontSize:18,
        textAlign:'center',
        marginTop:15
    },
    btnSize:{
        paddingHorizontal:50,
        paddingVertical:15,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn1:{
        backgroundColor:'#33b9ff',
        paddingHorizontal:50,
        paddingVertical:15,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    btn2:{
        backgroundColor:'#ffa200',
        paddingHorizontal:50,
        paddingVertical:15,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    backgroundImage2:{
        width:Dimensions.get('window').width,
        height:200,
        resizeMode: "cover",
        position:'absolute',
        top:Dimensions.get('window').height-170,
        transform: [
            { rotate: '180deg' },
          ]
    }
})


export default styles;
