import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image, FlatList, StyleSheet } from 'react-native';
import app from '../style';
import TeamDet from './TeamDet';
import ListTeam from './ListTeam';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamState from '../context/Team/TeamState';
import TeamMem from './TeamMem';
import ModalMid from './ModalMid';
import ShareTeam from './ShareTeam';

const Stack = createNativeStackNavigator();

const Team = ({route}:any ) => {
  const teamId = route?.params?.teamId || null;
  const [modalVisible, setModalVisible] = useState<boolean>(false); 

  useEffect(() => {
    if (teamId) {
      setModalVisible(true);
    }
  }, [teamId]);

  return (
    <>
    <TeamState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Team" component={Teams} />
        <Stack.Screen name="TeamMem" component={TeamMem} />
        <Stack.Screen name="TeamDet" component={TeamDet} />
      </Stack.Navigator>
    </TeamState>
    <ModalMid
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    comp={() => <ShareTeam setModalVisible = {setModalVisible}/>}
  />
  </>
  );
};

const Teams = ({ navigation }: any) => {
  return (
    <SafeAreaView style={app.splashContainer}>
      <ListTeam navigation={navigation}/>
      <TouchableOpacity style={app.button} onPress={() => { navigation.navigate('TeamDet'); }}>
        <Text style={app.buttonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Team;
