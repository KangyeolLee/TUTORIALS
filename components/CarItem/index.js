/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import StyledButton from '../StyledButton';
import styles from './styles';

export default function CarItem({ car }) {
  const { name, tagline, image, taglineCTA } = car;

  return (
    <View style={styles.carContainer}>
      <ImageBackground source={image} style={styles.image} />

      <View style={styles.titles}>
        <Text style={styles.title}> {name} </Text>
        <Text style={styles.subtitie}>
          {tagline} &nbsp;
          <Text style={styles.subtitleCTA}>{taglineCTA}</Text>
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          types={'primary'}
          content={'Custom Order'}
          onPress={() => {
            console.warn('custom order');
          }}
        />
        <StyledButton
          types={'test'}
          content={'Existing Inventory'}
          onPress={() => {
            console.warn('hihihi order');
          }}
        />
      </View>
    </View>
  );
}
