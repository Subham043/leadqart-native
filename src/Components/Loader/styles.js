import {StyleSheet, Dimensions } from 'react-native';
import { StatusBar as SBar } from 'react-native'

const styles = StyleSheet.create({
    loader:{
        flex:1,
        width:'100%',
        marginTop:SBar.currentHeight,
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:0,
        zIndex:100000,
        justifyContent: 'center',
    },
    
})


export default styles;
