import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    toasterOuter:{
        width:'100%',
        minHeight:100,
        backgroundColor:'transparent',
        position:'absolute',
        top:-5,
        zIndex:100000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toasterInner:{
        width:'95%',
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:2,
        backgroundColor:'#f8d7da',
        borderColor:'#f8d7da',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text:{
        color:'red',
        fontSize:14,
        fontWeight:'bold',
        textAlign: 'center'
    }
    
})


export default styles;
