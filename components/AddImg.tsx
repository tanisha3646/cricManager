import React from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Function to request camera permission on Android
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS automatically grants permission through Info.plist configuration
};

// Function to request photo library permission on Android
const requestExternalStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message: 'This app needs access to your photo library.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS automatically grants permission through Info.plist configuration
};

const AddImg = ({ modalVisible, setModalVisible, setImg, comp }: any) => {
  const pickImage = async () => {
    const hasPermission = await requestExternalStoragePermission();
    if (hasPermission) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        presentationStyle: 'popover',
      });
      handleImagePickerResult(result);
    } else {
      console.log('Storage permission denied');
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        presentationStyle: 'popover',
      });
      handleImagePickerResult(result);
    } else {
      console.log('Camera permission denied');
    }
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
          console.warn(uri)
          setImg(uri);
        } else {
          console.log('Image URI is undefined');
        }
      }
    }
  };

  const removeImg = () => {
    setImg(null);
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Let your {comp} have a {(comp === 'team') ? 'Logo' : 'Banner'}</Text>
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
                <Text style={styles.optionText}>Remove {(comp === 'team') ? 'Logo' : 'Banner'}</Text>
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
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 20,
    color: 'brown',
    fontSize: 16,
  },
});

export default AddImg;
