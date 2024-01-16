import { StyleSheet, View, Alert } from 'react-native';
// import SquaresContext from '../context/SquaresContext';
import Square from './Square';
import  React, {useEffect, useState, useRef} from 'react';


function GridLayout() {

    // On initialise un tableau nous permettant de stocker les références des squares
    const gridRefs = useRef([])
    // On initialise un tableau nous permettant de stocker les données nécessaire à la construction du tableau de vérification
    const allSquaresRef = useRef()

    var index = 0
    const [imagesInfo, setImagesInfo] = useState(null)
    const [adjacentSquares, setAdjacentSquares] = useState(null)
    const [allSquares, setAllSquares] = useState([])

    //Création d'un tableau de du longueur de 8
    //Chaque élément est un tableau d'une longueur de 8
    const initialGridLayout = Array.from({ length : 8}, (_, rowIndex) => (
        <View style={styles.grid} key={rowIndex}>
            {Array.from({ length : 8}, (_, colIndex) => {
                // On va créer une reférence pour chaque cellule et la mettre dans le tableau qui contient l'ensemble des refs
                //La ref va nous permette de manipuler uniquement la square concernée
                const squareRef = useRef(null)
                gridRefs.current.push(squareRef)
                return <Square 
                    randomNumber={Math.floor(Math.random() * 7)} 
                    key={colIndex} 
                    ref={squareRef} 
                    onPress={getInfoSquare} 
                    id={index++}
                    //Création de l'index par colonne et par ligne
                    col={colIndex}
                    row={rowIndex}
                />
            })}
        </View>
    ));


    const [gridLayout, setGridLayout] = useState(initialGridLayout)

    useEffect(() => {

        //A l'issue du deuxième click, on va procéder au changement d'images
        if(imagesInfo !== null && 'first' in imagesInfo && 'seconde' in imagesInfo) {

            //On vérifie que la 2eme case et adjacente à la 1er
            if (adjacentSquares.includes(imagesInfo.seconde.idImage)) {

                //On met a jour l'image de la case et UNIQUEMENT l'image
                imagesInfo.first.squareRef.current.handleExchangeImage(imagesInfo.seconde.type);
                imagesInfo.seconde.squareRef.current.handleExchangeImage(imagesInfo.first.type);

                //On construit le tableau nous permettant de vérifier la succession d'image
                loadAllSquares()
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
                
                // On desactive le CSS du background
                imagesInfo.first.squareRef.current.disableActiveSquare()
                imagesInfo.seconde.squareRef.current.disableActiveSquare()
            }
        

            // Après avoir effectué le changement d'images, on remet à zéro, la variable imagesInfo
            setImagesInfo(null)

            //On charge l'ensemble des squares avec les informations nécessaires pour vérifications (enchainements images)
            //- Son image
            //- Sa référence
            //- Son id
            //- Sa colonne
            //- Sa ligne
           
        }
    
    }, [imagesInfo])

    //A chaque changement de l'état de la variable allSquares, on lance la fonction searchRowSearch pour vérification
    useEffect(() => {
        //
        //Si allSquare a des données, cela veut dire qu'on a fait un mouvement sur la grille
        // On lance la recherche d'images successives

        if (allSquares.length !== 0) searchRowImages()

    // On indique allSquare ref pour déclenchcer ce hook à la modification de ce state
    }, [allSquares]) 



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
                return {first : { type : type, squareRef : squareRef }}
            } else {

                 //On conserve la référence de la 2eme case cliquée
                return { ...prevImagesInfo, seconde : { type : type, squareRef : squareRef, idImage : idImage }};
            }
        })

    }


    //On va mettre en place un tableau qui va permettre de vérifier chaque colonne et chaque ligne du gridLayout de façon indépendante
    const loadAllSquares = () => {
        //Nombre de col : 8 (index 0 à 7)
        //Nombre de row : 8 (index 0 à 7)
        //Création de 2 tableaux
        //1er tableau sera pour l'ensemble des colonnes
        //2eme tableau sera pour l'ensemble des lignes
        let squaresData = [[[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []]]
        
        // On va alimenter la variable squaresData grâce à la fonction getInfoSquare
        // Cette fonction nous retourne sa position dans la grid
        //Chaque Square à un col et un index en props
        gridRefs.current.forEach((square) => {

            //On conserve le square dans une variable
            let squareTemp = square.current.getInfoSquare()


            //On va alimenter le tableau des colonnes et des lignes
            
            //exemple de square

                        // COL 0  COL 1  COL 2  COL 3  COL 4  COL 5 COL 6  COL 7
            //        //---------------------------------------------------------//
            // ROW 0  //| 0   |  1   |  2   |  3   |  4   |  5   |  6   |  7    |//
            // ROW 1  //| 8   |  9   |  10  |  11  |  12  |  13  |  14  |  15   |//
            // ROW 2  //| 16  |  17  |  18  |  19  |  20  |  21  |  22  |  23   |//
            // ROW 3  //| 16  |  17  |  18  |  19  |  20  |  21  |  22  |  23   |//
            // ......
            // ROW 7  //| 56  |  57  |  58  |  59  |  60  |  61  |  62  |  63   |//

            squaresData[0][squareTemp.col].push(squareTemp)
            squaresData[1][squareTemp.row].push(squareTemp)
        })

        setAllSquares(squaresData)

        console.log(squaresData[0][0])
        allSquaresRef.current = squaresData
    }
    
    

    function searchRowImages() {

        // console.log(allSquaresRef.current[0][0])

        // boucler sur les col 0 à 7
        allSquaresRef.current[0][0].forEach((el) => {
            let sequence = 0
            console.log(`col ${el.col} row ${el.row} type ${el.type}`)

        })
            // Pour chaque colonne on va récupérer les squares qui la composent
                //exemple : pour la colonne 0 --- > 
                                //On va récupérer toutes les square qui pour col : 0
                                // Verifier la succession d'image
                                // Si succession, on alimente une variable score
                                // On alimente une variable des ref sur lequels on va delete
                            // Sur la boucle suivante donc la colonne  1 --->
                                //On va récupérer toutes les square qui pour col : 1
                                // Verifier la succession d'image
                                // .....

        // boucler sur les row 0 à 7
            // Pour chaque row on va récupérer les squares qui la composent
                //exemple : pour la row 0 --- > 
                                //On va récupérer toutes les square qui pour row : 0
                                // Verifier la succession d'image
                                // Si succession, on alimente une variable score
                                // On alimente une variable des ref sur lequels on va delete
                            // Sur la boucle suivante donc la colonne  1 --->
                                //On va récupérer toutes les square qui pour col : 1
                                // Verifier la succession d'image
                                // .....
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