import { StyleSheet, View, Alert } from 'react-native';
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
    const [isInitialRendered, setIsInitialrendered] = useState(false)
    const [gridLayoutToRegenrate, setGridLayoutToRegenrate] = useState(false)
    const [nbregenrate, setnbregenrate] = useState(0)



    //UseEffect appelé au démarrage pour l'initialisation du layout
    useEffect(() => {
        // setGridLayout(initialGridLayout)
        gridRefs.current = Array(64).fill(null).map(() => createRef());
        // setIsrendered(true)
        const initialGridLayout = Array.from({ length : 8}, (_, rowIndex) => (
            <View style={styles.grid} key={rowIndex}>
                {Array.from({ length : 8}, (_, colIndex) => {
                    // On va créer une reférence pour chaque cellule et la mettre dans le tableau qui contient l'ensemble des refs
                    //La ref va nous permette de manipuler uniquement la square concernée
                    // if(gridRefs.current.length < 64) {
                    //     const squareRef = useRef(null)
                    //     gridRefs.current.push(squareRef)
                    // }
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
        setIsInitialrendered(true)
    }, [gridLayoutToRegenrate])

     
    //On effectue un re-render pour que les références des Square soient présents dans la variable gridRefs
    useEffect(() => {
        loadAllSquares()

        //Si le rendu est ok
        // if (isRendered) {
        //     //On va vérifier que la grille ne présente pas de succession d'image au premier rendu
        //     
        // }
    }, [gridLayout])

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

        
        if (gridRefs.current[0].current !== null) {

            // On va alimenter la variable squaresData grâce à la fonction getInfoSquare
            // Cette fonction nous retourne sa position dans la grid
            // Chaque Square à un col et un index en props
            gridRefs.current.forEach((square) => {
    
                // console.log("gridrefs " + gridRefs.current.length)
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
    
    

    function searchRowImages(firstRender = false) {

        //Si lancement de la recherche lors du 1er rendu
        // Pas de score, uniquement un refresh si presence de succession d'images
        if (isInitialRendered) {
            let count = 0
            let score = 0
            let following = []

            // boucle sur les colonne 0 à 7
            allSquares[0].forEach((col, k) => {
                let following = []
                let sequence = 1
                let prevSquare = null
                
                // console.log('ligne <***********************************************************> ' + k)

                // console.log("first prev " + prevSquare)
                col.forEach((value, key) => {
                    // console.log('champs <--------------------------------------------------------> ' + key)
                    if (value.type === prevSquare) {
                        // console.log('value.type ' + value.type)
                        // console.log('prevSquare ' + prevSquare)
                        // console.log('sequence before ' + sequence)
                        sequence++


                        //Si on est sur la dernier ligne et qu'on a un enchainement
                        
                        if(key === 7 && sequence >= 3) following.push(sequence)
                        // console.log('after before ' + sequence)
                    } else {
                        // console.log("sequence dans le else " + sequence)
                        // console.log('value.type ' + value.type)
                        // console.log('prevSquare ' + prevSquare)
                        if (sequence >= 3)  following.push(sequence)

                        
                        prevSquare = value.type
                        sequence = 1

                        // console.log("following " + following)
                    }
                })                
            })


            allSquares[1].forEach((row, k) => {
                let sequence = 1
                let prevSquare = null
                // console.log('ligne <***********************************************************> ' + k)

                // console.log("first prev " + prevSquare)
                row.forEach((value, key) => {
                    // console.log('champs <--------------------------------------------------------> ' + key)
                    if (value.type === prevSquare) {
                        // console.log('value.type ' + value.type)
                        // console.log('prevSquare ' + prevSquare)
                        // console.log('sequence before ' + sequence)
                        sequence++

                        //Si on est sur la dernier ligne et qu'on a un enchainement
                        if(key === 7 && sequence >= 3) following.push(sequence)
                        // console.log('after before ' + sequence)
                    } else {
                        // console.log("sequence dans le else " + sequence)
                        // console.log('value.type ' + value.type)
                        // console.log('prevSquare ' + prevSquare)
                        if (sequence >= 3) following.push(sequence)
                        
                        prevSquare = value.type
                        
                        sequence = 1

                        // console.log("following " + following)
                    }
                })
            })

            console.log(following)
            following.forEach(follow => {
                switch (follow) {
                    case 3:
                        score += 50
                        break;
                    case 4:
                        score += 150
                        break;
                    case 5:
                        score += 500
                        break;
                    case 7:
                        score += 200
                        break;
                    case 8:
                        score += 550
                        break;
                    default:
                        break;
                }
            }) 

            console.log("score "  + score)
            console.log("count " + count)
            if(score > 0) {
                console.log("prout")
                setGridLayoutToRegenrate(true)
            } 
                

        }




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