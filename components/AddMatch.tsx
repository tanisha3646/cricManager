import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,ScrollView } from 'react-native';
import DateInput from './DateInput';
import app from '../style';
import SelectTeams from './SelectTeams';

const AddMatch = ({navigation}:any) => {
  const [dteTme, setDteTme] = useState<string>('');

  return (
    <View style={app.container}>
      <ScrollView contentContainerStyle={app.scrollContainer}>
      <View style={{ padding: 15 }}>
        <TextInput
          style={[app.input, { marginVertical: 15 }]}
          placeholder="Overs"
          selectionColor="brown"
          placeholderTextColor="grey"
        />
        <TextInput
          style={[app.input, { marginVertical: 15 }]}
          placeholder="City/Town"
          selectionColor="brown"
          placeholderTextColor="grey"
        />
        <TextInput
          style={[app.input, { marginVertical: 15 }]}
          placeholder="Ground"
          selectionColor="brown"
          placeholderTextColor="grey"
        /> 
        <DateInput
            value={dteTme}
            onDateChange={setDteTme}
            label="End Date"
            wid="100%"
            mode='datetime'
        />
      </View>
      </ScrollView>
      <TouchableOpacity style={app.button} onPress={()=>{navigation.navigate(SelectTeams)}}>
        <Text style={app.buttonText}>Continue to select teams</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMatch;