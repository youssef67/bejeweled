import { StyleSheet, View } from 'react-native';
import Square from './Square';
import React, { useEffect } from 'react';



const images = ["abeille", "araignee", "chat", "faucon", "hiboux", "lapin", "oiseau", "requin"]

function GridLayout() {
    
    function setRequireImage() {
    
        var item = images[Math.floor(Math.random()*images.length)]

        const animaux = {
            abeille : require('../assets/images/abeille.png'),
            araignee : require('../assets/images/araignee.png'),
            chat : require('../assets/images/chat.png'),
            faucon : require('../assets/images/faucon.png'),
            hibou : require('../assets/images/hibou.png'),
            lapin : require('../assets/images/lapin.png'),
            oiseau : require('../assets/images/oiseau.png'),
            requin : require('../assets/images/requin.png'),
        }
    
        switch (item) {
            case 'abeille':
                return animaux.abeille
            case 'araignee':
                return animaux.araignee
            case 'chat':
                return animaux.chat
            case 'faucon':
                return animaux.faucon
            case 'hiboux':
                return animaux.hibou
            case 'lapin':
                return animaux.lapin
            case 'oiseau':
                return animaux.oiseau
            case 'requin':
                return animaux.requin
            default:
                break;
        }
    }

    return (
        
        <View style={styles.center}>
            <View style={styles.grid}>
                <Square image={setRequireImage()}/>

              
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid : {

    }
})

export default GridLayout;