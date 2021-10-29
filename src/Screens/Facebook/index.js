import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import * as Facebook from 'expo-facebook';

const FacebookScreen = () => {

    async function logIn() {
        try {
          await Facebook.initializeAsync({
            appId: '455099129250811',
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile','leads_retrieval','pages_manage_ads'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${token}`);
            console.log(token);
            const resp = await response.json();
            console.log(resp.id);
            console.log(resp.name);
            // Alert.alert('Logged in!', `Hi ${(await response.json()).name}! your id is ${(await response.json()).id}`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', width:'100%', height:500}}>
           <TouchableOpacity onPress={logIn}>
                <Text style={{fontSize:20,backgroundColor:'blue',color:'white', padding:20,borderRadius:10}}>Facebook</Text>
           </TouchableOpacity>
            
        </View>
    )
}

export default FacebookScreen
