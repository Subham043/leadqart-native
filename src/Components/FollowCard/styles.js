import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    messageMainContainer:{
        width:'100%',
        height:70,
        paddingHorizontal:10,
        paddingVertical:5,
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
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    pdfContainer:{
        width:'20%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },


    pdfImage:{
        resizeMode: 'stretch',
        width:'70%',
        height:'60%',
    },


    textContainer:{
        width:'75%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    title:{
        fontWeight: 'bold',
    },

    rightMainContainer:{
        width:'30%',
        height:'100%',
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

})


export default styles;