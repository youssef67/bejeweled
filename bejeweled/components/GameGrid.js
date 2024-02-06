import  React, {useEffect, useState} from 'react';
import { View, StyleSheet, Alert, Text} from 'react-native';
import Square from './Square';

function GameGrid() {

    const [gridLayout, setGridLayout] = useState([])
    const [firstRender, setFirstRender] = useState(false)
    const [firstClick, setFirstClick] = useState(null)
    const [secondClick, setSecondClick] = useState(null)
    const [tries, setTries] = useState(20)
    const [score, setScore] = useState(0)
    const [squaresGeneratedPoints, setSquaresGeneratedPoints] = useState([])


    useEffect(() => {
        //Créer un tableau de 64 cases
        if(!firstRender)
            createFirstRenderGridLayout()

        if(secondClick !== null)
            swipeImage()

    }, [secondClick])


    const handlePress = (id, indexType, row, column) => {

        if (firstClick === null) {
            setFirstClick(prevState => {
                return {
                    id : id,
                    indexType : indexType,
                    row : row,
                    column : column
                }
            })
        } else {
            setSecondClick(prevState => {
                return {
                    id : id,
                    indexType : indexType,
                    row : row,
                    column : column
                }
            })
        }
    }


    function swipeImage() {
        console.log("swipeImage")

        let tempGridLayout = [...gridLayout]

        let diffCol = Math.abs(firstClick.column - secondClick.column)
        let diffRow = Math.abs(firstClick.row - secondClick.row)

        if((diffCol === 0 && diffRow === 0) ||  (diffCol > 1 || diffRow > 1)) {
            console.log("erreur dans le mvt, pas case adjacente")
        } else {
            tempGridLayout[firstClick.id].indexType = secondClick.indexType
            tempGridLayout[secondClick.id].indexType = firstClick.indexType

            setTimeout(() => {
                let scoreAfterMove = checkGridLayoutAfterMove(tempGridLayout)
                console.log(tempGridLayout)
                setGridLayout(tempGridLayout)

                // console.log(scoreAfterMove)

                // if (scoreAfterMove > 0) {
                //     let additionalCheck = true
                //     let compteur = 0;
    
                //     while(additionalCheck) {
                //         console.log(compteur)

                //         if (compteur === 0) console.log([...gridLayout])

    
                //         compteur++
    
                //         if (compteur === 5) {
                //             additionalCheck = false;
                //         } 
                //     }
                // }




            }, 800);
        }
    
        setFirstClick(null)
        setSecondClick(null)  
    }

    function checkGridLayoutAfterMove(tempGridLayout) {

        let response = getScoreFromGridLayout(tempGridLayout)
        let scoreAfterMove = response.scoreAllGridLayout
        
        if (scoreAfterMove === 0) {

            // tempGridLayout[firstClick.id].indexType = firstClick.indexType
            // tempGridLayout[secondClick.id].indexType = secondClick.indexType

            setTries(prev => prev - 1)
        } else {
            setScore(prev => prev + scoreAfterMove)
            // On récupére les squares concernées par le score et on supprime les doublons
            let scoredSquaresAfterMove = Array.from(new Map(response.squaresAllGridLayout.map(square => [square.id, square])).values())

            //Pour chaque colonne du tableau
            for (let i = 0; i <= 7; i++) {
                // On selectionne du tableau des squares ayant scorées et qui appartiennent à la colonne i
                let scoredSquaresBelongingCol = scoredSquaresAfterMove.filter(square => square.column === i)
                
                // Si au moins un squares qui a scoré est présent dans cette colonne
                if(scoredSquaresBelongingCol.length > 0) {
                    //On conserve les ids
                    let scoredSquaresId = scoredSquaresBelongingCol.map(square => square.id)
                    //On récupère l'ensemble des ids de la colonnes
                    let getAllIdOfColmum = tempGridLayout.filter(square => square.column === i).map(square => square.id).reverse()

                    //On conserve les infos des squares à garder
                    let allSquaresOfColumnTokeep = tempGridLayout.filter(square => square.column == i && !scoredSquaresId.includes(square.id)).reverse()

                    // On récupère les ids des cases qui n'auront plus d'images
                    let getIdSquareToDelete = getAllIdOfColmum.slice(-scoredSquaresBelongingCol.length)
                    // On récupère les ids des cases dans lesquelles nous allons redefinir l'images
                    let getIdSquareToReset = getAllIdOfColmum.slice(0, 8 - scoredSquaresBelongingCol.length)

                    //On redefini les images en partant du bas
                    for (let j = 0; j < getIdSquareToReset.length ; j++) {
                        tempGridLayout[getIdSquareToReset[j]].indexType = allSquaresOfColumnTokeep[j].indexType
                    }

                    //On défini à null les squares restantes
                    for (let j = 0; j < getIdSquareToDelete.length ; j++) {
                        tempGridLayout[getIdSquareToDelete[j]].indexType = null
                    }
                }
            }
        }

        return scoreAfterMove
    }

    function additionalCheck(tempGridLayout) {

        console.log(tempGridLayout)

        return false
    }

    function createFirstRenderGridLayout() {
        let tempGridLayout = Array.from({ length: 8 * 8 }, (_, index) => {
            
            const row = Math.floor(index / 8)
            const column = index % 8

            return {
                id: index,
                indexType: Math.floor(Math.random() * 7),
                row,
                column
            }
        });


        if(getScoreFromGridLayout(tempGridLayout).scoreAllGridLayout > 0) createFirstRenderGridLayout()
        else {
            setGridLayout(tempGridLayout)
            setFirstRender(true)
        } 
    }

    function getScoreFromGridLayout(gridLayout) {
        let response;
        let scoreAllGridLayout = 0;
        let squaresAllGridLayout = []
        
        for(let i = 0; i <= 7; i++) {

            let arrColumn = gridLayout.filter(square => square.column == i)
            response = getScoreAndSquaresByLine(arrColumn)
            scoreAllGridLayout += response.scoreByLine
            squaresAllGridLayout = [...squaresAllGridLayout, ...response.squaresByLine]

            let arrRow = gridLayout.filter(square => square.row == i)
            response = getScoreAndSquaresByLine(arrRow)
            scoreAllGridLayout += response.scoreByLine
            squaresAllGridLayout = [...squaresAllGridLayout, ...response.squaresByLine]
        }

        return {scoreAllGridLayout : scoreAllGridLayout, squaresAllGridLayout : squaresAllGridLayout}
    }


    function getScoreAndSquaresByLine(arr) {

        // [1, 1, 2, 0, 7, 5, 5, 3] ---> le score est de 0
        // [1, 1, 1, 0, 7, 5, 5, 3] ---> le score est de 50
        // [1, 1, 0, 0, 7, 5, 5, 5] ---> le score est de 50
        // [1, 1, 0, 0, 0, 5, 5, 6] ---> le score est de 50
        // [1, 1, 1, 1, 0, 5, 5, 6] ---> le score est de 150
        // [1, 1, 1, 1, 0, 5, 5, 5] ---> le score est de 200
        // [1, 1, 1, 1, 1, 5, 5, 5] ---> le score est de 200
        //let arrTest = [1, 1, 1, 1, 1, 5, 5, 5]

        let scoreByLine = 0
        let squaresByLine = []
        let count = 1

        arr.forEach((value, index) => {
            currentSquare = value.indexType
            previousSquare = index === 0 ? null : arr[index - 1].indexType

            if(currentSquare === previousSquare) {
                count++

                if (count === 2) {
                    squaresByLine = [...squaresByLine, arr[index - 1], value]
                } else {
                    squaresByLine = [...squaresByLine, value]
                }
            }
            
            if (currentSquare !== previousSquare || index === 7) {
                if(count >= 3) {
                    switch(count) {
                        case 3:
                            scoreByLine += 50
                            break;
                        case 4:
                            scoreByLine += 150
                            break;
                        case 5:
                            scoreByLine += 500
                            break;
                        default:
                            break;
                    }
                }

                if(count === 2) {
                    for (let i = 0; i < 2; i++) {
                        squaresByLine.pop()
                    }
                }

                count = 1
            }       
        });

        return {scoreByLine : scoreByLine, squaresByLine : squaresByLine}
    }

    return (
        <View>
            <View>
                <Text>essais : {score}</Text>
            </View>
            <View>
                <Text>score : {tries}</Text>
            </View>
            {tries === 0 ? (
                <Text>Désolé, vous avez perdu</Text>
            ) : (
                <View style={styles.container}>
                    {gridLayout.map(({ id, indexType, row, column }) => (
                        <View style={styles.item} key={id}>
                            <Square indexType={indexType} onPress={() => handlePress(id, indexType, row, column)}/>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )

    
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      width: 320,
      margin: 'auto', 
    },
    item: {
        width: '12.5%', // Calcul pour s'adapter à 8 colonnes
        aspectRatio: 1, // Garantir que le conteneur de la case est carré
      },
    
  });




export default GameGrid

