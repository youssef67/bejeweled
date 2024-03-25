import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ImageBackground, Animated, Alert } from 'react-native';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function WaitingScreen({ navigation }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    
    const replay = () => {
        navigation.navigate('GameScreen')
    }

    return (
        <View style={styles.center}>
            <Text>Bienvenue {currentUser.name} {currentUser.surname} !!!</Text>
            <Button title='Jouer' onPress={replay} />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    }
})

export default WaitingScreen;