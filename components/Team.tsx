import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image, FlatList, StyleSheet } from 'react-native';
import app from '../style';
import SrchInput from './SrchInput';
import CreateTeam from './CreateTeam';
import ListTeam from './ListTeam';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamState from '../context/Team/TeamState';
import TeamMem from './TeamMem';

const Stack = createNativeStackNavigator();

const Team = () => {
  return (
    <TeamState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Team" component={Teams} />
        <Stack.Screen name="TeamMem" component={TeamMem} />
        <Stack.Screen name="CreateTeam" component={CreateTeam} />
      </Stack.Navigator>
    </TeamState>
  );
};

const Teams = ({ navigation }: any) => {
  return (
    <SafeAreaView style={app.splashContainer}>
      <SrchInput keyword="Search Team" />
      <ListTeam navigation={navigation}/>
      <TouchableOpacity style={app.button} onPress={() => { navigation.navigate('CreateTeam'); }}>
        <Text style={app.buttonText}>Add Team</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Team;
