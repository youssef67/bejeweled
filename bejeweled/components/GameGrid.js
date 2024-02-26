import  React, {useEffect, useState} from 'react';
import { View, StyleSheet, Alert, Text, Button} from 'react-native';
import { testEnchainementDeTroisPlusTroisSurColonne, 
        testEnchainementDeTroisEtTroisSurColonneEtLignePlusTrois, 
        testEnchainementDeCinqEtTroisSurColonneEtLignePlusCinqPlusTrois } 
        from "../core/var_test";
import Square from './Square';

function GameGrid() {

    const [gridLayout, setGridLayout] = useState([])
    const [firstRender, setFirstRender] = useState(false)
    const [firstClick, setFirstClick] = useState(null)
    const [secondClick, setSecondClick] = useState(null)
    const [tries, setTries] = useState(5)
    const [score, setScore] = useState(0)

    useEffect(() => {
        if(!firstRender)
            createFirstRenderGridLayout()

        if(secondClick !== null)
            swipeImage()

    }, [secondClick])

    // Création de la grille au démarrage
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

        // Si au 1er rendu, presence de combinaisons - on relance la fonction
        if(getScoreFromGridLayout(tempGridLayout).scoreAllGridLayout > 0) createFirstRenderGridLayout()
        else {

            //*** DEBUT VARIABLES DE TEST ***/
            // setGridLayout(testEnchainementDeTroisPlusTroisSurColonne)
            // setGridLayout(testEnchainementDeTroisEtTroisSurColonneEtLignePlusTrois)
            setGridLayout(testEnchainementDeCinqEtTroisSurColonneEtLignePlusCinqPlusTrois)
            //*** FIN VARIABLES DE TEST ***/

            // setGridLayout(tempGridLayout)
            setFirstRender(true)
        } 
    }

    // Fonction passée en props au composant SQUARE
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


    // Permutation des 2 images selectionnées
    function swipeImage() {

        let tempGridLayout = [...gridLayout]
        // Variables permettant de définir si les 2 cases sont adjacentes
        let diffCol = Math.abs(firstClick.column - secondClick.column)
        let diffRow = Math.abs(firstClick.row - secondClick.row)

        if((diffCol === 0 && diffRow === 0) ||  (diffCol > 1 || diffRow > 1)) {
            console.log("erreur dans le mvt, pas case adjacente")
        } else {
            //Changement d'images
            tempGridLayout[firstClick.id].indexType = secondClick.indexType
            tempGridLayout[secondClick.id].indexType = firstClick.indexType

            setTimeout(() => {
                // Lancement de la vérification dans la grille
                let scoreAfterMove = checkGridLayoutAfterMove(tempGridLayout)
                setScore(prev => prev + scoreAfterMove)

                //MAJ visuelle 
                setGridLayout(tempGridLayout)

                // Si sur le 1er check, l'utilisateur à scoré et par conséquent provoqué une modification de la GRID
                // Lancement des vérifications complémentaires
                if (scoreAfterMove > 0) additionalCheck()
            }, 800);
        }
    
        setFirstClick(null)
        setSecondClick(null)  
    }


    // Vérification de la GRID et la présence de combinaisons
    function checkGridLayoutAfterMove(tempGridLayout, IsAdditionalCheck = false) {

        // Récupération du score présent au travers des différentes combinaisons
        let response = getScoreFromGridLayout(tempGridLayout)
        
        // Si pas de combinaison, revert des image et decrementation des essais
        if (response.scoreAllGridLayout === 0) {

            let getSquarewithNoImage = tempGridLayout.filter(square => square.indexType === null)

            if (getSquarewithNoImage.length > 0 ) {
                getSquarewithNoImage.forEach(square => {
                    tempGridLayout[square.id].indexType = Math.floor(Math.random() * 7)
                });

                setGridLayout(tempGridLayout)

                additionalCheck()
            }

            if (!IsAdditionalCheck) {
                tempGridLayout[firstClick.id].indexType = firstClick.indexType
                tempGridLayout[secondClick.id].indexType = secondClick.indexType
                setTries(prev => prev - 1)
                console.log("erreur, pas de score effectué")
            }
        } else {
            // Suppresion des doublons potentiels sur les Squares ayant générés un score
            let scoredSquaresAfterMove = Array.from(new Map(response.squaresAllGridLayout.map(square => [square.id, square])).values())

            // i represente à chaque itération 1 colonne
            for (let i = 0; i <= 7; i++) {
                // A partir des ttes les squares ayant scorées - On conserve uniquement les cases de la colonne i
                let scoredSquaresBelongingCol = scoredSquaresAfterMove.filter(square => square.column === i)
                
                if (scoredSquaresBelongingCol.length > 0) {
                    // Récupèration UNIQUEMENT des Squares Ids ayant scorés
                    let scoredSquaresId = scoredSquaresBelongingCol.map(square => square.id)
                    // Récupèration de TOUS les ids de la colonne i
                    let getAllIdOfColmum = tempGridLayout.filter(square => square.column === i).map(square => square.id).reverse()

                    // Récupèration des Squares (+ données) de la colonne et non présente dans les Squares ayant scoré EN INVERSANT l'ordre
                    // Le reverse() nous permettrant d'avoir en position [0], la case la plus basse dans le GRID 
                    let allSquaresOfColumnTokeep = tempGridLayout.filter(square => square.column == i && !scoredSquaresId.includes(square.id)).reverse()

                    // Spécifique aux contrôles complémentaires
                    if (IsAdditionalCheck) {
                        // Récupération des POTENTIELLES cases vides
                        let oldScoredSquareId = allSquaresOfColumnTokeep.filter(square => square.indexType === null)
                        // MAJ du tableau permettant de connaitre le NB de cases à vider
                        scoredSquaresId = [...oldScoredSquareId, ...scoredSquaresId]
                        // Récupération des cases à GARDER
                        allSquaresOfColumnTokeep = allSquaresOfColumnTokeep.filter(square => square.indexType !== null)
                    } 

                    // On récupère les ids des cases qui n'auront plus d'images
                    // On démarre de la FIN du tableau
                    let getIdSquareToDelete = getAllIdOfColmum.slice(-scoredSquaresId.length)
                    // On récupère les ids des cases dans lesquelles nous allons redefinir l'images
                    // On démarre en DEBUT de tableau
                    let getIdSquareToReset = getAllIdOfColmum.slice(0, 8 - scoredSquaresId.length)

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

        return response.scoreAllGridLayout
    }

    // Vérification complémentaire après MAJ de la Grid
    function additionalCheck() {
        let tempGridLayout = [...gridLayout]    

        setTimeout(() => {
            let additionalScore = checkGridLayoutAfterMove(tempGridLayout, true)

            setGridLayout(tempGridLayout)

            // Après MAJ, on relance une recherche de combinaison 
            // Si TRUE, on re call la fonction
            if (additionalScore > 0) {
                setScore(prev => prev + additionalScore)
                additionalCheck()
            } 
                
        }, 800);
    }


    function getScoreFromGridLayout(gridLayout) {
        let response;
        let scoreAllGridLayout = 0;
        let squaresAllGridLayout = []
        
        for(let i = 0; i <= 7; i++) {
            // Récupération des Squares de la colonne i
            let arrColumn = gridLayout.filter(square => square.column == i)
            response = getScoreAndSquaresByLine(arrColumn)
            scoreAllGridLayout += response.scoreByLine
            squaresAllGridLayout = [...squaresAllGridLayout, ...response.squaresByLine]

            // Récupération des Squares de la row i
            let arrRow = gridLayout.filter(square => square.row == i)
            response = getScoreAndSquaresByLine(arrRow)
            scoreAllGridLayout += response.scoreByLine
            squaresAllGridLayout = [...squaresAllGridLayout, ...response.squaresByLine]
        }

        return {scoreAllGridLayout : scoreAllGridLayout, squaresAllGridLayout : squaresAllGridLayout}
    }


    function getScoreAndSquaresByLine(arr) {
        // Si lancement de test - modifier arr par arrTest
        //let arrTest = scoreCinquanteDebut
        let scoreByLine = 0
        let squaresByLine = []
        let count = 1

        arr.forEach((value, index) => {
            currentSquare = value.indexType
            previousSquare = index === 0 ? null : arr[index - 1].indexType

            if(currentSquare === previousSquare && currentSquare !== null) {
                count++

                if (count === 2) squaresByLine = [...squaresByLine, arr[index - 1], value]
                else squaresByLine = [...squaresByLine, value]
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

    function hint() {
        let tempGridLayout = gridLayout
        console.log(tempGridLayout)


        for (let i = 0; i < 1; i++) {

            let right, left, down, up
            currentSquare = tempGridLayout[i]

            console.log("carre en cours")
            console.log(currentSquare)

            down = gridLayout.filter(s => s.column == gridLayout[i].column && s.row == gridLayout[i].row + 1)[0] ?? null
            up = gridLayout.filter(s => s.column == gridLayout[i].column && s.row == gridLayout[i].row - 1)[0] ?? null
            right = gridLayout.filter(s => s.column == gridLayout[i].column + 1 && s.row == gridLayout[i].row)[0] ?? null
            left = gridLayout.filter(s => s.column == gridLayout[i].column - 1 && s.row == gridLayout[i].row)[0] ?? null

            let adjacentsSquares = [up, down, right, left].filter(e => e !== null)

            for (let j = 0; j < adjacentsSquares.length; j++) {

                if (tempGridLayout[currentSquare.id].indexType != adjacentsSquares[j].indexType) {
                    console.log("swipe image")
                    console.log("currentSquare.id " + currentSquare.id + " et type " + currentSquare.indexType)
                    console.log("adjacentsSquares[j].id " + adjacentsSquares[j].id + " et type " + adjacentsSquares[j].indexType)

                    let indexTypeCurrentSquare = currentSquare.indexType
                    let indexTypeAdjacentSquare = adjacentsSquares[j].indexType

                    tempGridLayout[currentSquare.id].indexType = indexTypeAdjacentSquare
                    tempGridLayout[adjacentsSquares[j].id].indexType = indexTypeCurrentSquare


                    let response = getScoreFromGridLayout(tempGridLayout)

                    console.log(response)
                }
                console.log(tempGridLayout)

            }

            console.log(adjacentsSquares)

     

        }
    }


    return (
        <View>
            <View style={{ marginBottom: 10 }}>
                <Button
                title="hint"
                onPress={() => hint()}
            />
            </View>
            <View>
            <Button
                title="reset le score"
                onPress={() => setScore(0)}
            />
                <Text>score effectué sur ce tour : {score}</Text>
            </View>
            <View>
                <Text>essais : {tries}</Text>
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