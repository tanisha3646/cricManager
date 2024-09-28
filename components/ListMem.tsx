import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListMem = ({ members }: any) => {
  const handleAddMember = (member: any) => {
    console.log(`Add member: ${member.nme}`);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.memberItem}>
      {item.img ? (
        <Image
            source={{ uri: item.img }}
            style={styles.memberImage}
        />
        ) : (
        <View style={[styles.memberImage, { backgroundColor: 'transparent' }]} />
        )}
      <View style={styles.memberDetails}>
        <Text style={styles.memberName}>{item.nme}</Text>
        <Text style={styles.memberMob}>{item.mobNo}</Text>
      </View>
      <TouchableOpacity onPress={() => handleAddMember(item)}>
        <Icon name="plus" size={20} color="green" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={members}
      renderItem={renderItem}
      keyExtractor={(item) => item.usrId.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 10,
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
    backgroundColor: '#d9d9d9', // Placeholder background color if no image
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
});

export default ListMem;
