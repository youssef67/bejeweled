import { StyleSheet, View, Alert } from 'react-native';
// import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useEffect, useState, useRef} from 'react';


function GridLayout() {

    const gridRefs = useRef([])
    var index = 0
    const [imagesInfo, setImagesInfo] = useState(null)
    const [adjacentSquares, setAdjacentSquares] = useState(null)

    const initialGridLayout = Array.from({ length : 8}, (_, rowIndex) => (
        <View style={styles.grid} key={rowIndex}>
            {Array.from({ length : 8}, (_, colIndex) => {
                // On va créer une reférence pour chaque cellule et la mettre dans le tableau qui contient l'ensemble des refs
                const squareRef = useRef(null)
                gridRefs.current.push(squareRef)
                return <Square randomNumber={Math.floor(Math.random() * 7)} key={colIndex} ref={squareRef} onPress={getInfoSquare} id={index++}/>
            })}
        </View>
    ));


    const [gridLayout, setGridLayout] = useState(initialGridLayout)

    useEffect(() => {
        if(imagesInfo !== null && 'first' in imagesInfo && 'seconde' in imagesInfo) {

            if (adjacentSquares.includes(imagesInfo.seconde.idImage)) {
                imagesInfo.first.squareRef.current.handleExchangeImage(imagesInfo.seconde.type, 'first');
                imagesInfo.seconde.squareRef.current.handleExchangeImage(imagesInfo.first.type, 'second');
            } else {
                Alert.alert(
                    "Erreur",
                    "Le déplacement en peut se faire qu'avec une case adjacente",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")},
                    ],
                    {cancelable: false}
                );
                
                imagesInfo.first.squareRef.current.disableActiveSquare()
                imagesInfo.seconde.squareRef.current.disableActiveSquare()
            }
        

            setImagesInfo(null)
            console.log(imagesInfo)


        //     //Verifier si succession image

        //     //Si oui /// effacer image

        //     // repeupler la grille
        }
    
    }, [imagesInfo])



    function getInfoSquare(type, squareRef, idImage) {

        setImagesInfo((prevImagesInfo) => {
            if(prevImagesInfo === null) {

                let upSquare = (idImage - 8) > 0 ? idImage - 8 : null
                let downSquare = (idImage + 8) > 0 && (idImage + 8 < 64) ? idImage + 8 : null
                let leftSquare = (idImage % 8) !== 0 ? idImage - 1 : null 
                let rightSquare = ((idImage + 1) % 8) !== 0 ? idImage + 1 : null

                // console.log(`upSquare ${upSquare}`)
                // console.log(`downSquare ${downSquare}`)
                // console.log(`leftSquare ${leftSquare}`)
                // console.log(`rightSquare ${rightSquare}`)
                
                let objectAdjacentSquare = [upSquare, downSquare, leftSquare, rightSquare]
                
                setAdjacentSquares(objectAdjacentSquare)
                return {first : { type : type, squareRef : squareRef }}
            } else {
                return { ...prevImagesInfo, seconde : { type : type, squareRef : squareRef, idImage : idImage }};
            }
        })

    }
    
    return (
        <View style={styles.center}>
            {gridLayout}
        </View>
    )  
}

const styles = StyleSheet.create({
    center : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft : -300
    },
    grid : {
        width : 40,
        flexDirection : 'row',
    }
})

export default GridLayout;