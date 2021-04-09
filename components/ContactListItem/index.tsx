import API, { graphqlOperation } from '@aws-amplify/api';
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createChatRoom } from '../../src/graphql/mutations';
import { User } from '../../types';
import styles from './styles';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = ({ user }: ContactListItemProps): JSX.Element => {
  const onClick = useCallback(async () => {
    try {
      const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));
      console.log(newChatRoomData);

      if (!newChatRoomData.data) {
        console.log('Failed to create a chat room');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avater} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
