import React, {useContext, useCallback, useState} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import TeamContext from '../context/Team/TeamContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ModalMid from './ModalMid';

interface Team {
    teamId: number;
    logo: string;
    nme: string; 
    loc: string; 
    cnt: number;
  }

const ListTeam = ({navigation}:any) => {
    const context = useContext(TeamContext);
    if (!context) {
      throw new Error('useContext must be used within a TeamProvider');
    }
    const { getTeam, team } = context;
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    const handleQRCodeClick = (team: any) => {
      setSelectedTeam(team);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          const token = await AsyncStorage.getItem('userToken');
          if (token) {
            await getTeam({srch:'tes'}, token);
          }
        };
        fetchData();
      }, [])
    );

    const handleTeamClick = (team: any) => {
        navigation.navigate('TeamMem');
    };

    const modCmp = ()=>{
        return(
        <>
            <Icon name="qrcode" size={100} color="brown" />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </>
        );
    }

    const renderTeam = ({ item }: any) => (        
    <TouchableOpacity onPress={() => handleTeamClick(item)} style={styles.teamCard}>
            {item.logo ? (
            <Image source={{ uri: item.logo }} style={styles.teamLogo} />
            ) : (
            <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>
                {item.nme
                    .split(' ')
                    .map((word: string) => word[0])
                    .join('')
                    .toUpperCase()}
                </Text>
            </View>
            )}
            <View style={styles.teamInfo}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.teamName}>{item.nme}</Text>            
                    <Text style={styles.membersCount}>{item.cnt}</Text>
                </View>
                <Text style={styles.teamCity}>{item.loc}</Text>
            </View>
            <TouchableOpacity onPress={() => handleQRCodeClick(item)}>
                <Icon name="qrcode" size={25} color="brown" />
            </TouchableOpacity>
    </TouchableOpacity>
    );
  
    if (!team || team.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No teams available.</Text>
        </View>
      );
    }
  
    return (
        <>
        <FlatList
          data={team}
          renderItem={renderTeam}
          keyExtractor={(item) => item.teamId.toString()}
          style={styles.listContainer}
        />
        {selectedTeam && (
          <ModalMid
            visible={modalVisible}
            onClose={closeModal}
            teamName={selectedTeam.nme}
            comp={modCmp}
          />
        )}
      </>
    );
  };



  const styles = StyleSheet.create({
    teamCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f5f5f5',
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      elevation: 2,
    },
    teamLogo: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    teamInfo: {
      flex: 1,
      marginLeft: 10,
    },
    teamName: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'brown',
    },
    teamCity: {
      fontSize: 14,
      color: 'grey',
    },
    membersCount: {
      fontSize: 14,
      color: 'black',
      paddingHorizontal:10
    },
    listContainer: {
      margin: 15,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    emptyText: {
      fontSize: 18,
      color: 'grey',
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
      fontSize: 18,
      fontWeight: 'bold',
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: 'brown',
      padding: 10,
      borderRadius: 8,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});

export default ListTeam
