import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

    leftContainer: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },


    rightContainer: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    rightTextContainer:{
        justifyContent: 'center'
    },

    rightInnerIconContainer:{
        marginLeft: 10,
        justifyContent: 'center'
    },

    rightText:{
        color:'#ffa200',
        fontWeight:'bold',
    },

    PreferenceContainer:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:2
    },

    settingText:{
        fontSize:15
    },

})


export default styles;