import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import app from '../style';
import SrchInput from './SrchInput';
import ContactSrch from './ContactSrch';
import AddImg from './AddImg';
import TeamContext from '../context/Team/TeamContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../context/User/UserContext';
import ListMem from './ListMem';

const TeamDet = ({ navigation, route }: any) => {
  const team = route?.params?.team || null;
  const context = useContext(TeamContext);
  const context1 = useContext(UserContext);
  if (!context || !context1) {
    throw new Error('useContext must be used within a TeamProvider or UserProvider');
  }

  const { addTeam, addTeamMem, teamMem, getTeamMem } = context;
  const { getMem, mem, setMem } = context1;

  const [logo, setLogo] = useState<string | null>(null);
  const [nme, setNme] = useState<string>('');
  const [loc, setLoc] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const addTeams = async () => {
    setSubmitted(true);
    if (nme || loc) {
      let data = {
        nme: nme,
        loc: loc,
        logo: logo ? logo : '',
        tag: tag,
        usrId: 0,
      };

      await addTeam(data, await AsyncStorage.getItem('userToken'));
      navigation.navigate('Team');
    }
  };

  useEffect(() => {
    if(team){
      setLogo(team.logo);
      setNme(team.nme);
      setLoc(team.loc);
      setTag(team.tag);
      const fetchData = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          await getTeamMem({ teamId: team.teamId }, token);
          setMem('');
        }
      };
      fetchData();
    }
    else{
      setLogo('');
      setNme('');
      setLoc('');
      setTag('');
    }
  },[team]);

  const renderTeamHeader = () => (
    <TeamLine logo={logo} setLogo={setLogo} nme={nme} setNme={setNme} loc={loc} setLoc={setLoc} tag={tag} setTag={setTag} submitted={submitted} />
  );

  return (
    <SafeAreaView style={app.splashContainer}>
      <View style={app.container}>
        {renderTeamHeader()}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
          <View style={{ flex: 1 }}>
            <SrchInput keyword="Enter name or a valid number" typ="default" onChng={getMem} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <ContactSrch />
          </View>
        </View>

        {/* teamMem list */}
        {teamMem ? (
          <FlatList
            data={teamMem}
            renderItem={MemberCard}
            keyExtractor={(item) => item.memId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : null}

        {/* ListMem positioned above teamMem */}
        {mem ? (
          <View style={styles.overlay}>
            <ListMem members={mem} addMem={addTeamMem} />
          </View>
        ) : null}

        <TouchableOpacity style={app.button} onPress={addTeams}>
          <Text style={app.buttonText}>Create Team</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const TeamLine = ({ logo, setLogo, nme, setNme, loc, setLoc, tag, setTag, submitted }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <Text style={styles.text}>Add Logo</Text>
        )}
      </TouchableOpacity>
      <AddImg modalVisible={modalVisible} setModalVisible={setModalVisible} setImg={setLogo} comp="team" />
      <View style={{ margin: 15 }}>
        <TextInput
          style={[app.input, { marginTop: 10 }]}
          placeholder="Team Name"
          selectionColor="brown"
          placeholderTextColor="grey"
          value={nme}
          onChangeText={setNme}
        />
        {submitted && !nme && <Text style={styles.errorText}>Team Name is required.</Text>}
        <TextInput
          style={[app.input, { marginTop: 10 }]}
          placeholder="City/Town"
          selectionColor="brown"
          placeholderTextColor="grey"
          value={loc}
          onChangeText={setLoc}
        />
        {submitted && !loc && <Text style={styles.errorText}>City/Town is required.</Text>}
        <TextInput
          style={[app.input, { marginTop: 10 }]}
          placeholder="Tag Line (optional)"
          selectionColor="brown"
          placeholderTextColor="grey"
          value={tag}
          onChangeText={setTag}
        />
      </View>
    </View>
  );
};

const MemberCard = ({ item }: any) => (
  <View style={styles.memberCard}>
    {item.img ? (
      <Image source={{ uri: item.img }} style={styles.memberImage} />
    ) : (
      <View style={styles.initialsContainer}>
        <Text style={styles.initialsText}>{item.nme.charAt(0).toUpperCase()}</Text>
      </View>
    )}
    <Text style={styles.memberName}>{item.nme}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#b3afaf',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    position: 'absolute',
    bottom: 5,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  memberCard: {
    alignItems: 'center',
    marginVertical: 10,
    width: 80,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  memberName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: 350, // Adjust this based on the position of the teamMem list
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default TeamDet;
