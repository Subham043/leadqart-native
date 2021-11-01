import React, {useState} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard, } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import { setGroupModal, selectGroupModal } from "../../../app/feature/groupModalSlice"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../ColorPicker'

const GroupModal = () => {
  const dispatch = useDispatch();
  const loaderModal = useSelector(selectGroupModal)
  const [colorPicker, setColorPicker] = useState("#C0392B")


  return (
    <TouchableWithoutFeedback style={styles.centeredView} onPress={Keyboard.dismiss}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={loaderModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          dispatch(setGroupModal(!loaderModal));
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topContainer}>

              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Create Group</Text>
                <Pressable
                  style={styles.crossBtn}
                  onPress={() => dispatch(setGroupModal(!loaderModal))}>
                  <FontAwesome name="close" size={25} color="#000" />
                </Pressable>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Group Name</Text>
                <TextInput placeholder="Enter group name" style={styles.input} />
              </View>
              <View style={styles.inputColorContainer}>
                <Text style={styles.label}>Group Color</Text>
                <ColorPalette
                  scaleToWindow={false}
                  onChange={color => setColorPicker(color)}
                  value={colorPicker}
                  colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', ]}
                  title={""}
                  icon={
                    <AntDesign name={'check'} size={25} color={'#fff'} />
                  }
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <Pressable
                style={styles.saveContainer}
                onPress={() => dispatch(setGroupModal(!loaderModal))}>
                <Text style={styles.textStyle}>CREATE GROUP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#eee',
    width: '100%',
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom:15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headerContainer:{
    backgroundColor: '#fff',
    borderBottomColor:"gray",
    borderBottomWidth:0.5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:60,
    paddingHorizontal:10,
    paddingVertical:15,
  },

  crossBtn:{
    marginRight:10
  },

  headerText:{
    fontSize:20,
    fontWeight:'bold'
  },

  inputContainer:{
    backgroundColor: '#fff',
    borderBottomColor:"gray",
    borderBottomWidth:0.5,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    width:Dimensions.get('window').width,
    height:70,
    paddingHorizontal:10,
    paddingVertical:15,
    marginTop:10,
  },

  label:{
    marginRight:10,
    fontWeight:'bold',
    width:'25%'
  },

  input:{
    width:'70%',
    height:'100%',
  },

  inputColorContainer:{
    backgroundColor: '#fff',
    borderBottomColor:"gray",
    borderBottomWidth:0.5,
    width:Dimensions.get('window').width,
    paddingHorizontal:10,
    paddingVertical:15,
    marginTop:10,
  },

  bottomContainer:{
    width:Dimensions.get('window').width,
    paddingHorizontal:10,
  },

  saveContainer:{
    backgroundColor: '#33b9ff',
    width:'100%',
    height:50,
    borderRadius:25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStyle:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:20,
  }
});

export default GroupModal;