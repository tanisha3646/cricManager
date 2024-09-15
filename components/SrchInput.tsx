import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import app from '../style';

const SrchInput = ({keyword, style, wid}:any) => {
  return (
    <View style={[app.inputContainer, app.borderInput, {height:40, width:wid,justifyContent:'flex-start', margin:5}]}>
      <Icon name="search" size={20} color="brown" style={{marginVertical: 8, marginRight:5}} />
      <TextInput
        placeholder= {keyword}
        placeholderTextColor="brown"
        selectionColor="brown"
        style={{color: 'black', fontSize:15}}
      />
    </View>
  );
};

export default SrchInput;
