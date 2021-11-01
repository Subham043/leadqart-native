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
    
})


export default styles;