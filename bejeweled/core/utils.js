
export const getRequireImage = (index) => {

    const animaux = {
        cheval : require('../assets/images/champiRouge.png'),
        chien : require('../assets/images/champiVert.png'),
        cygne : require('../assets/images/etoile.png'),
        dragon : require('../assets/images/fleur.png'),
        moustique : require('../assets/images/missile.png'),
        pinguin : require('../assets/images/mario.png'),
        oiseau : require('../assets/images/piece.png'),
        poulet : require('../assets/images/yoshi.png')
    }

    switch (index) {
        case 0:
            return animaux.cheval
        case 1:
            return animaux.chien
        case 2:
            return animaux.cygne
        case 3:
            return animaux.dragon
        case 4:
            return animaux.moustique
        case 5:
            return animaux.pinguin
        case 6:
            return animaux.oiseau
        case 7:
            return animaux.poulet
        default:
            break;
    }

}



  