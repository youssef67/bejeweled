import { View, StyleSheet, Text, Button, Alert } from 'react-native'
import { useState, useEffect } from 'react';

function ProgressBar() {
    const [points, setPoints] = useState(0)
    const [score, setScore] = useState(0)
    const [progressScore, setProgressScore] = useState(50)
    const [maxScore, setMaxScore] = useState(100)
    const [level, setLevel] = useState(1)

    const handlePoints = () => {
        setPoints(points + 12 * level)
    }

    useEffect(() => {
        let timer = setInterval(() => {
            setProgressScore(progressScore => {
                if (progressScore - 3*level <= 0) {
                    clearInterval(timer)
                    Alert.alert('Game Over', 'Vous avez perdu')
                    return 0
                }
                return progressScore - 3*level})
            console.log('interval')
        }, 1000)
        return () => {
            clearInterval(timer)
            console.log('cleanup interval')
        }
    }, [level])

    useEffect(() => {
        setProgressScore(progressScore => progressScore + points)
        setScore(score + points)

        console.log('render')

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


    return (
        <View style={styles.container}>
            <Text>Score: {score} / niveau : {level}</Text>
            <View style={styles.bar}>
                <Text style={{ position: 'absolute', zIndex: 1, right: '50%' }}>{progressScore} / {maxScore}</Text>
                <View style={[styles.progress, { width: `${progressScore / maxScore * 100}%` }]}>

                </View>
            </View>
            <Button title="Incrementer" onPress={handlePoints} />
        </View >
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
        backgroundColor: 'green',
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
        backgroundColor: 'red',
        borderRadius: 5,

    }
});


export default ProgressBar;