import { View, StyleSheet, Text } from 'react-native'
import { useState, useEffect, useContext, useRef } from 'react';
import { PointsContext } from '../context/PointsContext';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { CurrentUserContext } from '../context/CurrentUserContext';


function ProgressBar({ isPaused }) {

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { points, setPoints } = useContext(PointsContext)
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    const [score, setScore] = useState(0)
    const [progressScore, setProgressScore] = useState(50)
    const [maxScore, setMaxScore] = useState(100)
    const [level, setLevel] = useState(1)
    const [gameOver, setGameOver] = useState(false)
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;

    useEffect(() => {
        let timer

        if (!isPaused) {
            timer = setInterval(() => {
                setProgressScore(progressScore => {
                    if (progressScore - 3 * level <= 0) {
                        setGameOver(true);
                        clearInterval(timer)
                        return 0
                    }
                    return progressScore - 3 * level
                })
            }, 1000)
        }
        return () => {
            clearInterval(timer)
        }
    }, [level, isPaused, gameOver])

    useEffect(() => {
        if (isFocused) {
            // Réinitialisez les variables ici
            setGameOver(false);
            setScore(0);
            setProgressScore(50);
            setMaxScore(100);
            setLevel(1);

        }
    }, [isFocused]);

    useEffect(() => {
        setProgressScore(progressScore => progressScore + points * level)
        setScore(score + points * level)

        setCurrentUser(prevCurrent => ({
            ...prevCurrent,
            score : score
        }))

        if (progressScore >= maxScore) {

            setMaxScore(maxScore * 2)
            setProgressScore(maxScore + (progressScore - maxScore))
            setLevel(level + 1)

        }
        return () => {
            setPoints(0)
        }
    }, [points])

    useEffect(() => {
        if (gameOver) {
            navigation.navigate('EndGameScreen', { score: score }); 
        }
    }, [gameOver]);

    return (
        <>
            <Text style={{fontFamily: "mario"}}>Score: {score} / niveau : {level}</Text>
            <View style={styles.bar}>
                <Text style={{ position: 'absolute', zIndex: 1, right: '50%', fontFamily: "mario" }}>{progressScore} / {maxScore}</Text>
                <View style={[styles.progress, { width: `${progressScore / maxScore * 100 > 100 ? 100 : progressScore / maxScore * 100}%` }]}>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        height: 30,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 5,
        position: 'relative'
    },
    progress: {
        height: '80%',
        backgroundColor: '#39b449',
        borderRadius: 5,

    }
});


export default ProgressBar;