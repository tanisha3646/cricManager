import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import TeamContext from '../context/Team/TeamContext';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TeamMem = ({ route }: any) => {
  const { team } = route.params; 
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useContext must be used within a TeamProvider');
  }
  const { getTeamMem } = context;
  const [members, setMembers] = useState<any | undefined>();

  useFocusEffect(() => {
    const fetchMembers = async () => {
      const token = await AsyncStorage.getItem('userToken');
      let teamMembers;
      if (token) {
        teamMembers = await getTeamMem({srch:'tes'}, token);
      }
      setMembers(teamMembers);
    };
    fetchMembers();
  });

  const renderMember = ({ item }: any) => (
    <View style={styles.memberCard}>
      <Image source={{ uri: item.img }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberPlace}>{item.place}</Text>
        <Text style={styles.memberDesignation}>{item.designation}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={members}
      renderItem={renderMember}
      keyExtractor={(item) => item.memberId.toString()}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 2,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberPlace: {
    fontSize: 14,
    color: 'grey',
  },
  memberDesignation: {
    fontSize: 14,
    color: 'brown',
  },
  listContainer: {
    margin: 15,
  },
});

export default TeamMem;
