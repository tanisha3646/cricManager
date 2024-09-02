import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import app from '../style';

const Home = () => {
  const matches = [
    { id: '1', name: 'Match 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '2', name: 'Match 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
    { id: '3', name: 'Match 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '4', name: 'Match 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
    { id: '5', name: 'Match 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '6', name: 'Match 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
  ];

  const tour = [
    { id: '1', name: 'Tour 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '2', name: 'Tour 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
    { id: '3', name: 'Match 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '4', name: 'Match 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
    { id: '5', name: 'Match 1', time: '10:00 AM', teamA: 'Team A', teamB: 'Team B' },
    { id: '6', name: 'Match 2', time: '12:00 PM', teamA: 'Team C', teamB: 'Team D' },
  ];

  const renderMatch = ({ item }: any) => (
    <MatchCard
      name={item.name}
      time={item.time}
      teamA={item.teamA}
      teamB={item.teamB}
    />
  );

  const renderTour = ({ item }: any) => (
    <TouchableOpacity style={styles.card}></TouchableOpacity>
  );

  const renderTeam = ({ item }: any) => (
    <View style={styles.teamContainer}>
      <View style={styles.circularCard}></View>
      <Text style={styles.teamName}>{item.teamA}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Tournaments</Text>
      <FlatList
        data={matches}
        renderItem={renderTour}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.text}>Matches</Text>
      <FlatList
        data={tour}
        renderItem={renderMatch}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.text}>Teams</Text>
      <FlatList
        data={tour}
        renderItem={renderTeam}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.listContainer}
      />
      <View style={app.inputContainer}>
        <TouchableOpacity style={app.button}>
          <Text style={app.buttonText}>Start a match</Text>
        </TouchableOpacity>
        <TouchableOpacity style={app.button}>
          <Text style={app.buttonText}>Your Matches</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MatchCard = ({ name, time, teamA, teamB }: any) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.triangleContainer}>
      <View style={styles.triangleTopLeft}>
        <Text style={[styles.teamText, { left: 5 }]}>{teamA}</Text>
      </View>
      <View style={styles.triangleBottomRight}>
        <Text style={[styles.teamText, { right: 5 }]}>{teamB}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'brown',
  },
  card: {
    flexDirection: 'column',
    width: 200,
    aspectRatio: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 8, // Adjust spacing between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    position: 'relative',
  },
  triangleContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  triangleTopLeft: {
    position: 'absolute',
    borderStyle: 'solid',
    borderRightWidth: 200,
    borderBottomWidth: 132,
    borderRightColor: 'transparent',
    borderBottomColor: '#f0e5d8', // Color for the upper half
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleBottomRight: {
    position: 'absolute',
    borderStyle: 'solid',
    borderLeftWidth: 200,
    borderTopWidth: 132,
    borderLeftColor: 'transparent',
    borderTopColor: '#d8cfc4', // Color for the lower half
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamText: {
    fontSize: 15,
    color: 'black',
    position: 'absolute',
  },
  listContainer: {
    paddingVertical: 10,
  },
  teamContainer: {
    alignItems: 'center',
    marginHorizontal: 8, // Adjust spacing between circular cards
  },
  circularCard: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the card circular
    backgroundColor: '#f0f0f0', // Background color for the circular card
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Space between the circular card and the team name
  },
  teamName: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});

export default Home;
