import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import app from '../style';

const DateInput = ({ value, onDateChange, label, wid, mode = 'date' }: any) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      } else {
        console.warn('Invalid date format:', value);
        setDate(new Date());
      }
    }
  }, [value]);

  const handleDateChange = (selectedDate: any) => {
    setDate(selectedDate);
    onDateChange(selectedDate); // Pass the full Date object to the parent component
    setShow(false);
  };

  const formatDisplayValue = (date: Date) => {
    if (mode === 'date') {
      return date.toLocaleDateString(); // Format as date only
    } else if (mode === 'datetime') {
      return date.toLocaleString(); // Format as date and time
    }
    return date.toLocaleDateString(); // Default to date if mode is unspecified
  };

  return (
    <View style={{ width: wid }}>
      <TouchableOpacity
        style={[app.input, { height: 30 }]}
        onPress={() => setShow(true)}
      >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 5 }}>
          <Text style={{ color: value ? 'black' : 'grey', fontSize: 15 }}>
            {value ? formatDisplayValue(new Date(value)) : label}
          </Text>
          <Icon name="calendar-today" size={20} color="brown" style={{ marginRight: 5, alignSelf: 'flex-end' }} />
        </View>
      </TouchableOpacity>
      {show && (
        <DatePicker
          modal
          date={date}
          onConfirm={handleDateChange}
          onCancel={() => setShow(false)}
          mode={mode}
          theme="dark"
          open={show}
        />
      )}
    </View>
  );
};

export default DateInput;
