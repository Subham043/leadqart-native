import React, {useState} from 'react';
import { Text, TouchableOpacity, View, TextInput, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../../Components/ColorPicker'
import styles from './styles'

const AddGroupScreen = () => {
    const [colorPicker, setColorPicker] = useState("#C0392B")

    return (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topContainer}>

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
              <TouchableOpacity
                style={styles.saveContainer}
                onPress={() => console.log("hello")}>
                <Text style={styles.textStyle}>CREATE GROUP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
}

export default AddGroupScreen
