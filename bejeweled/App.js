import { StyleSheet} from 'react-native';
import React from 'react';
import GridLayout from "./components/GridLayout";
import AppProvider from './utils/AppProvider';


export default function App() {
  return (
    <AppProvider>
      <GridLayout/>
    </AppProvider>
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

