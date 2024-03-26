import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function WaitingScreen({ navigation }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    
    const replay = () => {
        navigation.navigate('GameScreen')
    }

    const disconnect = () => {
        setCurrentUser({})
        navigation.navigate('Connexion')
    }

    const highScore = () => {
        navigation.navigate('EndGameScreen', { score: currentUser.score, show : true })
    }

    return (
        <View style={styles.center}>
            <Image style={styles.image} source= {require("../assets/illustrations/marioAll2.png")} />
            <Image source= {require("../assets/policeMarioImage/marioCrush.png")} />
            <Text style={{fontFamily: "mario"}}>Bienvenue {currentUser.name} {currentUser.surname} !!!</Text>
            <CustomButton text='Jouer' onPress={replay} colorGreen={true} />
            <CustomButton text='Liste des scores' onPress={highScore} colorGreen={true} />
            <CustomButton text='Se deconnecter' onPress={disconnect} />
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