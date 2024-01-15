import { StyleSheet, View, Dimensions } from 'react-native';
// import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useEffect, useState, useRef} from 'react';


function GridLayout() {

    const gridRefs = useRef([])
    var index = 0
    var compteur = 0;
    const [firstImageInfo, setFirstImageInfo] = useState(null)
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

        console.log('adjacentSquares : ' + adjacentSquares)

        if(firstImageInfo !== null && firstImageInfo.hasOwnProperty('firstSquareRef') && firstImageInfo.hasOwnProperty('secondeSquareRef')) {


            console.log("composant grid layout")
            console.log(`le 1er clique (${firstImageInfo.firstType}) prend la place du 2eme clique (${firstImageInfo.secondeType})`)

            firstImageInfo.firstSquareRef.current.handleExchangeImage(firstImageInfo.secondeType, 'first');
            firstImageInfo.secondeSquareRef.current.handleExchangeImage(firstImageInfo.firstType, 'second');

            setFirstImageInfo(null)
            console.log(firstImageInfo)


            //Verifier si succession image

            //Si oui /// effacer image

            // repeupler la grille
        }
    
    }, [firstImageInfo])



    function getInfoSquare(type, squareRef, id) {
        console.log(`squareRef = ${squareRef.current}`)




        setFirstImageInfo((prevFirstImageInfo) => {
            console.log(prevFirstImageInfo)
            if(prevFirstImageInfo === null) {
                console.log('fonction test --- if --- value null')

                let upSquare = (id - 8) > 0 ? id - 8 : null
                let downSquare = (id + 8) > 0 ? id - 8 : null
                let leftSquare = (id % 8) !== 0 ? id - 1 : null 
                let rightSquare = ((id + 1) % 8) !== 0 ? id + 1 : null

                let objectAdjacentSquare = [upSquare, downSquare, leftSquare, rightSquare]
                
                setAdjacentSquares(objectAdjacentSquare)
                return {...prevFirstImageInfo, firstType : type, firstSquareRef : squareRef}
            } else {
                return { ...prevFirstImageInfo, secondeType : type, secondeSquareRef : squareRef};
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