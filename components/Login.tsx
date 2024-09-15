import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, Button, ImageBackground, SafeAreaView,Alert} from 'react-native';
import app from '../style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Login = () => {
  return ( 
      <Stack.Navigator initialRouteName="MobDet" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MobDet" component={MobDet} />
        <Stack.Screen name="OtpDet" component={OtpDet} />
      </Stack.Navigator>
  )
}

const MobDet = ({navigation}: any) => {
  const [mob, setMob] = useState('');
  
  return (
    <SafeAreaView style={app.splashContainer}>
    <ImageBackground source={require('../img/backImg.png')} resizeMode="cover" style={app.backImg}>    
    <View style={{margin:15}}>
      <Text style={app.text}>Enter your Mobile Number</Text>
      <View style={app.inputContainer}>
        <TextInput
          style={[app.input, { width:'auto', textAlign:'center' }]}
          placeholder='+91'
          placeholderTextColor="black"
          readOnly
        />
        <TextInput
          style={[app.input, { flex: 1, marginLeft:10 }]}
          placeholderTextColor="grey"
          placeholder='0000-000-000'
          onChangeText={(text) => setMob(text)}
          value={mob}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <Button color="brown" title="Get OTP" onPress={() => navigation.navigate('OtpDet', {mob:mob})}/>
    </View>
    </ImageBackground>    
    </SafeAreaView>
  )
}

const OtpDet = ({ route, navigation }: any) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const { mob } = route.params;
  
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];
  
  useEffect(() => {
    inputRefs[0].current?.focus();  // Focus on the first input field when component mounts
  }, []);

  const handleTextChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    // Move focus to next input if the current input is filled
    if (text.length === 1 && index < inputRefs.length - 1) {
      const nextInput = inputRefs[index + 1]?.current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // If backspace is pressed and the current input is empty, move to the previous input
    if (e.nativeEvent.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      const prevInput = inputRefs[index - 1]?.current;
      if (prevInput) {
        prevInput.focus();  // Focus on the previous input
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = '';  // Clear the value of the previous input
        setOtpValues(newOtpValues);
      }
    }
  };

  const usrLogin = () => {
    // Combine OTP values into a single string
    const otp = otpValues.join('');

    // Example OTP for comparison (hardcoded for demonstration)
    const predefinedOtp = '9999'; 
    if (otp === predefinedOtp) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MobDet' }],
        })
      );
      navigation.navigate('UserDetail', { mob: mob });
    } else {
      // Handle invalid OTP (e.g., show a message or error state)
      Alert.alert('Invalid OTP');
    }
  };

  return (
    <ImageBackground source={require('../img/backImg.png')} resizeMode="cover" style={app.backImg}>
      <View style={{ margin: 15 }}>
        <Text style={app.text}>Enter the code</Text>
        <View style={app.inputContainer}>
          {inputRefs.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={[app.input, { width: '21%', textAlign: "center" }]}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={otpValues[index]}
            />
          ))}
        </View>
        <Text style={app.otpBack} onPress={() => navigation.navigate('MobDet')}>Back</Text>
        <Button color="brown" title="Login" onPress={usrLogin} />
      </View>
    </ImageBackground>
  );
};
export default Login
