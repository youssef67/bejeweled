import  React, {useEffect, useState, useContext} from 'react';
import { View, StyleSheet, Alert, Text, Button} from 'react-native';
import { testEnchainementDeTroisPlusTroisSurColonne, 
        testEnchainementDeTroisEtTroisSurColonneEtLignePlusTrois, 
        testEnchainementDeCinqEtTroisSurColonneEtLignePlusCinqPlusTrois,
        testHint,
        testHintSansResultat } 
        from "../core/var_test";
import Square from './Square';
import { PointsContext} from '../context/PointsContext';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { CurrentUserContext } from '../context/CurrentUserContext';



function GameGrid({isPaused}) {

    const isFocused = useIsFocused();
    const navigation = useNavigation();


    const [gridLayout, setGridLayout] = useState([])
    const [blinkStyle, setBlinkStyle] = useState({})
    const [isDisabled, setIsDisabled] = useState(null)
    const [highlightedSquares, setHighlightedSquares] = useState([])
    const [errorSquare, setErrorSquare] = useState([])
    const [errorStyle, setErrorStyle] = useState(null)

    const [firstRender, setFirstRender] = useState(false)
    const [firstClick, setFirstClick] = useState(null)
    const [secondClick, setSecondClick] = useState(null)
    const [hintAvailable, setHintAvailable] = useState(true)
    const [tries, setTries] = useState(2)
    const {points, setPoints} = useContext(PointsContext);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  
    useEffect(() => {
        console.log("call createFirstRenderGridLayout")
        if(!firstRender)
            createFirstRenderGridLayout()

        if(secondClick !== null)
            swipeImage()

    }, [secondClick])

    useEffect(() => {
        if (isFocused) {
            console.log("isFocused")
            // Réinitialisez les variables ici
            setTries(2)
            setCurrentUser(prevCurrent => ({
                ...prevCurrent,
                score : 0
            }))

            createFirstRenderGridLayout()

        }
    }, [isFocused])


    useEffect(() => {
        if (isPaused) setIsDisabled(true)
        else setIsDisabled(false)


        if (highlightedSquares.length > 0) {
            let blinkCount = 0;
            const interval = setInterval(() => {

                setBlinkStyle(prevStyle => ({
                    ...prevStyle,
                    borderWidth : prevStyle.borderWidth === 1 ? 2 : 1,
                    borderColor: prevStyle.borderColor === 'gray' ? 'red' : 'gray'
                }))
                blinkCount += 1

                if(blinkCount === 8) {
                    clearInterval(interval)

                    setBlinkStyle({})
                    setHighlightedSquares([])
                }
            }, 500)

            return () => clearInterval(interval)
        }


        if (errorSquare.length > 0) {
            setErrorStyle(
                {backgroundColor : "#dc143c"}
            )

            setTimeout(() => {
                setErrorSquare([])
                setErrorStyle({})
            }, 500);
        }
        
    }, [isPaused, highlightedSquares, errorSquare])


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
            console.log("tempGridLayout mise en place")
            //*** DEBUT VARIABLES DE TEST ***/
            // setGridLayout(testEnchainementDeTroisPlusTroisSurColonne)
            // setGridLayout(testEnchainementDeTroisEtTroisSurColonneEtLignePlusTrois)
            setGridLayout(testEnchainementDeCinqEtTroisSurColonneEtLignePlusCinqPlusTrois)
            // setGridLayout(testHintSansResultat)
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
                setPoints(prev => prev + scoreAfterMove)

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
                let triesUpdate = tries - 1;

                if (triesUpdate < 0) {
                    navigation.navigate('EndGameScreen', { score: currentUser.score }); 
                }else {
                    setErrorSquare([firstClick.id, secondClick.id])
                    console.log("erreur, pas de score effectué")
                }
                
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
                setPoints(prev => prev + additionalScore)
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

    // Fonction permettant de mettre en evidence une combinaison
    function hint() {
        setTries(prev => prev - 1)
        let triesUpdate = tries - 1;

        if (triesUpdate > - 1) {
            let tempGridLayout = gridLayout.map(e => Array.isArray(e) ? [...e] : e)
            let allCombination = []
            let combinationFound = false;
                   
            // parcours l'ensemble des cases de la grille
            for (let i = 0; i < tempGridLayout.length; i++) {
    
                // Si pas de combinaison encore trouvé, on vérifie la case scopée
                if (!combinationFound) {
                    let right, left, down, up
                    currentSquareId = tempGridLayout[i].id
                    let combination = []
        
                    // On récupére les cases adjacentes à la case en cours de vérification
                    down = tempGridLayout.filter(s => s.column == gridLayout[i].column && s.row == gridLayout[i].row + 1)[0] ?? null
                    up = tempGridLayout.filter(s => s.column == gridLayout[i].column && s.row == gridLayout[i].row - 1)[0] ?? null
                    right = tempGridLayout.filter(s => s.column == gridLayout[i].column + 1 && s.row == gridLayout[i].row)[0] ?? null
                    left = tempGridLayout.filter(s => s.column == gridLayout[i].column - 1 && s.row == gridLayout[i].row)[0] ?? null
        
                    // On filtre pour garder uniquement les cases valides
                    let adjacentsSquares = [up, down, right, left].filter(e => e !== null)
    
                    // loop sur les cases adjacentes
                    for (let j = 0; j < adjacentsSquares.length; j++) {
        
                        // Si case en cours de vérif est identique à la case adjacentes ---> PAS DE VERIFCATION
                        // Si elle est deja une combinaison précedement vérifié ---> PAS DE VERIFCATION
                        if (tempGridLayout[currentSquareId].indexType != adjacentsSquares[j].indexType && !containsArray(allCombination, [currentSquareId, adjacentsSquares[j].id])) {
        
                            // On récupére le type d'images des 2 cases
                            let indexTypeCurrentSquare = tempGridLayout[currentSquareId].indexType
                            let indexTypeAdjacentSquare = adjacentsSquares[j].indexType
        
                            // Swipe d'image
                            tempGridLayout[currentSquareId].indexType = indexTypeAdjacentSquare
                            tempGridLayout[adjacentsSquares[j].id].indexType = indexTypeCurrentSquare
        
                            // Si le swipe génere un score - activation du CSS + set combinationFound à TRUE
                            if (getScoreFromGridLayout(tempGridLayout).scoreAllGridLayout > 0) {
                                setHighlightedSquares([currentSquareId, adjacentsSquares[j].id])
                                combinationFound = true;
                            }
        
                            // Swipe d'image pour un retour à l'état initial de la grille
                            tempGridLayout[currentSquareId].indexType = indexTypeCurrentSquare
                            tempGridLayout[adjacentsSquares[j].id].indexType = indexTypeAdjacentSquare
        
                            // Si combination trouvé / stoppe la boucle
                            if (combinationFound) break
                        }
        
                        // Ajout des combinaisons vérifiées
                        combination.push(currentSquareId, adjacentsSquares[j].id)
                        allCombination.push([...combination])
        
                        let reverseCombination = [...combination].reverse()
                        allCombination.push(reverseCombination)
        
                        combination = []
                    }
                } else {
                    break
                }
            }
    
            // Si aucun combinaison, on relance la génération de la grille
            if (!combinationFound) {
                createFirstRenderGridLayout()
                console.log("pas de combinaison")
            } 
        } else {

            if (triesUpdate < 0) {
                setHintAvailable(false)

                setTimeout(() => {
                    setHintAvailable(true)
                }, 2000);
            }

        }
        
    }
    

    function containsArray(haystack, needle) {
        return haystack.some(innerArray =>
            innerArray.length === needle.length && innerArray.every((value, index) => value === needle[index])
        );
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
                <Text>essais : {tries < 0 ? 0 : tries}</Text>
                {!hintAvailable ? <Text>Plus d'essais disponibles</Text> : null}
            </View>
            <View style={styles.container}>
                {gridLayout.map(({ id, indexType, row, column }) => (
                    <View style={styles.item} key={id}>
                        <Square 
                            indexType={indexType} 
                            onPress={() => handlePress(id, indexType, row, column)}
                            customStyle={highlightedSquares.includes(id) ? blinkStyle : {}}
                            isDisabled={isDisabled}
                            errorMove={errorSquare.includes(id) ? errorStyle : {}}     
                        />
                    </View>
                ))}
            </View>
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