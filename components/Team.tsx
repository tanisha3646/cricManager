import React from 'react'
import {Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import app from '../style'
import SrchInput from './SrchInput';
import CreateTeam from './CreateTeam';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamState from '../context/Team/TeamState';

const Stack = createNativeStackNavigator();

const Team = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Team" component={Teams} />
          <Stack.Screen name="CreateTeam" component={CreateTeam}/>
      </Stack.Navigator>
      
  )
}
const Teams = ({navigation}:any) => {
  return (
    <SafeAreaView style={app.splashContainer}>
    <View style={app.container}>
    <View>
    <SrchInput keyword='Search Team'/>  
    </View> 
    <TouchableOpacity style={app.button} onPress={()=>{navigation.navigate('CreateTeam')}}>
        <Text style={app.buttonText}>Add Team</Text>
      </TouchableOpacity>    
    </View>
    </SafeAreaView>
  )
}

export default Team
