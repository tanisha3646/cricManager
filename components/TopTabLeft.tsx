import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Play from './Play';

// Update this path to the correct location of your logo image
const logo = require('../img/logo.png');
const Drawer = createDrawerNavigator();
const TopTabLeft = () => {
  return (
    <>
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,  // Adjust the size as needed
    height: 40, // Adjust the size as needed
    resizeMode: 'contain', // Ensures the image fits within the bounds of the width and height
  },
});

export default TopTabLeft;
