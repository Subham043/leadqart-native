import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    messageMainContainer:{
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
        width:'90%',
        height:'100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    pdfContainer:{
        width:'15%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },


    textContainer:{
        width:'85%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    title:{
        fontWeight: 'bold',
        marginBottom:5
    },

    rightMainContainer:{
        width:'10%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

})


export default styles;