import { StyleSheet, View, Alert, Text } from 'react-native';
// import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useEffect, useState, useRef, createRef} from 'react';


function GridLayout() {

    const gridRefs = useRef([]) // Références des squares

    var index = 0
    // States pour le contrôle de la première génération de grille
    const [isFirstRenderWithZeroScore, setIsFirstRenderWithZeroScore] = useState(false);
    const [scoreFirstRender, setScoreFirstRender] = useState(0);
    const [renderCount, setRenderCount] = useState(0);

    // States pour récupérer les informations de la grille
    const [imagesInfo, setImagesInfo] = useState(null)
    const [adjacentSquares, setAdjacentSquares] = useState(null)
    const [allSquares, setAllSquares] = useState([])
    const [gridLayout, setGridLayout] = useState(null)
    
    // States pour recherche des combinaisons
    const [detailsEachCombination, setDetailsEachCombination] = useState([])
    const [squaresRefOfCombinations, setSquaresRefOfCombinations] = useState([])
    const [allGridLayoutChecked, setAllGridLayoutChecked] = useState(false)

    // Autres States 
    const [movementMade, setMovementMade] = useState(false)
    const [score, setScore] = useState(0);
    const [tries, setTries] = useState(5)
    const [wrongMove, setWrongMove] = useState(false)


    // Initialisation du layout au démarrage
    useEffect(() => {           
            gridRefs.current = Array(64).fill(null).map(() => createRef());
            const initialGridLayout = Array.from({ length : 8}, (_, rowIndex) => (
                <View style={styles.grid} key={rowIndex}>
                    {Array.from({ length : 8}, (_, colIndex) => {
                        return <Square 
                            randomNumber={Math.floor(Math.random() * 7)} 
                            key={colIndex} 
                            ref={gridRefs.current[index]} 
                            onPress={getInfoSquare}
                            id={index++} //Création d'un index pour chaque composant, de 1 à 63 
                            col={colIndex} // Stock son emplacement dans les colonnes
                            row={rowIndex} // Stock son emplacement dans les lignes
                        />
                    })}
                </View>
            ));
    
            setGridLayout(initialGridLayout);
    }, [renderCount])


    useEffect(() => {
        // Chargement des données du GRID, tant que isFirstRenderWithZeroScore est FALSE
        if(!isFirstRenderWithZeroScore) {
            loadAllSquares()
        } 
    }, [gridLayout])


    // Gestion du 1er rendu de la GRID
    useEffect(() => {
        // Si score > 0 ----> incrémentation de renderCount       
        if(scoreFirstRender > 0) setRenderCount(prevCount => prevCount + 1);
    }, [scoreFirstRender]);


    // MAJ du score à zero, permettant les contrôles suivants
    useEffect(() => {
        setScoreFirstRender(0)
    }, [isFirstRenderWithZeroScore])


    // Gestion des clics sur les images
    useEffect(() => {
        // Vérification de l'adjacence et mise à jour des images
        if(imagesInfo !== null && 'first' in imagesInfo && 'seconde' in imagesInfo) {

            // Check si les 2 cases sont adjacentes
            if (adjacentSquares.includes(imagesInfo.seconde.idImage) && imagesInfo.first.idImage !== imagesInfo.seconde.idImage) {

                imagesInfo.first.squareRef.current.handleExchangeImage(imagesInfo.seconde.type);
                imagesInfo.seconde.squareRef.current.handleExchangeImage(imagesInfo.first.type);

                setMovementMade(true)
            } else {
                // Notification en cas de mouvement incorrect
                Alert.alert(
                    "Erreur",
                    "Le déplacement en peut se faire qu'avec une case adjacente",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")},
                    ],
                    {cancelable: false}
                );            
            
                setWrongMove(true)
            }           
        }
    }, [imagesInfo])


    useEffect(() => {
        // Si mvt, chargement des données à jour
        if (movementMade) {
            loadAllSquares()
        }
    }, [movementMade])


    // MAJ de la grille en cas de mvt non scoré
    useEffect(() => {
        if(wrongMove) {
            setTimeout(function() {
                imagesInfo.first.squareRef.current.handleExchangeImage(imagesInfo.first.type)
                imagesInfo.first.squareRef.current.toogleActiveSquare()
    
                imagesInfo.seconde.squareRef.current.handleExchangeImage(imagesInfo.seconde.type)
                imagesInfo.seconde.squareRef.current.toogleActiveSquare()
    
                setImagesInfo(null)
                setAdjacentSquares(null)
                setWrongMove(false)
                setMovementMade(false)
                
                // Décrementation du nb d'essaies
                setTries(prev => prev - 1)
            }, 500)
        }
    }, [wrongMove])


    //Au chargement dela GRID, on lance la fnct searchRowSearch pour vérification
    useEffect(() => {
        if (allSquares.length !== 0) searchCombinations()
    }, [allSquares])
    

    // MAJ visuelle de la GRID
    useEffect(() =>  {
        if (isFirstRenderWithZeroScore && detailsEachCombination.length > 0) {

            // Tableau qui stocke les colonnes ayant des combinaisons
            let columnToUpdate = []
    
            // Références des squares ayant générées des combinaisons
            squaresRefOfCombinations.forEach(square => {
                // On récupére l'index de la colonne 1 seule fois
                if(!columnToUpdate.includes(square.col)) {
                    columnToUpdate.push(square.col) // Récupération de la colonne du square
                } 
            })
    
            // Si mvt a scoré, MAJ de la grille
            if (movementMade) {
                setTimeout(() => {
                    // Boucle sur les colonnes ayant des combinaisons
                    columnToUpdate.forEach(col => {
                        // Cette ensemble d'opération ne concerne qu'une colonne à la fois
    
                        // Récupération des SQUARES qui ne font pas partis de la/des combinaison(s)
                        let arrSquareToKeep = allSquares[0][col].filter(square => !squaresRefOfCombinations.includes(square))
        
                        // Calcul du nombre de cases concerné par la ou les combinaison(s)
                        let nbWhiteSquare = 8 - arrSquareToKeep.length
        
                        //MAJ visuelle de la colonne
                        // Début à l'index 0 (haut de la grille) avec les cases vides d'images
                        for (let index = 0; index < nbWhiteSquare; index++) {
                            allSquares[0][col][index].ref.current.setNewRequireImage("none")
                        }
        
                        // Enchainement avec les cases restantes et pas concernées par la combinaison
                        for (let index = 0; index < arrSquareToKeep.length; index++) {
                            allSquares[0][col][index + nbWhiteSquare].ref.current.setNewRequireImage(arrSquareToKeep[index].type)
                        }  
                    })
                }, 1000);
    
            }
    
            setDetailsEachCombination([])
            setSquaresRefOfCombinations([])
            setMovementMade(false)
            setImagesInfo(null)
            setAdjacentSquares(null)
        }
    }, [score])


    // Vérification du résultat du parsing de la grille
    useEffect(() => {
        if (allGridLayoutChecked) {

            // Remise à false du flag de contrôle
            setAllGridLayoutChecked(false)

            // Si 1er rendu pas ecnore effectué 
            if (!isFirstRenderWithZeroScore) {
                
                if(detailsEachCombination.length > 0) {
                    // Présence de combinaison(s) - RAZ des useStates qui gére le stockage des combinaisons et des références
                    setDetailsEachCombination([])
                    setSquaresRefOfCombinations([])
                    setRenderCount(prevCount => prevCount + 1);
                } else {
                    // Validation du 1er rendu à zéro combinaison
                    setIsFirstRenderWithZeroScore(true)
                }
            }
            // Si 1er rendu effectué 
            else {
                // Remise à false du flag de contrôle
                setAllGridLayoutChecked(false)

                // Si tableau des combinaisons à des valeurs
                if(detailsEachCombination.length > 0) {
                
                    let tempScore = 0;
                
                    detailsEachCombination.forEach(combination => {
                        switch (combination) {
                            case 3:
                                // Dans le cas ou on une combinaison de 3 images sur une ligne ou colonne
                                tempScore += 50
                                break;
                            case 4:
                                // Dans le cas ou on une combinaison de 4 images sur une ligne ou colonne
                                tempScore += 150
                                break;
                            case 5:
                                // Dans le cas ou on une combinaison de 5 images sur une ligne ou colonne
                                tempScore += 500
                                break;
                            case 7:
                                // Dans le cas ou on une combinaison de 4 images et de 3 images sur une ligne ou colonne
                                tempScore += 200
                                break;
                            case 8:
                                // Dans le cas ou on une combinaison de 5 images et 3 images sur une ligne ou colonne
                                tempScore += 550
                                break;
                            default:
                                break;
                        }
                    })
    
                    //console.log("tempScore - " + tempScore)
                        
                    //Mise en place du CSS pour les square concernées par les combinaisons
                    squaresRefOfCombinations.forEach(square => {
                        //Activation du CSS pour mettre en surbrillance les cases concernées
                        square.ref.current.toogleActiveSquare()

                        //Attente d'une seconde pour effacer l'image et le CSS
                        setTimeout(function() {
                            square.ref.current.setNewRequireImage("none")
                            square.ref.current.toogleActiveSquare()
                        }, 800)
                    })

                    //Mise a jour du score
                    setScore(prev => prev + tempScore)
                }
                else {
                    //************************/
                    // Set a garder pour le dev **//
                    // Permet de déplacer sans contraintes les images en remettant a jour les bons useState
                    // setImagesInfo(null)
                    // setAdjacentSquares(null)
                    // setMovementMade(false)

                    // // Si mvt effectué et score == 0
                    setWrongMove(true)
                }   
                
            }
        }
    }, [allGridLayoutChecked])



    // Fonction passée en props à chaque square de la grille permettant de récupérer les infos de la square
    function getInfoSquare(type, squareRef, idImage) {

        // setImageInfo regroupe les données des 2 cases cliquées
        setImagesInfo((prevImagesInfo) => {
            // Si null, alors pas click effectué
            if(prevImagesInfo === null) {

                // Récupération des squares adjacentes
                //           COL 0  COL 1  COL 2  COL 3  COL 4  COL 5 COL 6  COL 7
                //        //---------------------------------------------------------//
                // ROW 0  //| 0   |  1   |  2   |  3   |  4   |  5   |  6   |  7    |//
                // ROW 1  //| 8   |  9   |  10  |  11  |  12  |  13  |  14  |  15   |//
                // ROW 2  //| 16  |  17  |  18  |  19  |  20  |  21  |  22  |  23   |//
                // ROW 3  //| 24  |  25  |  26  |  27  |  28  |  29  |  30  |  31   |//
                // ......
                // ROW 7  //| 56  |  57  |  58  |  59  |  60  |  61  |  62  |  63   |//

                //Récupération des cases adjacentes
                let upSquare = idImage >= 8 ? idImage - 8 : null
                let downSquare = idImage <= 55 ? idImage + 8 : null
                let leftSquare = (idImage % 8) !== 0 ? idImage - 1 : null 
                let rightSquare = ((idImage + 1) % 8) !== 0 ? idImage + 1 : null
                    
                //On conserve ces données pour le deuxieme click
                setAdjacentSquares([upSquare, downSquare, leftSquare, rightSquare])

                //On conserve la référence de la 1er case cliquée
                return {first : { type : type, squareRef : squareRef, idImage : idImage }}
            } else {
                 //On conserve la référence de la 2eme case cliquée
                return { ...prevImagesInfo, seconde : { type : type, squareRef : squareRef, idImage : idImage }};
            }
        })
    }


    // Variable permettant de charger l'état du gridLayout
    const loadAllSquares = () => {

        let squaresData = [
            [[], [], [], [], [], [], [], []], // Tableau de 8 tableau --- chaque tableau représentes 1 colonne (col)
            [[], [], [], [], [], [], [], []] // Tableau de 8 tableau --- chaque tableau représentes 1 ligne (row)
        ]

        if (gridRefs.current[0].current !== null) {
            // Boucle sur chaque square du GRID
            gridRefs.current.forEach((square) => {
    
                // Récupération des données de la square
                let squareTemp = square.current.getInfoSquare()

                // Pour les colonnes
                squaresData[0][squareTemp.col].push(squareTemp)
                // Pour les lignes
                squaresData[1][squareTemp.row].push(squareTemp)
            })
    
            setAllSquares(squaresData)
        }
    }

    // function permettant la recherche de combinaisons sur les colonnes et les lignes
    function searchCombinations() {
        // Recherche dans les colonnes
        searchInColumnOrRow(0)
        // Recherche dans les lignes
        searchInColumnOrRow(1)
        // On indique avoir vérifier l'ensemble de la grid
        setAllGridLayoutChecked(true)
    }

    function searchInColumnOrRow(ArrSquares) {
        let lengthCombinations = []
        let squaresReferences = []

        allSquares[ArrSquares].forEach((line) => {
            let sequence = 0

            line.forEach((value, index) => {
                currentSquare = value
                previousSquare = index === 0 ? null : line[index - 1]
                //Si la case actuelle est égal à la case précédente et pas égal à none
                if(index > 0) {
                    if (currentSquare.type === previousSquare.type && value.type !== "none") {

                        sequence === 0 ? sequence = 2 : sequence++
      
                        // Si fin de tableau - cad, fin de colonne ou fin de ligne
                        if (index === 7) {
                            // Si la sequence est scorable 
                            if (sequence >= 3) {
                                squaresReferences.push(currentSquare) //Ajout de la ref
                                lengthCombinations.push(sequence) // Ajout de la longueur de la combinaison
                            }
                        } else {
                            if (sequence === 2) squaresReferences.push(currentSquare, previousSquare) // Si début de sequence - ajout des deux squares
                            else squaresReferences.push(currentSquare) // Sinon, ajout de la square actuelle
                        }            
                    } else {
                        if (sequence >= 3) {
                            lengthCombinations.push(sequence)
                        }
    
                        // Si sequence de 2 et la troisieme lue est différent
                        // Suppression des 2 dernières entrées ajoutées PRECEDEMENT dans le tableau
                        if(sequence === 2) {
                            for (let i = 0; i < sequence; i++) {
                                squaresReferences.pop()
                            }
                        }

                        sequence = 0
                    }
                }
            })                
        })

        //console.log("Nombre de combinaison trouvé dans les " + colOrRow + " : " + lengthCombinations.length)

        // Si présence de combinaison(s)
        // On conserve le details de chaques combinaison (nb d'images)
        // Les références des images
        if(lengthCombinations.length > 0) {
            setDetailsEachCombination(prev => {
                return [...prev, ...lengthCombinations]
            })

            setSquaresRefOfCombinations(prev => {
                return [...prev, ...squaresReferences]
            })
        }

    }
    
    return (
        // A chaque mise a jour de la variable renderCount // On va re render le composant GridLayout
        <View style={styles.center} key={renderCount}>
            <Text style={{marginLeft : 100, marginBottom : 15}}>Nombre d'essais : {tries}</Text>
            <Text style={{marginLeft : 100, marginBottom : 15}}>score : {score}</Text>

            {tries === 0 ? (
                <Text>Désolé, vous avez perdu</Text>
            ) : (
                gridLayout
            )}
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