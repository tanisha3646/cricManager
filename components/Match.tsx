import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import app from '../style'
import AddMatch from './AddMatch';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectTeams from './SelectTeams';

const Stack = createNativeStackNavigator();

const Match = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="StartMatch" component={StartMatch} />
        <Stack.Screen name="AddMatch" component={AddMatch}/>
        <Stack.Screen name="SelectTeams" component={SelectTeams}/>
    </Stack.Navigator>
  )
}

const StartMatch = ({navigation, add}:any) => {
    return (
        <View style={app.inputContainer}>
            <TouchableOpacity style={app.button} onPress={()=>{navigation.navigate(AddMatch)}}>
                <Text style={app.buttonText}>Start a match</Text>
            </TouchableOpacity>
        </View>
    )
  }
export default Match
