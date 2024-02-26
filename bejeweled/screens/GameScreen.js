import  React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ImageBackground, Animated } from 'react-native';
import GameGrid from "../components/GameGrid";
import ProgressBar from '../components/ProgressBar';



const imgBackground = require("../assets/CloudsBackground.png")

function GameScreen() {


    return (
       <ImageBackground source={require("../assets/CloudsBackground.png")} style={styles.backGroundImage}>
            <GameGrid/>
            {/* <ProgressBar/> */}
       </ImageBackground>
    )
}

let Window = Dimensions.get("window")
let windowWidth = Window.width
let windowHeight = Window.height

const styles = StyleSheet.create({
    backGroundImage: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }
})

export default GameScreen

