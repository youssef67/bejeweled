import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ImageBackground, Animated, Alert } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function WaitingScreen({ route, navigation }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    
    console.log(currentUser)
    const replay = () => {
        navigation.navigate('GameScreen')
    }

    return (
        <View style={styles.center}>
            <Text>Welcome {currentUser.name} {currentUser.surname} !!!</Text>
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