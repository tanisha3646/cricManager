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

const TeamDet = ({ navigation }: any) => {
  const context = useContext(TeamContext);
  const context1 = useContext(UserContext);
  if (!context || !context1) {
    throw new Error('useContext must be used within a TeamProvider or UserProvider');
  }

  const { addTeam, addTeamMem } = context;
  const { getMem, mem } = context1;

  const [logo, setLogo] = useState<string | null>(null);
  const [nme, setNme] = useState<string>('');
  const [loc, setLoc] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [srch, setSrch] = useState('');

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
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token && srch.length > 0) {
        await getMem({ txt: srch }, token);
      }
    };
  
    fetchData();
  }, [srch]);

  const renderTeamHeader = () => (
    <TeamLine logo={logo} setLogo={setLogo} nme={nme} setNme={setNme} loc={loc} setLoc={setLoc} tag={tag} setTag={setTag} submitted={submitted} />
  );

  return (
    <SafeAreaView style={app.splashContainer}>
      <View style={app.container}>
        <FlatList
          data={mem}
          ListHeaderComponent={
            <View>
              {renderTeamHeader()}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <SrchInput keyword="Enter name or a valid number" srch={srch} setSrch={setSrch} typ="default" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <ContactSrch />
                </View>
              </View>
            </View>
          }
          renderItem={({ item }) => <ListMem members={[item]} />}
          keyExtractor={(item) => item.usrId.toString()}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No members found.</Text>}
        />
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
});

export default TeamDet;
