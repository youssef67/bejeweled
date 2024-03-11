import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ImageBackground, Animated, Alert } from 'react-native';
import GameGrid from "../components/GameGrid";
import { useState, useContext } from 'react';
import ProgressBar from '../components/ProgressBar';
import { PointsProvider } from "../context/PointsContext";
import { CurrentUserContext } from '../context/CurrentUserContext';


const imgBackground = require("../assets/CloudsBackground.png")

function GameScreen() {

    const [isPaused, setIsPaused] = useState(false)
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

    const handlePause = () => {
        setIsPaused(!isPaused)
    }

    return (
        <PointsProvider>
            <ImageBackground source={require("../assets/CloudsBackground.png")} style={styles.backGroundImage}>
                <Button title={!isPaused ? "Pause" : "Redemarrer"} onPress={handlePause} />
                <GameGrid isPaused = {isPaused}/>
                <ProgressBar isPaused={isPaused} />
            </ImageBackground>
        </PointsProvider>
    )
}

let Window = Dimensions.get("window")
let windowWidth = Window.width
let windowHeight = Window.height

const styles = StyleSheet.create({
    backGroundImage: {
        flex: 1,
        gap: 10,
        width: windowWidth,
        height: windowHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default GameScreen

