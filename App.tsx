import React, { useState, useEffect } from 'react';
import UserDetail from './components/UserDetail';
import UserState from './context/User/UserState';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import MainTab from './components/MainTab';
import { StatusBar, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null); 

  const determineInitialRoute = async () => {
    const token = await AsyncStorage.getItem('userToken');
    console.log(token)
    if (token) {
      setInitialRoute('MainTabNavigator');
    } else {
      setInitialRoute('Login');
    }
  };

  useEffect(() => {
    determineInitialRoute();
  }, []);

  if (initialRoute === null) {
    // Show a loading screen until the initial route is determined
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserState>
      <StatusBar barStyle="light-content" backgroundColor="#d9d9d9" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{ headerShown: false }}
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
