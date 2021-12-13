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
        height: 130,
    },

    leftContainer: {
        width: '100%',
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    rightContainer: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    leftIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#33b9ff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    leftTextContainer:{
        width: '80%',
    },

    nameHeading: {
        fontWeight: 'bold',
        fontSize: 18
    },

    configureText:{
        fontSize:18,
        color:'#ffa200',
        fontWeight: 'bold',
    },

    emailText: {
        color: 'gray'
    },

    rightTextContainer:{
        justifyContent: 'center'
    },

    rightInnerIconContainer:{
        marginLeft: 10,
        justifyContent: 'center'
    },
})

export default styles;