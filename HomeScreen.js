import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details2222222"
        onPress={() => navigation.navigate('Details', { message: 'Hello from Home!' })}
      />
    </View>
  );
}
