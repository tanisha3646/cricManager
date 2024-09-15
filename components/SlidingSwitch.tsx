import React, {useState, useEffect} from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import app from '../style';

const SlidingSwitch = (props: any) => {  
  const [isOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    props.setGen(isOn?'F':'M');
  }, [isOn]);

  return (
      <TouchableOpacity style={[app.switchContainer]} onPress={() => {setIsSwitchOn(!isOn)}}>
      {isOn ? (
        <>
          <View style={[app.switchCircle, { alignSelf: 'flex-end'}]} />
          <Text style={[app.switchText, { alignSelf: 'flex-start', top:5, left:2}]}>{props.on}</Text>
        </>
      ) : (
        <>
          <Text style={[app.switchText, { alignSelf: 'flex-end', bottom:7, left:10}]}>{props.off}</Text>
          <View style={[app.switchCircle, { alignSelf: 'flex-start' }]} />
        </>
      )}
      </TouchableOpacity>
  )
}

export default SlidingSwitch
