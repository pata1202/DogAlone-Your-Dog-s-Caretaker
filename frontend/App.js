import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading1 from './dogAlonePage/Loading1';
import Login from './dogAlonePage/Login'; 
import SmartHome from './dogAlonePage/smartHome'; 
import MainPage from './dogAlonePage/MainPage';
import ReportPage from './dogAlonePage/ReportPage';
import DocuPage from './dogAlonePage/DocuPage';
import RegisterPage from './dogAlonePage/RegisterPage';
import FoodPage from './dogAlonePage/FoodPage';
import * as WebBrowser from 'expo-web-browser';

const Stack = createStackNavigator();  
WebBrowser.maybeCompleteAuthSession();
export default function App() {
  
  return ( 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="smartHome" component={SmartHome} />
        <Stack.Screen name="ReportPage" component={ReportPage} />
        <Stack.Screen name="DocuPage" component={DocuPage} />
        <Stack.Screen name="FoodPage" component={FoodPage} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );


}