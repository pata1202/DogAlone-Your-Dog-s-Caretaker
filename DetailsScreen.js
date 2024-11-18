import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  const { message } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{message}</Text>
    </View>
  );
}