import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    accountContainer: {
        marginTop: 10,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: Dimensions.get('window').width,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    leftContainer: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    leftIconContainer: {
        marginRight: 15,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#33b9ff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    nameHeading: {
        fontWeight: 'bold',
        fontSize: 18
    },

    emailText: {
        color: 'gray'
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

    PreferenceMainContainer:{
        marginTop: 30,
    },

    HeaderContainer:{
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: Dimensions.get('window').width,
        marginBottom:5
    },

    HeaderText:{
        color: 'gray'
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

    logoutContainer:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: Dimensions.get('window').width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:2
    },

    settingText:{
        fontSize:15
    },

    logoutText:{
        fontSize:15,
        color:'#ffa200',
        fontWeight: 'bold',
    },

})


export default styles;