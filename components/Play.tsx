import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Match from './Match';
import Tour from './Tour';

const Tab = createMaterialTopTabNavigator();

const Play = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 14 },
      tabBarItemStyle: { flex: 1, justifyContent: 'center' },
      tabBarStyle: { backgroundColor: '#b3afaf' },
      tabBarActiveTintColor: 'brown',
      tabBarInactiveTintColor: '#9c8181',
      tabBarPressColor:'#9c8181',
      tabBarScrollEnabled:false,
      tabBarIndicatorStyle: {backgroundColor: 'brown'},
    }}>
      <Tab.Screen name="Matches" component={Match} />
      <Tab.Screen name="Tournaments" component={Tour}/>
    </Tab.Navigator>
  )
}

export default Play
