import { StyleSheet, View, Alert, Text } from 'react-native';
// import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useEffect, useState, useRef, createRef} from 'react';


function GridLayout() {

    // On initialise un tableau nous permettant de stocker les références des squares
    const gridRefs = useRef([])
    // On initialise un tableau nous permettant de stocker les données nécessaire à la construction du tableau de vérification

    var index = 0
    const [imagesInfo, setImagesInfo] = useState(null)
    const [adjacentSquares, setAdjacentSquares] = useState(null)
    const [allSquares, setAllSquares] = useState([])
    const [gridLayout, setGridLayout] = useState(null)

    // UseState utiles pour la 1er génération de grille
    const [isFirstRenderWithZeroScore, setIsFirstRenderWithZeroScore] = useState(false);
    const [scoreFirstRender, setScoreFirstRender] = useState(0);
    const [renderCount, setRenderCount] = useState(0);

    //
    const [lastMove, setLastMove] = useState(null);
 


    const [score, setScore] = useState(0);
    const [combinaisonScoreRef, setCombinaisonScoreRef] = useState()

    const [tries, setTries] = useState(5)
    const [wrongMove, setWrongMove] = useState(false)



    //***************** USE EFFETC  **************************/

    //UseEffect appelé au démarrage pour l'initialisation du layout
    useEffect(() => {          
            //A chaque rendu, on s'assure que le score est bien de 0 
            // setScoreFirstRender(0)
           
            gridRefs.current = Array(64).fill(null).map(() => createRef());
            // setIsrendered(true)
            const initialGridLayout = Array.from({ length : 8}, (_, rowIndex) => (
                <View style={styles.grid} key={rowIndex}>
                    {Array.from({ length : 8}, (_, colIndex) => {
                        // On va créer une reférence pour chaque cellule et la mettre dans le tableau qui contient l'ensemble des refs
                        //La ref va nous permette de manipuler uniquement la square concernée
                        return <Square 
                            randomNumber={Math.floor(Math.random() * 7)} 
                            key={colIndex} 
                            ref={gridRefs.current[index]} 
                            onPress={getInfoSquare}
                            //Création d'un index pour chaque composant, de 1 à 63 
                            id={index++}
                            //Création de l'index par colonne et par ligne
                            col={colIndex}
                            row={rowIndex}
                        />
                    })}
                </View>
            ));
    
            setGridLayout(initialGridLayout);
    }, [renderCount])


    // Ce useEffect est appelé lors de chaque click sur une image
    useEffect(() => {
        //A l'issue du deuxième click, on va procéder au changement d'images
        if(imagesInfo !== null && 'first' in imagesInfo && 'seconde' in imagesInfo) {

            //On vérifie que la 2eme case et adjacente à la 1er
            if (adjacentSquares.includes(imagesInfo.seconde.idImage) && imagesInfo.first.idImage !== imagesInfo.seconde.idImage) {

                //On met a jour l'image de la case et UNIQUEMENT l'image
                imagesInfo.first.squareRef.current.handleExchangeImage(imagesInfo.seconde.type);
                imagesInfo.seconde.squareRef.current.handleExchangeImage(imagesInfo.first.type);

                //On construit le tableau nous permettant de vérifier la succession d'image
                loadAllSquares()

                //
                setLastMove(imagesInfo)

                // Après avoir effectué le changement d'images, on remet à zéro, la variable imagesInfo
                setImagesInfo(null)  
            //Si non, on le notifie à l'utilisateur
            } else {
                Alert.alert(
                    "Erreur",
                    "Le déplacement en peut se faire qu'avec une case adjacente",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")},
                    ],
                    {cancelable: false}
                );            
            
                // On indique au programme que le mouvement est incorrect
                setWrongMove(true)
            }           
        }
    }, [imagesInfo])


    // UseEffect qui detecte un changment d'état de la variable WrongMove
    useEffect(() => {

        if(wrongMove) {
            // On désactive le css présent sur les 2 images
            imagesInfo.first.squareRef.current.toogleActiveSquare()
            imagesInfo.seconde.squareRef.current.toogleActiveSquare()

            // Mauvais déplacement, on redefini la variabe qui récupère les 2 images à false
            // On passe à false la variable wrongMove
            setImagesInfo(null)
            setWrongMove(false)
            
            setTries(prev => prev - 1)
        }
    }, [wrongMove])


    // useEffect(() => {
    //     console.log(tries)
    //     if (tries === 0) {
    //         Alert.alert(
    //             "Désolé",
    //             "Vous avez perdu",
    //             [
    //                 {text: "OK", onPress: () => console.log("OK Pressed")},
    //             ],
    //             {cancelable: false}
    //         );         
    //     }
    // }, [tries])


    //On effectue un re-render pour que les références des Square soient présents dans la variable gridRefs
    useEffect(() => {
        loadAllSquares()
    }, [gridLayout])


    //A chaque changement de l'état de la variable allSquares, on lance la fonction searchRowSearch pour vérification
    useEffect(() => {
        //Si allSquare a des données, cela veut dire qu'on a fait un mouvement sur la grille
        // On lance la recherche d'images successives
        if (allSquares.length !== 0) searchRowImages()

    // On indique allSquare ref pour déclenchcer ce hook à la modification de ce state
    }, [allSquares])
    
    
    // Ce UseEffect est destiné uniquement au score du 1er rendu
    // IL est appelé, dès que la variable scoreFirstRender est modifié par conséquent uniquement au lancement de la gridLayout
    useEffect(() => {       
        if(scoreFirstRender > 0) {
            setRenderCount(prevCount => prevCount + 1);
        }
    }, [scoreFirstRender]);


    // Ce use effect est destiné à mettre a jour la variable IsFirstRenderWithZeroScore rapidement
    useEffect(() => {
        setScoreFirstRender(0)
    }, [isFirstRenderWithZeroScore])


    useEffect(() =>  {
        console.log("useEffect score")
        console.log("score - " + score)

        let columnToUpdate = []


        if (combinaisonScoreRef !== undefined) {
            combinaisonScoreRef.forEach(square => {

                if(!columnToUpdate.includes(square.col))
                    columnToUpdate.push(square.col)

                console.log("square colonne " + square.col)
                console.log("square ligne " + square.row)
            })
        }

        console.log("columnToUpdate : " + columnToUpdate)

        if (allSquares.length > 0) {

            columnToUpdate.forEach(col => {
                
            })
            console.log("allSqaures colonne " + allSquares[0][0])
        }
    }, [score])


    function getInfoSquare(type, squareRef, idImage) {

        setImagesInfo((prevImagesInfo) => {
            if(prevImagesInfo === null) {

                // Logique permettant d'obtenir les cases adjacentes de la 1er case cliquée
                let upSquare = (idImage - 8) >= 0 ? idImage - 8 : null
                let downSquare = (idImage + 8) > 0 && (idImage + 8 < 64) ? idImage + 8 : null
                let leftSquare = (idImage % 8) !== 0 ? idImage - 1 : null 
                let rightSquare = ((idImage + 1) % 8) !== 0 ? idImage + 1 : null
                
                
                //On conserve ces données pour le deuxieme click
                let objectAdjacentSquare = [upSquare, downSquare, leftSquare, rightSquare]
                setAdjacentSquares(objectAdjacentSquare)

                //On conserve la référence de la 1er case cliquée
                return {first : { type : type, squareRef : squareRef, idImage : idImage }}
            } else {

                 //On conserve la référence de la 2eme case cliquée
                return { ...prevImagesInfo, seconde : { type : type, squareRef : squareRef, idImage : idImage }};
            }
        })
    }


    //On va mettre en place un tableau qui va permettre de vérifier chaque colonne et chaque ligne du gridLayout de façon indépendante
    const loadAllSquares = () => {
        //NombrloadAllSquares de col : 8 (index 0 à 7)
        //Nombre de row : 8 (index 0 à 7)
        //Création de 2 tableaux
        //1er tableau sera pour l'ensemble des colonnes
        //2eme tableau sera pour l'ensemble des lignes
        let squaresData = [[[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []]]

        if (gridRefs.current[0].current !== null) {

            // On va alimenter la variable squaresData grâce à la fonction getInfoSquare
            // Cette fonction nous retourne sa position dans la grid
            // Chaque Square à un col et un index en props
            gridRefs.current.forEach((square) => {
    
                //On conserve le square dans une variable
                let squareTemp = square.current.getInfoSquare()
    
                //Compte tenu de l'effet asynchrone
                //le gridRefs n'est pas encore a jour du dernier déplacement
                if(imagesInfo !== null) {
                    let firstImage = imagesInfo.first.squareRef.current.getInfoSquare()
                    let secondeImage = imagesInfo.seconde.squareRef.current.getInfoSquare()
        
                    if(firstImage.ref === squareTemp.ref)  squareTemp.type = secondeImage.type
                    if(secondeImage.ref === squareTemp.ref)  squareTemp.type = firstImage.type
                }
    
                //On va alimenter le tableau des colonnes et des lignes
                //exemple de square
    
                            // COL 0  COL 1  COL 2  COL 3  COL 4  COL 5 COL 6  COL 7
                //        //---------------------------------------------------------//
                // ROW 0  //| 0   |  1   |  2   |  3   |  4   |  5   |  6   |  7    |//
                // ROW 1  //| 8   |  9   |  10  |  11  |  12  |  13  |  14  |  15   |//
                // ROW 2  //| 16  |  17  |  18  |  19  |  20  |  21  |  22  |  23   |//
                // ROW 3  //| 24  |  25  |  26  |  27  |  28  |  29  |  30  |  31   |//
                // ......
                // ROW 7  //| 56  |  57  |  58  |  59  |  60  |  61  |  62  |  63   |//
                squaresData[0][squareTemp.col].push(squareTemp)
                squaresData[1][squareTemp.row].push(squareTemp)
            })
    
            setAllSquares(squaresData)
        }
    }

    //Function permettant de rechercher les combinaisons dans la grille
    function searchRowImages() {

        let tempScore = 0
        let following = []
        let squaresRefs = []
        let addSquaresRef = false

        //boucle sur les colonne 0 à 7
        allSquares[0].forEach((col, colIndex) => {
            let sequence = 1
            let prevSquareType = null
            let prevSquareRef = null
            col.forEach((value, rowIndex) => {
                //Si la case actuelle est égal à la case précédente
                if (value.type === prevSquareType) {
                    sequence++
                    addSquaresRef = true

                    //Au cas ou on est en début de combinaison
                    // On push les deux premieres références dans le tableau
                    if (prevSquareType !== null) {
                        if(sequence === 2) squaresRefs.push(prevSquareRef, value)   
                        else squaresRefs.push(value)
                    }

                    //On garde le type et la référence de l'image actuelle pour le contrôle suivant
                    prevSquareType = value.type
                    prevSquareRef = value
                    
                    // *** GESTION EN FIN DE COLONNE *** //
                    //Si on est sur la dernier case et qu'on est en présence d'un enchainement
                    //On ne pourra pas acceder au push du ELSE, on gere le push ici 
                    if(rowIndex === 7 && sequence >= 3) {following.push(sequence)}
                    //Vu que l'on ajoute les deux éléments a partir d'une séquence de 2
                    //Si on est à la fin de la ligne donc indice 7, on va supprimer les deux dernières entrées du tableau
                    if(rowIndex === 7 && sequence === 2) {
                        for (let i = 0; i < sequence; i++) { squaresRefs.pop() }
                    }
                } else {
                    // Si on une combinaison supérieure à 3
                    // On va garder un tableau avec l'historique des différentes combinaisons
                    if (sequence >= 3) following.push(sequence)
                    
                    // Si on a une combinaison de 2
                    // On efface les 2 dernières références sauvegardées
                    if(addSquaresRef && sequence === 2) {
                        for (let i = 0; i < sequence; i++) {
                            squaresRefs.pop()   
                        }
                    }

                    // On garde le type et la référence de l'image actuelle pour le contrôle suivant
                    // On remet à jour la sequence
                    prevSquareType = value.type
                    prevSquareRef = value
                    sequence = 1
                }
            })                
        })

        //boucle sur les ligne 0 à 7
        allSquares[1].forEach((row, rowIndex) => {
            let sequence = 1
            let prevSquareType = null
            let prevSquareRef = null

            row.forEach((value, colIndex) => {
                //Si la case actuelle est égal à la case précédente
                if (value.type === prevSquareType) {
                    sequence++
                    addSquaresRef = true

                    if (prevSquareType !== null) {
                        //Au cas ou on est en début de combinaison
                        // On push les deux premieres références dans le tableau
                        if(sequence === 2) squaresRefs.push(prevSquareRef, value)
                        //Sinon combinaison supérieur à 3, on push 1 seule image     
                        else squaresRefs.push(value)
                    } 

                    //On garde le type et la référence de l'image actuelle pour le contrôle suivant
                    prevSquareType = value.type
                    prevSquareRef = value

                    // *** GESTION EN FIN DE LIGNE *** //
                    //Si on est sur la dernier case et qu'on est en présence d'un enchainement
                    //On ne pourra pas acceder au push du ELSE, on gere le push ici 
                    if(colIndex === 7 && sequence >= 3) { 
                        following.push(sequence) 
                    }
                    //Vu que l'on ajoute les deux éléments a partir d'une séquence de 2
                    //Si on est à la fin de la ligne donc indice 7, on va supprimer les deux dernières entrées du tableau
                    if(colIndex === 7 && sequence === 2) {
                        for (let i = 0; i < sequence; i++) { 
                            squaresRefs.pop() 
                        }
                    }
                //Si la case actuelle est différente de la case précédente
                } else {
                    // Si on une combinaison supérieure à 3
                    // On va garder un tableau avec l'historique des différentes combinaisons
                    if (sequence >= 3) following.push(sequence)
                    
                    // Si on a une combinaison de 2
                    // On efface les 2 dernières références sauvegardées
                    if(addSquaresRef && sequence === 2) {
                        for (let i = 0; i < sequence; i++) {
                            squaresRefs.pop()   
                        }
                    }

                    // On garde le type et la référence de l'image actuelle pour le contrôle suivant
                    // On remet à jour la sequence
                    prevSquareType = value.type
                    prevSquareRef = value
                    sequence = 1
                }
            })
        })

        // Après avoir récupérer les combinaisons pour les colonnes et les lignes
        // Pour chaque entrée du tableau, on va récupérer son score et l'incrementer à la variable tempScore
        following.forEach(follow => {
            switch (follow) {
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
        
        //Tant que la variable isFirstRenderWithZeroScore n'est pas true, on verifie le 1er score lors de la genration de la grille
        if(!isFirstRenderWithZeroScore) {
            // Si le score est supérieur a 0, on va demander de regenerer la grille
            if(tempScore > 0) setScoreFirstRender(preScore => preScore + tempScore)
            //Si le score est egal a 0, on va dire que la 1er génération a zero s'est effectuée
            // Le set a true de la variable IsFirstRenderWithZeroScore
            // Cela va permttre sur les prochains mouvements en cas de combinaison de pas rentré dans le cas ou on regénére la grille
            if(tempScore === 0) setIsFirstRenderWithZeroScore(true)
        } else {
            //Permet de boucler sur les Ref est d'appliquer un CSS sur chaque square

            if (tempScore > 0) {

                setCombinaisonScoreRef(squaresRefs)

                //Mise en place du CSS pour les square concernées par les combinaisons
                squaresRefs.forEach(square => {
                    //Activation du CSS pour mettre en surbrillance les cases concernées
                    square.ref.current.toogleActiveSquare()

                    //Attente d'une seconde pour effacer l'image et le CSS
                    setTimeout(function() {

                        if (square.ref.current !== null)
                        {
                            square.ref.current.setNewRequireImage(10)
                            square.ref.current.toogleActiveSquare()
                        }
                    }, 1000)
                })

                //Mise a jour du score
                setScore(prev => prev + tempScore)
            } else {
                // Si le score est à 0, on fait un revert sur le dernier mouvement d'image
                // Le setTimeOut permet de mettre en place un effet visuel de avant/après
                if(lastMove !== null) {
                    setTimeout(function() {
                        lastMove.first.squareRef.current.handleExchangeImage(lastMove.first.type)
                        lastMove.first.squareRef.current.toogleActiveSquare()
    
    
                        lastMove.seconde.squareRef.current.handleExchangeImage(lastMove.seconde.type)
                        lastMove.seconde.squareRef.current.toogleActiveSquare()
    
                         // Décrement le nombre d'essais de 1
                        setTries(prev => prev - 1)
                    }, 500)
                }
            }   
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