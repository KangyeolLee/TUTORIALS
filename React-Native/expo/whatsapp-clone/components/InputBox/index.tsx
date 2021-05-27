import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

const InputBox = (): JSX.Element => {
  const [message, setMessage] = useState('');
  const onSendPress = useCallback(() => {
    console.warn(`Sending ${message}`);
    setMessage('');
  }, []);
  const onMicrophonePress = useCallback(() => {
    console.warn('microphone');
  }, []);
  const onPress = useCallback(() => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  }, [message]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          multiline
          value={message}
          placeholder="Type a message"
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={24} color="#fff" />
          ) : (
            <MaterialIcons name="send" size={24} color="#fff" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
