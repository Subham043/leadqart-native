import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    messageMainContainer:{
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
        width:'25%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },


    pdfImage:{
        resizeMode: 'stretch',
        width:'100%',
        height:'100%',
    },


    textContainer:{
        paddingLeft:10,
        width:'75%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    title:{
        fontWeight: 'bold',
        marginBottom:5
    },

    description:{
        color:'gray'
    },

    rightMainContainer:{
        width:'10%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    htmlview:{
        height:20
    }

})


export default styles;