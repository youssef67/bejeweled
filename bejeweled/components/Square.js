import {StyleSheet, TouchableOpacity, Image } from 'react-native';
import  React, { useContext } from 'react';
import SquaresContext from '../context/SquaresContext';


function Square(props) {

    const {movesImage} = useContext(SquaresContext)
    const {setmovesImage} = useContext(SquaresContext)
    console.log(movesImage)

    function setRequireImage(item) {
        
        const animaux = {
            abeille : require('../assets/images/abeille.png'),
            araignee : require('../assets/images/araignee.png'),
            chat : require('../assets/images/chat.png'),
            faucon : require('../assets/images/faucon.png'),
            hibou : require('../assets/images/hibou.png'),
            lapin : require('../assets/images/lapin.png'),
            oiseau : require('../assets/images/oiseau.png'),
            requin : require('../assets/images/requin.png')
        }

    
        switch (item) {
            case 'abeille':
                return animaux.abeille
            case 'araignee':
                return animaux.araignee
            case 'chat':
                return animaux.chat
            case 'faucon':
                return animaux.faucon
            case 'hiboux':
                return animaux.hibou
            case 'lapin':
                return animaux.lapin
            case 'oiseau':
                return animaux.oiseau
            case 'requin':
                return animaux.requin
            default:
                break;
        }
    }

    function handleMoveImage() {
        
        // Si user n'a pas encore selectionné une 1er image
        if (!movesImage.firstClick) {
            let updatedValue = {
                firstTypeAnimal : props.animal,
                firstIdSquare : props.id,
                firstClick : true
            }

            setmovesImage(movesImage => ({
                ...movesImage,
                ...updatedValue
            }))

        // Si User a déjà cliqué sur une 1er image, on enregistre la deuxieme
        } else {
            let updatedValue = {
                secondTypeAnimal : props.animal,
                secondeIdSquare : props.id,
                secondClick : true
            }

            setmovesImage(movesImage => ({
                ...movesImage,
                ...updatedValue
            }))
        }
    }

    return (
        <TouchableOpacity style={styles.border} onPress={handleMoveImage}>
            <Image source={setRequireImage(props.animal)} />
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    border : {
        width : 50,
        height : 50,
        borderWidth: 1, // Largeur de la bordure
        borderColor: 'black', // Couleur de la bordure
    }
})

export default Square;