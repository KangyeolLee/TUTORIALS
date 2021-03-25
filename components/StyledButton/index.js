/* eslint-disable react/prop-types */
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styles from './styles';

export default function StyledButton({ types, content, onPress }) {
  const backgroundColor = types === 'primary' ? '#171A20CC' : '#FFFFFFA6';
  const textColor = types === 'primary' ? '#fff' : '#171A20';

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, { backgroundColor }]} onPress={() => onPress()}>
        <Text style={[styles.text, { color: textColor }]}>{content}</Text>
      </Pressable>
    </View>
  );
}
