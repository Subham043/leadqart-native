import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: Dimensions.get('window').height,
    },
    modalView: {
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },

    topContainer: {
        width: Dimensions.get('window').width,
    },

    inputGroupContainer: {
        width: '100%',
    },

    inputContainer: {
        backgroundColor: '#fff',
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        alignItems: 'flex-start',
        width: '100%',
        height: 70,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    label: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontWeight: 'bold',
    },

    input: {
        width: '100%',
        height: '100%',
    },

    inputTextAreaContainer: {
        backgroundColor: '#fff',
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        minHeight: 350,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    textArea: {
        textAlignVertical: 'top',
        width: '100%',
        height: '100%',
    },

    inputTextAreaContainerAddress: {
        backgroundColor: '#fff',
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: 150,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    inputFileContainer: {
        backgroundColor: '#fff',
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 90,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    inputText: {
        color: 'gray',
        width: '70%',
    },

    uploadText: {
        color: '#ffa200',
        fontWeight: 'bold',
        textAlign: 'right',
        width: '30%',
    },

    bottomContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 10,
        paddingTop: 10,
    },

    saveContainer: {
        backgroundColor: '#33b9ff',
        width: '100%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },

    editor: {
        backgroundColor: "black",
        width:'100%'
      },
      rich: {
        minHeight: 300,
        width:'100%'
      },
      richBar: {
        height: 50,
        width:'100%',
        backgroundColor: "#F5FCFF",
      },

})


export default styles;