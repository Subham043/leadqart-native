import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    searchContainer:{
        backgroundColor:'#33b9ff',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        height:70,
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'row',
    },
    searchInputContainer:{
        backgroundColor:'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'80%',
        height:'100%',
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'row',
        borderRadius:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    searchInput:{
        width:'85%',
        color: 'gray'
    },
    searchBtn:{
        width:'15%',
        height:'100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    filterContainer:{
        backgroundColor:'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'15%',
        height:'100%',
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'row',
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})


export default styles;