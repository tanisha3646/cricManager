import React, { useState, useContext} from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image, StyleSheet,Modal} from 'react-native';
import app from '../style';
import SrchInput from './SrchInput';
import ContactSrch from './ContactSrch';
import AddImg from './AddImg';
import TeamContext from '../context/Team/TeamContext';
import ShareTeam from './ShareTeam';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateTeam = () => {  
  const context = useContext(TeamContext); 
  if (!context) {
    throw new Error('useContext must be used within a TeamProvider');
  }
  const { addTeamMem, team } = context;

  const [logo, setLogo] = useState<string | null>(null);
  const [nme, setNme] = useState<string>('');
  const [loc, setLoc] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addTeam = async() => {
    setSubmitted(true);
    if (nme || loc) {
      setModalVisible(true);
      let data = {
        nme:nme,
        loc:loc,
        logo:(logo?logo:''),
        tag:tag,
        usrId:0
      }

      await addTeamMem(data, await AsyncStorage.getItem('userToken'));
      console.log(team)
    }
  };

  return (
    <SafeAreaView style={app.splashContainer}>
      <View style={app.container}>
        <ScrollView contentContainerStyle={app.scrollContainer}>
          <TeamDet logo={logo} setLogo={setLogo} nme={nme} setNme={setNme} loc={loc} setLoc={setLoc} tag={tag} setTag={setTag} submitted={submitted}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
            <SrchInput keyword='Add members using mobile number' wid='94%'/>
            <ContactSrch/>
          </View>
        </ScrollView>
        <TouchableOpacity style={app.button} onPress={addTeam}>
          <Text style={app.buttonText}>Create Team</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ShareTeam />
              <TouchableOpacity style={app.button} onPress={() => setModalVisible(false)}>
                <Text style={app.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const TeamDet = ({ logo, setLogo, nme, setNme, loc, setLoc, tag, setTag, submitted }: any) => {
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
      <AddImg
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setImg={setLogo}
        comp='team'
      />
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
}

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
    marginTop: 10
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  }
});

export default CreateTeam;
