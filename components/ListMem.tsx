import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListMem = ({ members, addMem}: any) => {
    const [showList, setShow] = useState(true);
  const addMember = async (member: any) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      await addMem({ memId: member.usrId }, token);
      setShow(false)
    }
  };
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.memberItem}>
      {item.img ? (
        <Image source={{ uri: item.img }} style={styles.memberImage} />
      ) : (
        <View style={[styles.memberImage, { backgroundColor: 'grey' }]} />
      )}
      <View style={styles.memberDetails}>
        <Text style={styles.memberName}>{item.nme}</Text>
        <Text style={styles.memberMob}>{item.mobNo}</Text>
      </View>
      <TouchableOpacity onPress={() => addMember(item)}>
        <Icon name="plus" size={20} color="brown" />
      </TouchableOpacity>
    </View>
  );

  return (    
    <View style={styles.container}>
      {showList?(<FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.usrId.toString()}
        style={styles.list}
      />):''}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  list: {
    margin: 10,
    zIndex: 1,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
    borderRadius: 8,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d9d9d9',
  },
  memberDetails: {
    flex: 1,
    marginLeft: 10,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberMob: {
    fontSize: 14,
    color: 'grey',
  },
  teamMemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    flex: 1, // Allow container to take full height for scrolling
  },
  teamMemHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamMemList: {
    flexGrow: 1, // Allow the list to take necessary height
  },
  teamMemberItem: {
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
    flex: 1, // Allow items to stretch equally in the column
    justifyContent: 'center',
  },
  teamMemberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  teamMemberName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center', // Center align the name below the image
  },
  removeButton: {
    position: 'absolute',
    top: -5, // Adjust to place at the top right of the image
    right: -10, // Adjust to position appropriately
  },
});

export default ListMem;
