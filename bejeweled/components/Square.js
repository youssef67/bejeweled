import {StyleSheet, TouchableOpacity, Image } from 'react-native';
import  React, { useContext, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import SquaresContext from '../context/GameContext';

const images = ["cheval", "poulet", "chien", "oiseau", "pinguin", "cygne", "dragon", "moustique"]

const Square = forwardRef((props, ref) => {

    
    const [requireImage, setRequireImage] = useState(getRequireImage(images[props.randomNumber]))
    const [typeImage, setType] = useState(images[props.randomNumber])

   
    function getRequireImage(item) {
        
        const animaux = {
            cheval : require('../assets/images/cheval.png'),
            chien : require('../assets/images/chien.png'),
            cygne : require('../assets/images/cygne.png'),
            dragon : require('../assets/images/dragon.png'),
            moustique : require('../assets/images/moustique.png'),
            pinguin : require('../assets/images/pinguin.png'),
            oiseau : require('../assets/images/oiseau.png'),
            poulet : require('../assets/images/poulet.png')
        }

    
        switch (item) {
            case 'cheval':
                return animaux.cheval
            case 'chien':
                return animaux.chien
            case 'cygne':
                return animaux.cygne
            case 'dragon':
                return animaux.dragon
            case 'moustique':
                return animaux.moustique
            case 'pinguin':
                return animaux.pinguin
            case 'oiseau':
                return animaux.oiseau
            case 'poulet':
                return animaux.poulet
            default:
                break;
        }
    }

 
    useImperativeHandle(ref, () => ({
        handleExchangeImage(newType, ordre) {

            if(ordre === 'first') {
                console.log("composant square")
                console.log(`le 1er clique (${typeImage}) prends la place du 2eme clique (${newType})`)
                console.log('-----------------')
            }

            

            setRequireImage(getRequireImage(newType))
            setType(newType)
        }
    }))


    function PassInfoGridLayout() {
        console.log(typeImage)
        console.log(requireImage)
        props.onPress(typeImage, ref)
    }

    return (
        <TouchableOpacity style={styles.border} onPress={PassInfoGridLayout} >
            <Image style={{width: 40}} source={requireImage} type={typeImage} ref={ref} id={props.id}/>
        </TouchableOpacity>
     );
})

const styles = StyleSheet.create({
    border : {
        width : 43,
        height : 43,
        borderWidth: 1, // Largeur de la bordure
        borderColor: 'black', // Couleur de la bordure
    }
})

export default Square;