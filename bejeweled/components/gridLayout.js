import { StyleSheet, View } from 'react-native';
import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useContext} from 'react';


const images = ["abeille", "araignee", "chat", "faucon", "hiboux", "lapin", "oiseau", "requin"]

function GridLayout() {

    const {movesImage} = useContext(SquaresContext)
    
    console.log(movesImage)

    return (
        <View style={styles.center}>
            <View style={styles.grid}>
                <Square animal={images[Math.floor(Math.random()*images.length)]} id={1} />
                <Square animal={images[Math.floor(Math.random()*images.length)]} id={2} />
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