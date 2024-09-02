import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import app from '../style';

const SrchInput = ({wid, keyword}:any) => {
  return (
    <View style={[app.inputContainer, app.borderInput, {width:wid,height:40, flex:1,justifyContent:'flex-start'}]}>
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
