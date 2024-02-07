
export const getRequireImage = (index) => {

    const animaux = {
        cheval : require('../assets/images/cheval.png'),
        chien : require('../assets/images/chien.png'),
        cygne : require('../assets/images/cygne.png'),
        dragon : require('../assets/images/dragon.png'),
        moustique : require('../assets/images/moustique.png'),
        pinguin : require('../assets/images/pinguin.png'),
        oiseau : require('../assets/images/oiseau.png'),
        poulet : require('../assets/images/poulet.png')
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



  