import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ImageBackground, Animated, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function WaitingScreen({ navigation }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    
    const replay = () => {
        navigation.navigate('GameScreen')
    }

    return (
        <View style={styles.center}>
            <Image style={styles.image} source= {require("../assets/illustrations/marioAll2.png")} />
            <Image source= {require("../assets/policeMarioImage/marioCrush.png")} />
            <Text style={{fontFamily: "mario"}}>Bienvenue {currentUser.name} {currentUser.surname} !!!</Text>
            <CustomButton text='Jouer' onPress={replay} />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
     image: {
        width: "100%",
        height: "25%"
    }
})

export default WaitingScreen;