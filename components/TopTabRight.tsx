import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const TopTabRight = () => {
  return (
    <View style={style.div}>
      <Icon name="search" size={20} color="brown" style={style.icon}/>
      <Icon name="bell" size={20} color="brown" style={style.icon}/>
    </View>
  )
}
const style = StyleSheet.create({
  icon:{
    marginEnd:10
  },
  div:{
    flex: 1,  
    flexDirection: 'row',
    alignItems:'center',
  }
});
export default TopTabRight
