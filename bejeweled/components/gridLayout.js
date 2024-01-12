import { StyleSheet, View } from 'react-native';
// import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useContext, useEffect, useState, } from 'react';


const images = ["abeille", "araignee", "chat", "faucon", "hiboux", "lapin", "oiseau", "requin"]

function GridLayout() {

    const [gridLayout, setGridLayout] = useState([[], [], [], [], [], [], [], []])

    


        setGridLayout(() => {
            return gridLayout.map((el) => [...el, "toto"])
        })
    


    return (
        <View style={styles.center}>
            <View style={styles.grid}>
                {/* <Square type={images[Math.floor(Math.random()*images.length)]} id={1} />
                <Square type={images[Math.floor(Math.random()*images.length)]} id={2} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid : {

    }
})

export default GridLayout;