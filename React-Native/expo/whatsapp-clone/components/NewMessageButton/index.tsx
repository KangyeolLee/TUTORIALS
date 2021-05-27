import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

const NewMessageButton = (): JSX.Element => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate('Contacts');
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="message-reply-text" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NewMessageButton;
