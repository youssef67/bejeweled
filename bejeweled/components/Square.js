import React, { useEffect } from 'react';
import {StyleSheet, TouchableOpacity, Image } from 'react-native';



function Square(image) {

    console.log(image)
    return ( 
        <TouchableOpacity style={styles.border}>
            <Image  source={image}/>
            
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    border : {
        width : 50,
        height : 50,
        borderWidth: 1, // Largeur de la bordure
        borderColor: 'black', // Couleur de la bordure
    }
})

export default Square;