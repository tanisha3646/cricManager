import React from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Platform, ActionSheetIOS, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddImg = ({ modalVisible, setModalVisible, setImg, comp }: any) => {
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      presentationStyle: 'popover',
    });
    handleImagePickerResult(result);
  };

  const takePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      presentationStyle: 'popover',
    });
    handleImagePickerResult(result);
  };

  const handleImagePickerResult = (result: any) => {
    if (result) {
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (uri) {
          setImg(uri);
        } else {
          console.log('Image URI is undefined');
        }
      }
    }
  };
  const removeImg = ()=>{
    setImg(null)
  }

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Let your {comp} have a {(comp=='team')?'Logo': 'Banner'}</Text>
            </View>
            <View style={styles.body}>
              <TouchableOpacity style={styles.option} onPress={() => { takePhoto(); setModalVisible(false); }}>
                <Icon name="photo-camera" size={30} color="#A52A2A" />
                <Text style={styles.optionText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => { pickImage(); setModalVisible(false); }}>
                <Icon name="photo-library" size={30} color="#A52A2A" />
                <Text style={styles.optionText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => { removeImg(); setModalVisible(false); }}>
                <Icon name="remove-circle-outline" size={30} color="#A52A2A" />
                <Text style={styles.optionText}>Remove {(comp=='team')?'Logo': 'Banner'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  header: {
    backgroundColor: 'brown',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    padding: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom:3,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 20,
    color: 'brown',
    fontSize: 16,
  },
  addButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default AddImg;
