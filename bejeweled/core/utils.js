
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

export const testEnchainementDeTroisPlusTroisSurColonne = [
    { column: 0, id: 0, indexType: 6, row: 0 },
    { column: 1, id: 1, indexType: 0, row: 0 },
    { column: 2, id: 2, indexType: 4, row: 0 },
    { column: 3, id: 3, indexType: 2, row: 0 },
    { column: 4, id: 4, indexType: 2, row: 0 },
    { column: 5, id: 5, indexType: 1, row: 0 },
    { column: 6, id: 6, indexType: 6, row: 0 },
    { column: 7, id: 7, indexType: 1, row: 0 },
    { column: 0, id: 8, indexType: 5, row: 1 },
    { column: 1, id: 9, indexType: 0, row: 1 },
    { column: 2, id: 10, indexType: 5, row: 1 },
    { column: 3, id: 11, indexType: 1, row: 1 },
    { column: 4, id: 12, indexType: 0, row: 1 },
    { column: 5, id: 13, indexType: 1, row: 1 },
    { column: 6, id: 14, indexType: 3, row: 1 },
    { column: 7, id: 15, indexType: 5, row: 1 },
    { column: 0, id: 16, indexType: 5, row: 2 },
    { column: 1, id: 17, indexType: 6, row: 2 },
    { column: 2, id: 18, indexType: 3, row: 2 },
    { column: 3, id: 19, indexType: 4, row: 2 },
    { column: 4, id: 20, indexType: 4, row: 2 },
    { column: 5, id: 21, indexType: 0, row: 2 },
    { column: 6, id: 22, indexType: 2, row: 2 },
    { column: 7, id: 23, indexType: 1, row: 2 },
    { column: 0, id: 24, indexType: 4, row: 3 },
    { column: 1, id: 25, indexType: 5, row: 3 },
    { column: 2, id: 26, indexType: 5, row: 3 },
    { column: 3, id: 27, indexType: 2, row: 3 },
    { column: 4, id: 28, indexType: 5, row: 3 },
    { column: 5, id: 29, indexType: 5, row: 3 },
    { column: 6, id: 30, indexType: 6, row: 3 },
    { column: 7, id: 31, indexType: 5, row: 3 },
    { column: 0, id: 32, indexType: 6, row: 4 },
    { column: 1, id: 33, indexType: 3, row: 4 },
    { column: 2, id: 34, indexType: 1, row: 4 },
    { column: 3, id: 35, indexType: 6, row: 4 },
    { column: 4, id: 36, indexType: 0, row: 4 },
    { column: 5, id: 37, indexType: 2, row: 4 },
    { column: 6, id: 38, indexType: 0, row: 4 },
    { column: 7, id: 39, indexType: 4, row: 4 },
    { column: 0, id: 40, indexType: 6, row: 5 },
    { column: 1, id: 41, indexType: 1, row: 5 },
    { column: 2, id: 42, indexType: 3, row: 5 },
    { column: 3, id: 43, indexType: 1, row: 5 },
    { column: 4, id: 44, indexType: 3, row: 5 },
    { column: 5, id: 45, indexType: 6, row: 5 },
    { column: 6, id: 46, indexType: 3, row: 5 },
    { column: 7, id: 47, indexType: 2, row: 5 },
    { column: 0, id: 48, indexType: 1, row: 6 },
    { column: 1, id: 49, indexType: 4, row: 6 },
    { column: 2, id: 50, indexType: 6, row: 6 },
    { column: 3, id: 51, indexType: 2, row: 6 },
    { column: 4, id: 52, indexType: 1, row: 6 },
    { column: 5, id: 53, indexType: 3, row: 6 },
    { column: 6, id: 54, indexType: 6, row: 6 },
    { column: 7, id: 55, indexType: 3, row: 6 },
    { column: 0, id: 56, indexType: 1, row: 7 },
    { column: 1, id: 57, indexType: 3, row: 7 },
    { column: 2, id: 58, indexType: 2, row: 7 },
    { column: 3, id: 59, indexType: 6, row: 7 },
    { column: 4, id: 60, indexType: 3, row: 7 },
    { column: 5, id: 61, indexType: 2, row: 7 },
    { column: 6, id: 62, indexType: 3, row: 7 },
    { column: 7, id: 63, indexType: 6, row: 7 },
  ];


  export const testEnchainementDeTroisEtTroisSurColonneEtLignePlusTrois = [
    { column: 0, id: 0, indexType: 6, row: 0 },
    { column: 1, id: 1, indexType: 0, row: 0 },
    { column: 2, id: 2, indexType: 4, row: 0 },
    { column: 3, id: 3, indexType: 2, row: 0 },
    { column: 4, id: 4, indexType: 2, row: 0 },
    { column: 5, id: 5, indexType: 1, row: 0 },
    { column: 6, id: 6, indexType: 6, row: 0 },
    { column: 7, id: 7, indexType: 1, row: 0 },
    { column: 0, id: 8, indexType: 5, row: 1 },
    { column: 1, id: 9, indexType: 0, row: 1 },
    { column: 2, id: 10, indexType: 5, row: 1 },
    { column: 3, id: 11, indexType: 1, row: 1 },
    { column: 4, id: 12, indexType: 0, row: 1 },
    { column: 5, id: 13, indexType: 1, row: 1 },
    { column: 6, id: 14, indexType: 3, row: 1 },
    { column: 7, id: 15, indexType: 5, row: 1 },
    { column: 0, id: 16, indexType: 5, row: 2 },
    { column: 1, id: 17, indexType: 0, row: 2 },
    { column: 2, id: 18, indexType: 6, row: 2 },
    { column: 3, id: 19, indexType: 4, row: 2 },
    { column: 4, id: 20, indexType: 4, row: 2 },
    { column: 5, id: 21, indexType: 0, row: 2 },
    { column: 6, id: 22, indexType: 2, row: 2 },
    { column: 7, id: 23, indexType: 1, row: 2 },
    { column: 0, id: 24, indexType: 4, row: 3 },
    { column: 1, id: 25, indexType: 5, row: 3 },
    { column: 2, id: 26, indexType: 6, row: 3 },
    { column: 3, id: 27, indexType: 2, row: 3 },
    { column: 4, id: 28, indexType: 5, row: 3 },
    { column: 5, id: 29, indexType: 5, row: 3 },
    { column: 6, id: 30, indexType: 6, row: 3 },
    { column: 7, id: 31, indexType: 5, row: 3 },
    { column: 0, id: 32, indexType: 3, row: 4 },
    { column: 1, id: 33, indexType: 6, row: 4 },
    { column: 2, id: 34, indexType: 1, row: 4 },
    { column: 3, id: 35, indexType: 6, row: 4 },
    { column: 4, id: 36, indexType: 6, row: 4 },
    { column: 5, id: 37, indexType: 2, row: 4 },
    { column: 6, id: 38, indexType: 0, row: 4 },
    { column: 7, id: 39, indexType: 4, row: 4 },
    { column: 0, id: 40, indexType: 6, row: 5 },
    { column: 1, id: 41, indexType: 1, row: 5 },
    { column: 2, id: 42, indexType: 3, row: 5 },
    { column: 3, id: 43, indexType: 1, row: 5 },
    { column: 4, id: 44, indexType: 3, row: 5 },
    { column: 5, id: 45, indexType: 6, row: 5 },
    { column: 6, id: 46, indexType: 3, row: 5 },
    { column: 7, id: 47, indexType: 2, row: 5 },
    { column: 0, id: 48, indexType: 1, row: 6 },
    { column: 1, id: 49, indexType: 4, row: 6 },
    { column: 2, id: 50, indexType: 6, row: 6 },
    { column: 3, id: 51, indexType: 2, row: 6 },
    { column: 4, id: 52, indexType: 1, row: 6 },
    { column: 5, id: 53, indexType: 3, row: 6 },
    { column: 6, id: 54, indexType: 6, row: 6 },
    { column: 7, id: 55, indexType: 3, row: 6 },
    { column: 0, id: 56, indexType: 1, row: 7 },
    { column: 1, id: 57, indexType: 3, row: 7 },
    { column: 2, id: 58, indexType: 2, row: 7 },
    { column: 3, id: 59, indexType: 6, row: 7 },
    { column: 4, id: 60, indexType: 3, row: 7 },
    { column: 5, id: 61, indexType: 2, row: 7 },
    { column: 6, id: 62, indexType: 3, row: 7 },
    { column: 7, id: 63, indexType: 6, row: 7 },
  ];


  export const testEnchainementDeCinqEtTroisSurColonneEtLignePlusCinqPlusTrois = [
    { column: 0, id: 0, indexType: 6, row: 0 },
    { column: 1, id: 1, indexType: 3, row: 0 },
    { column: 2, id: 2, indexType: 4, row: 0 },
    { column: 3, id: 3, indexType: 2, row: 0 },
    { column: 4, id: 4, indexType: 2, row: 0 },
    { column: 5, id: 5, indexType: 1, row: 0 },
    { column: 6, id: 6, indexType: 6, row: 0 },
    { column: 7, id: 7, indexType: 1, row: 0 },
    { column: 0, id: 8, indexType: 5, row: 1 },
    { column: 1, id: 9, indexType: 0, row: 1 },
    { column: 2, id: 10, indexType: 5, row: 1 },
    { column: 3, id: 11, indexType: 1, row: 1 },
    { column: 4, id: 12, indexType: 0, row: 1 },
    { column: 5, id: 13, indexType: 1, row: 1 },
    { column: 6, id: 14, indexType: 3, row: 1 },
    { column: 7, id: 15, indexType: 5, row: 1 },
    { column: 0, id: 16, indexType: 5, row: 2 },
    { column: 1, id: 17, indexType: 0, row: 2 },
    { column: 2, id: 18, indexType: 6, row: 2 },
    { column: 3, id: 19, indexType: 5, row: 2 },
    { column: 4, id: 20, indexType: 4, row: 2 },
    { column: 5, id: 21, indexType: 0, row: 2 },
    { column: 6, id: 22, indexType: 2, row: 2 },
    { column: 7, id: 23, indexType: 1, row: 2 },
    { column: 0, id: 24, indexType: 4, row: 3 },
    { column: 1, id: 25, indexType: 5, row: 3 },
    { column: 2, id: 26, indexType: 6, row: 3 },
    { column: 3, id: 27, indexType: 3, row: 3 },
    { column: 4, id: 28, indexType: 1, row: 3 },
    { column: 5, id: 29, indexType: 5, row: 3 },
    { column: 6, id: 30, indexType: 6, row: 3 },
    { column: 7, id: 31, indexType: 5, row: 3 },
    { column: 0, id: 32, indexType: 3, row: 4 },
    { column: 1, id: 33, indexType: 6, row: 4 },
    { column: 2, id: 34, indexType: 1, row: 4 },
    { column: 3, id: 35, indexType: 3, row: 4 },
    { column: 4, id: 36, indexType: 1, row: 4 },
    { column: 5, id: 37, indexType: 2, row: 4 },
    { column: 6, id: 38, indexType: 0, row: 4 },
    { column: 7, id: 39, indexType: 4, row: 4 },
    { column: 0, id: 40, indexType: 6, row: 5 },
    { column: 1, id: 41, indexType: 1, row: 5 },
    { column: 2, id: 42, indexType: 3, row: 5 },
    { column: 3, id: 43, indexType: 1, row: 5 },
    { column: 4, id: 44, indexType: 3, row: 5 },
    { column: 5, id: 45, indexType: 3, row: 5 },
    { column: 6, id: 46, indexType: 0, row: 5 },
    { column: 7, id: 47, indexType: 2, row: 5 },
    { column: 0, id: 48, indexType: 1, row: 6 },
    { column: 1, id: 49, indexType: 4, row: 6 },
    { column: 2, id: 50, indexType: 6, row: 6 },
    { column: 3, id: 51, indexType: 3, row: 6 },
    { column: 4, id: 52, indexType: 1, row: 6 },
    { column: 5, id: 53, indexType: 3, row: 6 },
    { column: 6, id: 54, indexType: 6, row: 6 },
    { column: 7, id: 55, indexType: 3, row: 6 },
    { column: 0, id: 56, indexType: 1, row: 7 },
    { column: 1, id: 57, indexType: 5, row: 7 },
    { column: 2, id: 58, indexType: 5, row: 7 },
    { column: 3, id: 59, indexType: 3, row: 7 },
    { column: 4, id: 60, indexType: 5, row: 7 },
    { column: 5, id: 61, indexType: 5, row: 7 },
    { column: 6, id: 62, indexType: 3, row: 7 },
    { column: 7, id: 63, indexType: 6, row: 7 },
  ];
  