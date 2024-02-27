import { View, StyleSheet, Text, Button, Alert } from 'react-native'
import { useState, useEffect, useContext } from 'react';
import { PointsContext } from '../context/PointsContext';

function ProgressBar() {
    const { points, setPoints } = useContext(PointsContext)
    const [score, setScore] = useState(0)
    const [progressScore, setProgressScore] = useState(50)
    const [maxScore, setMaxScore] = useState(100)
    const [level, setLevel] = useState(1)
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timer 
        
        if (!isPaused) {
        timer = setInterval(() => {
            setProgressScore(progressScore => {
                if (progressScore - 3 * level <= 0) {
                    clearInterval(timer)
                    Alert.alert('Game Over', 'Vous avez perdu')
                    return 0
                }
                return progressScore - 3 * level
            })
        }, 1000)
    }
        return () => {
            clearInterval(timer)
        }
    }, [level, isPaused])

    useEffect(() => {
        setProgressScore(progressScore => progressScore + points * level)
        setScore(score + points * level)

        if (progressScore >= maxScore) {
            setMaxScore(maxScore * 2)
            setProgressScore(maxScore + (progressScore - maxScore))
            setLevel(level + 1)
        }
        return () => {
            console.log('cleanup')
            setPoints(0)
        }
    }
        , [points])

    const pauseHandler = () => {
        setIsPaused(true)
        Alert.alert('Pause', 'Voulez-vous continuer ?', [
            { text: 'Oui', onPress: () => setIsPaused(false) },
        ],
        { containerStyle: { width: '80%' } }
        )

    }


    return (
        <>
            <Text>Score: {score} / niveau : {level}</Text>
            <View style={styles.bar}>
                <Text style={{ position: 'absolute', zIndex: 1, right: '50%' }}>{progressScore} / {maxScore}</Text>
                <View style={[styles.progress, { width: `${progressScore / maxScore * 100}%` }]}>
                </View>
            </View>
            <Button title="Pause" onPress={pauseHandler}/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        height: 30,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        paddingHorizontal: 5,
        position: 'relative'
    },
    progress: {
        height: '80%',
        backgroundColor: 'blue',
        borderRadius: 5,

    }
});


export default ProgressBar;