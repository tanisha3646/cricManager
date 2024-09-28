import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import app from '../style';

const ShareTeam = ({setModalVisible}:any) => {
  return (
    <View style={app.shareContainer}>
      <TouchableOpacity style={app.shareOption}>
        <Icon name="share-alt" size={30} color="brown" />
        <Text style={app.optionText}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={app.shareOption}>
        <Icon name="copy" size={30} color="brown" />
        <Text style={app.optionText}>Copy Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={app.shareOption}>
        <Icon name="qrcode" size={30} color="brown" />
        <Text style={app.optionText}>QR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={app.button} onPress={() => setModalVisible(false)}>
        <Text style={app.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareTeam;
