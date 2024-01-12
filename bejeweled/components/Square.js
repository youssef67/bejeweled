import {StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import  React, { useContext, useState, useRef, useEffect } from 'react';
// import SquaresContext from '../context/GameContext';


function Square(props) {

    // State concerné par le Context SquareContext
    // const {movesImage} = useContext(SquaresContext)
    // const {setMovesImage} = useContext(SquaresContext)

    // State lié au composant
    // const [type, setType] = useState(props.type)
    // const [idSquare, setIdSquare] = useState(props.id)

    // State lié au composant au moment du clique
    // ON aliment ce state, si ce composant a été cliqué en deuxiement
    // const [like_uri, setUri] = useState(setRequireImage(props.type))



    // console.log('first ID : ' + movesImage.firstIdSquare)
    // console.log('seconde ID : ' + movesImage.secondeIdSquare)

    //UseRef permet de récupérer le composant ainsi que ses différentes props
    const ref = useRef(null)

    useEffect(() => {

        // if (movesImage.targetClick && movesImage.sourceClick) {

        //     const el = ref.current
        //     console.log(el)
        //     // console.log(props)
        // }


    
        
    }, [])


    function sendDataParent() {

    }

    
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

    // function handleMoveImage() {
        
    //     // Si user n'a pas encore selectionné une 1er image
    //     if (!movesImage.sourceClick) {
    //         // Mise à jour de la première image dans le context
    //         let updatedValueFirst = {
    //             ...movesImage,
    //             sourceTypeImage : props.type,
    //             sourceIdSquare : props.id,
    //             sourceClick : true
    //         }

    //         setMovesImage(updatedValueFirst)

    //         // console.log(movesImage)


    //     // Si User a déjà cliqué sur une 1er image
    //     } else {

    //         //On va vérifié que l'image cliquée, n'est pas égal à la première
    //         if (movesImage.sourceIdSquare === props.id) {
    //             Alert.alert(
    //                 "Erreur",
    //                 "Les deux images doivent être différentes",
    //                 [
    //                     {text: "OK", onPress: () => console.log("OK Pressed")},
    //                 ],
    //                 {cancelable: false}
    //             );
    //         } else {
    //             // Mise à jour de la deuxieme image dans le context
    //             let updatedValueSecond = {
    //                 targetTypeImage : props.type,
    //                 targetIdSquare : props.id,
    //                 targetClick : true
    //             }

    //             setMovesImage(movesImage => ({
    //                 ...movesImage,
    //                 ...updatedValueSecond
    //             }))

    //             // setTargetSquare(
    //             //     {
    //             //         targetImage : movesImage.TypeImage,
    //             //         targetId : movesImage.firstIdSquare
    //             //     }
    //             // )

    //             // console.log(targetSquare)

    //             // Si la deuxieme image est validée, on lance la fonction permettant de modifier les src des 2 images
    //             // changeSquareImage()
    //         }
    //     }
    // }

    return (
        <TouchableOpacity style={styles.border} onPress={handleMoveImage} >
            <Image source={like_uri} imageId={props.id}/>
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