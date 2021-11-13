import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: Dimensions.get('window').height
  },
  layerContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  topContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#33b9ff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  backButtonText: {
    fontWeight: 'bold',
    color: '#fff'
  },

  modalView: {
    backgroundColor: '#eee',
    width: '100%',
    height: Dimensions.get('window').height - 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },

  topModalContainer: {
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
    marginLeft: 10,
  },

  dateTimePickerContainer:{
    width: '70%',
    flexDirection:'row',
    alignItems:'center'
  },

  uploadText: {
    color: '#ffa200',
    fontWeight: 'bold',
    textAlign: 'right',
    width: '30%',
  },

  textArea: {
    textAlignVertical: 'top',
    width: '100%',
    height: '100%',
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
  }

})

export default styles