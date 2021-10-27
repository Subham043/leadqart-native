import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
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
