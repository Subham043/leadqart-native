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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        height:70,
        paddingHorizontal:10,
        paddingVertical:5,
      },

      iconTextContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '73%',
      },

      subscribeContainer:{
        width: '25%',
      },
    
      label:{
        paddingHorizontal:10,
        paddingVertical:15,
        fontWeight:'bold',
      },

      FbPageName:{
          marginHorizontal:5
      },

      subscribe:{
          fontWeight: 'bold',
          color: '#ffa200'
      }
})

export default styles;