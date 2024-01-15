import { StyleSheet} from 'react-native';
import React from 'react';
import GridLayout from './components/GridLayout';
import GameProvider from './context/GameProvider';


export default function App() {
  
  return (
    <GameProvider>
      <GridLayout/>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

