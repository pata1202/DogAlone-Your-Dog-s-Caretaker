import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading1 from './dogAlonePage/Loading1'; // loading 1 페이지 가져오기
import Login from './dogAlonePage/Login'; // Login 컴포넌트 가져오기
import smartHome from './dogAlonePage/smartHome'; // 스마트홈 컴포넌트 가져오기
import { View } from 'react-native';

const Stack = createStackNavigator();  // Stack 객체 생성

export default function App() {
  
  return ( // return을 추가하여 JSX를 반환합니다.
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="smartHome" component={smartHome} />
        <Stack.Screen name="Loading" component={Loading1} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );


}