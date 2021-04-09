import React from 'react';
import { FlatList } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from '../components/NewMessageButton';
import { View } from '../components/Themed';
import chatRooms from '../data/ChatRooms';

export default function ChatScreen(): JSX.Element {
  return (
    <View>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={item => item.id}
      />
      <NewMessageButton />
    </View>
  );
}
