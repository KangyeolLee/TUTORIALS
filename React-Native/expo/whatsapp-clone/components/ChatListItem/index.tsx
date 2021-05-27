import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChatRoom } from '../../types';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = ({ chatRoom }: ChatListItemProps): JSX.Element => {
  const navigation = useNavigation();
  const user = chatRoom.users[1];
  const onClick = useCallback(() => {
    navigation.navigate('ChatRoom', { name: user.name });
  }, []);
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avater} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
          </View>
        </View>
        <Text style={styles.time}>{dayjs(chatRoom.lastMessage.createdAt).format('YY-MM-DD')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
