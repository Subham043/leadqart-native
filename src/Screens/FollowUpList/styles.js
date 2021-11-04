import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    layerContainer: {
        width: '100%',
        height: 50,
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
        marginRight:10
    },

    backButtonText: {
        fontWeight: 'bold',
        color:'white'
    },

    ScrollContainer:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:15,
        marginBottom:4,
    },

    

})


export default styles;