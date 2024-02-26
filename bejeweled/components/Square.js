import {StyleSheet, TouchableOpacity, Image } from 'react-native';
import  React from 'react';
import { getRequireImage } from "../core/utils";



function Square({indexType, onPress, customStyle}) {

    return (
        <TouchableOpacity style={[styles.square, customStyle]} onPress={onPress}>
          <Image source={getRequireImage(indexType)}/>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    square: {
      flex: 1,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: 'gray',
    },
  });


export default Square;