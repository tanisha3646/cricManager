import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import app from '../style'
import AddTour from './AddTour';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tour = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddTour" component={AddTour} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const Register = ({navigation, add}:any) => {
    return (
        <View style={app.inputContainer}>
            <TouchableOpacity style={app.button} onPress={()=>{navigation.navigate(AddTour)}}>
                <Text style={app.buttonText}>Register Tournament</Text>
            </TouchableOpacity>
        </View>
    )
  }
export default Tour
