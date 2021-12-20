import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        height: Dimensions.get('window').height,
      },
      modalView: {
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:15,
      },

      topContainer:{
        width:Dimensions.get('window').width,
      },

      inputGroupContainer:{
        width: '100%',
      },
    
      inputContainer:{
        backgroundColor: '#fff',
        borderBottomColor:"gray",
        borderBottomWidth:0.5,
        alignItems: 'flex-start',
        width:'100%',
        height:70,
        paddingHorizontal:10,
        paddingVertical:5,
      },
    
      label:{
        paddingHorizontal:10,
        paddingVertical:15,
        fontWeight:'bold',
      },
    
      input:{
        width:'100%',
        height:'100%',
      },
    
      inputTextAreaContainer:{
        backgroundColor: '#fff',
        borderBottomColor:"gray",
        borderBottomWidth:0.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width:'100%',
        height:250,
        paddingHorizontal:10,
        paddingVertical:5,
      },

      textArea:{
        textAlignVertical: 'top',
        width:'100%',
        height:'100%',
      },
    
      bottomContainer:{
        width:Dimensions.get('window').width,
        paddingHorizontal:10,
        paddingTop:10,
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
    
})


export default styles;