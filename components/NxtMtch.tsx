import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import app from '../style';

const NxtMtch = () => {
  const matches = [
    { id: '1', name: 'Match 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '2', name: 'Match 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
    // Add more match data as needed
  ];
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Upcoming Matches</Text>
      <View style={styles.cardContainer}>
        {matches.map(match => (
          <MatchCard
            key={match.id}
            name={match.name}
            time={match.time}
            teamA={match.teamA}
            teamB={match.teamB}
          />
        ))}
      </View>
    </View>
  )
}

const MatchCard = ({ name, time, teamA, teamB }:any) => (
  <TouchableOpacity style={styles.card}>
    <Text style={styles.cardTitle}>{name}</Text>
    <View style={styles.divider}></View> 
    <View style={[app.inputContainer, {marginBottom:0}]}>
      <Text style={styles.cardTeams}>{teamA} vs {teamB}</Text>   
      <Text style={styles.cardTime}>{time}</Text>
    </View>    
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  divider: {
    height: 1, // Height of the line
    backgroundColor: '#b39379', // Color of the line
    marginTop: 5, // Space around the line
    marginBottom:10
  },
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'brown'
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'beige',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color:'brown'
  },
  cardTime: {
    fontSize: 14,
    color: 'grey',
  },
  cardTeams: {
    fontSize: 15,
    color: 'black',
  },
});
export default NxtMtch
