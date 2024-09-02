import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateInput from './DateInput';
import AddImg from './AddImg';
import app from '../style';

const AddTour = () => {
  const [bannerImg, setBannerImg] = useState<string | null>(null);
  const [startDte, setStartDte] = useState<string>('');
  const [endDte, setEndDte] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTournament = () => {
    console.log({
      bannerImg,
      startDte,
      endDte
    });
  };

  return (
    <View style={app.container}>
      <ScrollView contentContainerStyle={app.scrollContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={app.bannerContainer}>
        {bannerImg ? (<Image source={{ uri: bannerImg }} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />) 
        : 
        (
          <View>
            <View style={app.bannerPlaceholder}>
              <Icon name="photo-library" size={40} color="lightgray" />
              <Text>Add a banner</Text>
            </View>
            <Icon name="add-a-photo" size={18} color="white" style={app.cameraIcon} />
          </View>
        )}
      </TouchableOpacity>

      <AddImg
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setImg={setBannerImg}
      />

      <View style={{ padding: 15 }}>
        <TextInput
          style={[app.input, { marginVertical: 15 }]}
          placeholder="Tournament Name"
          selectionColor="brown"
          placeholderTextColor="grey"
        />
        <TextInput
          style={[app.input, { marginVertical: 15 }]}
          placeholder="Place"
          selectionColor="brown"
          placeholderTextColor="grey"
        />
        <TextInput
          style={[app.input, { marginVertical: 15 }]}
          placeholder="Organiser Name"
          selectionColor="brown"
          placeholderTextColor="grey"
        />        
        <View style={app.inputContainer}>
          <DateInput
            value={startDte}
            onDateChange={setStartDte}
            label="Start Date"
            wid="48%"
            mode='date'
          />
          <DateInput
            value={endDte}
            onDateChange={setEndDte}
            label="End Date"
            wid="48%"
            mode='date'
          />
        </View>
      </View>
      </ScrollView>
      <TouchableOpacity style={app.button} onPress={handleAddTournament}>
        <Text style={app.buttonText}>Register Tournament</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTour;