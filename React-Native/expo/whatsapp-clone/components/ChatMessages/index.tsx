import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Message } from '../../types';
import styles from './styles';

dayjs.extend(relativeTime);

export type ChatMessageProps = {
  message: Message;
};

const ChatMessages = ({ message }: ChatMessageProps): JSX.Element => {
  const isMyMessage = useCallback(() => {
    return message?.user?.id === 'u1';
  }, [message?.user?.id]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : '#fff',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}>
        {!isMyMessage() && <Text style={styles.name}>{message?.user?.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatMessages;
