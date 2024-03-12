import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ImageBackground, Animated, Alert } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EndGameScreen({ route, navigation }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    const [classement, setClassement] = useState(null)
    const [loading, setLoading] = useState(true)


    const { score } = route.params

    useEffect(() => {

        if (score > currentUser.highscore) {
            fetch('http://209.38.204.73/users/' + currentUser.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    highscore: score,
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) { return Alert.alert(data.message) }
                })
                .then(() => {
                    return fetch('http://209.38.204.73/ranking/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                })
                .then(response => response.json())
                .then(data => {
                    setClassement(data)
                    setLoading(false);
                    setCurrentUser({ ...currentUser, highscore: score })
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération du classement ou de la mise à jour de l'highscore", error);
                });
        } else {
            fetch('http://209.38.204.73/ranking/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setClassement(data)
                    setLoading(false);
                    setCurrentUser({ ...currentUser, highscore: score })
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération du classement", error);
                });
        }
    }, [])

    useEffect(() => {
        fetch('http://209.38.204.73/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: score,
                user: currentUser.id
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi de la partie", error);
            });
    }
        , [])

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Chargement...</Text>
            </View>
        )
    }

    const replay = () => {
        navigation.navigate('GameScreen')
    }

    return (
        <View style={styles.center}>
            <Text>Classement</Text>
            {classement.map((item, index) => (
                <Text key={item.id}>{index + 1} {item.name} {item.highscore}</Text>
            ))}
            <Text>Score: {score}</Text>
            <Button title='Rejouer' onPress={replay} />
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

export default EndGameScreen;