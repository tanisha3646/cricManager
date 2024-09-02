import React from 'react';
import { View, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';

const ContactSrch = () => {
  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts to proceed.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          loadContacts();
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          showPermissionDeniedAlert();
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          showPermissionDeniedForeverAlert();
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      const granted = await Contacts.requestPermission();

      if (granted === 'authorized') {
        loadContacts();
      } else if (granted === 'denied') {
        showPermissionDeniedAlert();
      } else if (granted === 'undefined') {
        showPermissionDeniedForeverAlert();
      }
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        console.log(contacts); // For debugging: log the contacts to the console
        // Here, you can set the contacts to the state or perform other actions.
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Error', 'Failed to load contacts.');
      });
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      'Permission Denied',
      'You need to grant contacts access permission.',
      [
        { text: 'OK', onPress: () => console.log('Permission Denied') },
        { text: 'Settings', onPress: openSettings },
      ]
    );
  };

  const showPermissionDeniedForeverAlert = () => {
    Alert.alert(
      'Permission Denied',
      'You need to enable contacts access in the app settings.',
      [
        { text: 'OK', onPress: () => console.log('Permission Denied Forever') },
        { text: 'Settings', onPress: openSettings },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={requestContactsPermission}>
      <Icon name="address-book" size={28} color="brown" solid={false} />
    </TouchableOpacity>
  );
};

export default ContactSrch;
