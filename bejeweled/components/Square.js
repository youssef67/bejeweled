import {StyleSheet, TouchableOpacity, Image } from 'react-native';
import  React, {useState, forwardRef, useImperativeHandle } from 'react';
// import SquaresContext from '../context/GameContext';

const images = ["cheval", "poulet", "chien", "oiseau", "pinguin", "cygne", "dragon", "moustique"]

const Square = forwardRef((props, ref) => {

    
    const [requireImage, setRequireImage] = useState(getRequireImage(images[props.randomNumber]))
    const [typeImage, setType] = useState(images[props.randomNumber])
    const [isActiveSquare, setToogleActiveSquare] = useState(false)
    // Variable qui permet de définir ou non la présence d'un style sur une square
    const activeSquare = isActiveSquare ? styles.activeBackground : null

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
        //fonction permettant de définir un nouveau type et une nouvelle image à une square
        handleExchangeImage(newType) {
            setRequireImage(getRequireImage(newType))
            setType(newType)
            setToogleActiveSquare(!isActiveSquare)
        },
        //fonction permettant d'activer ou desactiver le background
        toogleActiveSquare() {
            setToogleActiveSquare(prev => prev === false ? true : false)
        },
        //fonction permettant de récupérer l'ensemble des données d'une square
        getInfoSquare() {
            return {
                type : typeImage,
                ref : ref,
                id : props.id, 
                row : props.row, 
                col : props.col}
        },
        setNewRequireImage(newType) {
            setRequireImage(getRequireImage(newType))
            setType(newType)
        }
    }))

    
    function PassInfoGridLayout() {
        props.onPress(typeImage, ref, props.id)
        setToogleActiveSquare(!isActiveSquare)
    }
    
    return (
        <TouchableOpacity style={[styles.border, activeSquare]} onPress={PassInfoGridLayout} >
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
       
    }, 
    activeBackground : {
        backgroundColor : '#5784BA'
    }
})

export default Square;