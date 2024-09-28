import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopTabLeft from '../components/TopTabLeft';
import TopTabRight from '../components/TopTabRight';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Home from '../components/Home';
import Profile from '../components/Profile';
import Play from './Play';
import Team from '../components/Team';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (<>
      <StatusBar barStyle="light-content" backgroundColor="#b3afaf" />
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Another Screen" component={Play} />
      </Drawer.Navigator> */}
        <Tab.Navigator screenOptions={{
          headerStyle: { height: 40, backgroundColor:'#b3afaf'},
          headerLeft: () => <TopTabLeft/>,
          headerRight: () => <TopTabRight/>,
          headerTitle: () => <Text style={{fontSize:18, fontWeight:'bold', color:'brown'}}>Cric Manager</Text>,
          headerTitleAlign: 'center',
          tabBarActiveTintColor: 'brown',
          tabBarInactiveTintColor: '#9c8181',
          tabBarStyle: { backgroundColor: '#b3afaf' },
          tabBarLabel: () => null
        }}>
          <Tab.Screen name="Home" component={Home} options={{
              tabBarIcon: ({color}) => (
                <Icon name="home" size={26} color={color}/>
              ),
            }}/>
          <Tab.Screen name="Play" component={Play} options={{
              tabBarIcon: ({color}) => (
                <Icon name="trophy" size={26} color={color}/>
              ),
            }}/>
          <Tab.Screen name="Teams" component={Team} options={{
              tabBarIcon: ({color}) => (
                <Icon name="users" size={26} color={color}/>
              ),
            }}/>
          <Tab.Screen name="Profile" component={Profile} options={{
              tabBarIcon: ({color}) => (
                <Icon name="user" size={26} color={color}/>
              ),
            }}/>
        </Tab.Navigator>
      </>
      );
}

export default MainTab
