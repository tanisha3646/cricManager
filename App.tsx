// App.tsx
import React from 'react';
import UserDetail from './components/UserDetail';
import UserState from './context/User/UserState';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import MainTab from './components/MainTab';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = async() => {
  let token = await AsyncStorage.getItem('userToken');
  let initial = 'Login';
  if(token)
    initial= 'MainTabNavigator'

  return (
    <UserState>
      <StatusBar barStyle="light-content" backgroundColor="#d9d9d9" />
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName={initial}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainTabNavigator"
            component={MainTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserState>
  );
};

export default App;
