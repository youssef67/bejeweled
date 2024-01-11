import { StyleSheet} from 'react-native';
import React from 'react';
import GridLayout from './components/GridLayout';
import SquaresProvider from './context/SquaresProvider';


export default function App() {
  
  return (
    <SquaresProvider>
      <GridLayout/>
    </SquaresProvider>
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

