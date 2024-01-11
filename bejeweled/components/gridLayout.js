import { StyleSheet, View } from 'react-native';
import AppContext from '../utils/MoveImageContext';
import Square from './Square';
import  React, { useContext } from 'react';

const images = ["abeille", "araignee", "chat", "faucon", "hiboux", "lapin", "oiseau", "requin"]

function GridLayout() {
    const { data, setData } = useContext(AppContext)

    function test() {
        console.log("parent")
        
    }

    return (
        <View style={styles.center}>
            <View style={styles.grid}>
                <Square animal={images[Math.floor(Math.random()*images.length)]} id={1} onPress={test}/>
                <Square animal={images[Math.floor(Math.random()*images.length)]} id={2} onPress={test}/>
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