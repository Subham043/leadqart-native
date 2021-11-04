import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    layerContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor:'#33b9ff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    bottomContainer:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    backButtonContainer: {
        width: '10%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    searchInputContainer:{
        width: '90%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'white',
        flexDirection:'row',
        borderRadius:25,
        paddingHorizontal:15,
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

    ScrollContainer:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:15,
        marginBottom:4,
    },

    

})


export default styles;