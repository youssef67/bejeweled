import { StyleSheet } from 'react-native';
import React from 'react';
// import GridLayout from './components/GridLayout';
import GameProvider from './context/GameProvider';
import ProgressBar from './components/ProgressBar';
import Connexion from './screens/Connexion';
import Inscription from './screens/Inscription';
import EndGameScreen from './screens/EndGameScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from "./screens/GameScreen";
import { CurrentUserProvider } from './context/CurrentUserContext';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <CurrentUserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
          <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
          <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EndGameScreen" component={EndGameScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrentUserProvider>
  );
}


