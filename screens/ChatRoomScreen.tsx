// import { useRoute } from '@react-navigation/core';
import React from 'react';
import { ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatMessages from '../components/ChatMessages';
import chatRoomData from '../data/Chats';
import BG from '../assets/images/BG.png';
import InputBox from '../components/InputBox';

const ChatRoom = (): JSX.Element => {
  // const { params } = useRoute();
  // console.log(params);
  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <ChatMessages message={item} />}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
};

export default ChatRoom;
