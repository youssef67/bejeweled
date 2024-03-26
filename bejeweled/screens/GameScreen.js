import React from 'react';
import {StyleSheet, Dimensions, ImageBackground, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import GameGrid from "../components/GameGrid";
import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { PointsProvider } from "../context/PointsContext";

function GameScreen({navigation}) {

    const [isPaused, setIsPaused] = useState(false)

    const handlePause = () => {
        setIsPaused(!isPaused)
    }

    const quit = () => {
        navigation.navigate('WaitingScreen')
    }


    return (
        <PointsProvider>
            <View>
                <ImageBackground source={require("../assets/CloudsBackground.png")} style={styles.backGroundImage}>
                    <View style={styles.containerBtn}>
                        <CustomButton text={"Quitter"} onPress={quit} inContainer={true}/>
                        <CustomButton text={!isPaused ? "Pause" : "Redemarrer"} onPress={handlePause} colorGreen={true} inContainer={true} />
                    </View>
                    <View>
                        <GameGrid style={{marginBottom : 25}} isPaused={isPaused}/>
                    </View>
                    <View style={{marginTop : 25}}>
                        <ProgressBar  isPaused={isPaused}/>
                    </View>
                </ImageBackground>
            </View>
        </PointsProvider>
    )
}

let Window = Dimensions.get("window")
let windowWidth = Window.width
let windowHeight = Window.height

const styles = StyleSheet.create({
    backGroundImage: {
        gap: 10,
        width: windowWidth,
        height: windowHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    containerBtn : {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom : 25,
        gap: 10,
    },   
})

export default GameScreen

