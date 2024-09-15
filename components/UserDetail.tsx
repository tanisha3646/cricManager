// UserDetail.js
import React, { useState,useContext, useEffect } from 'react';
import { TextInput, View, Text, Button, TouchableOpacity, ImageBackground } from 'react-native';
import UserContext from '../context/User/UserContext';
import SlidingSwitch from './SlidingSwitch';
import DatePicker from 'react-native-date-picker';
import { CommonActions } from '@react-navigation/native';
import app from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetail = ({ navigation, route }: any) => {
  const { mob } = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState('');
  const [firstNme, setFirstNme] = useState('');
  const [lastNme, setLastNme] = useState('');
  const [gen, setGen] = useState('');
  const context = useContext(UserContext); 

  if (!context) {
    throw new Error('useContext must be used within a TeamProvider');
  }
  const {token, getUsr} = context;

  const onDateChange = (selectedDate: any) => {
    setDate(selectedDate);
    setDob(selectedDate.toLocaleDateString());
    setShow(false);
  };

  useEffect(()=>{    
    console.log(token)
    if(token){
      handleLogin();
    }
  },[token]);

  const handleLogin = async()=>{
    await AsyncStorage.setItem('userToken', token);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabNavigator' }],
      })
    );
  }

  const registerUser = async() => {
    let dte = dob.split('/')
    const data = {
      fNme: firstNme,
      lNme: lastNme,
      dob: dte[2]+'-' + dte[0]+'-' + dte[1],
      gen: gen,
      mobTel: mob
    };
    await getUsr(data);
  };

  return (
    <ImageBackground source={require('../img/backImg.png')} resizeMode="cover" style={app.backImg}>
      <View style={app.usrDet}>
        <View style={{ margin: 15 }}>
          <Text style={app.text}>Let's quickly create your profile</Text>
          <TextInput
            style={[app.input, { marginVertical: 15 }]}
            placeholder="First Name"
            selectionColor="brown"
            placeholderTextColor="grey"
            value={firstNme}
            onChangeText={setFirstNme}
          />
          <TextInput
            style={[app.input]}
            placeholder="Last Name"
            selectionColor="brown"
            placeholderTextColor="grey"
            value={lastNme}
            onChangeText={setLastNme}
          />
          <View style={app.inputContainer}>
            <TouchableOpacity style={[app.input, { width: '63%', height: 30 }]} onPress={() => setShow(true)}>
              <Text style={{ color: dob ? 'black' : 'gray' }}>
                {dob || 'Date of Birth'}
              </Text>
            </TouchableOpacity>
            <SlidingSwitch on="Female" off="Male" setGen={setGen} />
          </View>
          <Button color="brown" title="Continue" onPress={registerUser} />
          {show && (
            <DatePicker
              modal
              date={date}
              onConfirm={onDateChange}
              onCancel={() => setShow(false)}
              mode="date"
              theme="dark"
              open={show}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserDetail;
