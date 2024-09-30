import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '../style';

const SrchInput = ({ keyword, typ, onChng }: any) => {
  const onChange = async(srch : string)=>{
    const token = await AsyncStorage.getItem('userToken');
      if (token) {
        await onChng({ txt: srch }, token);
      }
  }
  return (
    <View style={[app.inputContainer, app.borderInput, { height: 40, justifyContent: 'flex-start', margin: 5 }]}>
      <Icon name="search" size={20} color="brown" style={{ marginVertical: 8, marginRight: 5 }} />
      <TextInput
        placeholder={keyword}
        placeholderTextColor="brown"
        selectionColor="brown"
        style={{ color: 'black', fontSize: 15 }}
        onChangeText={onChange} 
        keyboardType= {typ}
      />
    </View>
  );
};

export default SrchInput;
