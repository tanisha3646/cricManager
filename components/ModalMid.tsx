import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ModalMid = ({ visible, onClose, comp }: any) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {comp}
        </View>
      </View>      
    </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  }
});

export default ModalMid;
