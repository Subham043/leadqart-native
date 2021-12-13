import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    layerContainer: {
        width: '100%',
        height: 95,
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
    topContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    backButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    backButtonText: {
        fontWeight: 'bold',
        color:'white',
        marginLeft:20
    },

    bottomContainer:{
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    searchInputContainer:{
        width: '100%',
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

    optionsMainContainer:{
        width:'100%',
        height:'100%',
    },

    optionsHeaderContainer:{
        width:'100%',
        height:40,
        paddingHorizontal:10,
        paddingVertical:5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    optionsHeaderText:{
        fontSize:15
    },

    optionsContainer:{
        width:'100%',
        height:60,
        backgroundColor:'white',
        marginBottom:2,
        paddingHorizontal:10,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    optionsText:{
        color:'#33b9ff',
        fontWeight:'bold',
        marginLeft:15,
        fontSize:15
    },

    

})


export default styles;