

                                        *****************************************
                                        ------------- UTILISATEUR ---------------
                                        *****************************************

[] Création d'un compte utilisateur

    L'utilisateur doit renseigner :
    - Nom 
    - Prénom
    - Email

[] Connexion via l'email

[] Création d'un espace utilisateur

    On pourra retrouver un ensemble d'informations
    - Nom et prénom
    - Date d'inscription
    - Nombre de parties effectuées
    - position de sa partie dans le classement si dans les 6 premiers
    - La meilleure partie
    - Un bouton lancer une partie



QUID de la modification du profi ?
QUID modification des paramétres du jeu ? difficultées ? nombre d'essais, vitesse de décrémentation de la barre de vie ?

[] Mise ne place d'un reducer USER
    - Le reducer devra conserver le nom et l'email de l'utilisateur courant
    - Si ajout param, soit ajouter ici soit faire un autre reducer


                                        ********************************************
                                        ------------------ JEUX --------------------
                                        ********************************************

********* MISE EN PLACE DU JEU ***********

La page du jeu se découpe en 4 principaux éléments qui se distinguent par des lignes

1er ligne ----> les deux boutons "new game" et "high scores"
2eme ligne ----> les deux champs d'informations "essais restants" et "score"
3eme ligne ----> La grille de jeux
4eme ligne ----> le jauge de "vie"
5eme ligne ----> bouton "hint" et le bouton "pause"

[] Mise ne place d'un reducer GAME_SLEEVE
    - Le reducer devra conserver l'email du joueur qui lancer la manche
    - le nombre d'essais
    - le score
    - niveau de la partie intialisé à 1
    - palier objectif initialisé à 100

1er ligne
[] création des compoosants buttons
    Création de composant réutilisable n'importe ou dans l'application
[] le button new game reset la page et réaffiche une nouvelle grille
[] le button high scores affiche une modal avec les 6 meilleurs scores

2eme ligne
[] Mise ne place des textes permettant d'avoir les informations nécessaire (essais + score)
[] Les essais devront être dynamiquement être mise à jour dans le reducers
[] idem pour le score

3eme ligne
[] Création d'un grille de 8X8
[] Afficher de façon aléatoire les images
    Chaque image devra être clairement identifiable dans le code
[] Algo qui vérifie si la grille présente 3 images successives sur le plan horizontal et vertical, le cas echéant régénérer la grille

4eme ligne
[] Mise en place de la barre de vie et l'initialiser à 50

5eme ligne
[] le button hint pour afficher une aide
[] le button résume qui va mettre en pause la décrémentation de la barre


********* DEROULEMENT DU JEUX ***********

[] Mettre en place la possibilité de déplacer une image
    ---> horizontalement
    ---> verticalement
[] Après l'opération vérifier si la grille présente 3 ou + images successives, sur le plan horizontal et vertical
[] Si pas d'images successives ---> décrémenter le nombre d'essai dans le reducer
[] A chaque décrémentation, vérifier si le nombre d'essai est toujours suffisant pour jouer, le cas echéant mettre fin à la partie
[] Si images successives, calculer le score à incrémenter à la barre de vie
[] mettre à jour la grille en supprimant les images concernées

L'opération doit pouvoir se répéter tant qu'aucune conditions d'arrêt ne se présente


********* LA GRILLE ***********

[] la grille sera formé d'un tableau d'une longueur de 8, chaque element de ce tableau sera lui même un tableau d'une longueur de 8
[] la deuxieme niveau sera donc a chaque fois un tableau qui va contenir pour chaque élément, un composant
[] Ce composant va contenir l'image et un element identifiable, (ID)


********* ALGO POUR VERIFIER SI IMAGES SUCCESSIVES - AU LANCEMENT DU JEU  ***********

Cette algo doit permettre de 
    - trouver 3 IMAGES successive horizontalement ou verticalement

Si retour positifs
    ----> faire regénére la grille
            cette action ne doit pas être visible par l'utilisateur
Sinon 
    ----> Pas d'action


********* ALGO POUR VERIFIER SI IMAGES SUCCESSIVES - EN COURS DE PARTIE  ***********

varibale TROUVE = true
nombre points = 0

Tant que TROUVE = true
    Cette algo doit permettre de 
        - si trouve images successive   
            - determiner le nombre de d'images concernées
                il peut avoir plusieurs series d'images
            - prendre en compte les priorités
            - calculer la somme de points généré
            - incrementer la variable globale
            - Effacer les images concernées
            - Appel de ALGO POUR MISE A JOUR DE LA GRILLE pour la MAJ de la grille
        - Sinon
            TROUVE = false
Fin Tant que
    

On retourne le nombre de points

********* ALGO POUR MISE A JOUR DE LA GRILLE ***********

Cette algo doit permettre de remplir les cases effacées par l'algo précédent

Les cases vides devront etre rempli par l'image du dessus et ainsi de suite

après avoir "descendu" les images, les cases vides restantes devront être rempli par des images aléatoires


********* ALGO POUR LE BOUTON HINT ***********

Cette algo devra simuler x opération pour trouver une solution au joueur

la première solution sera mise en surbrillance

********* BARRE DE POURCENTAGE ***********

[] Créer un reducer HEALTH_BAR pour la barre de vie qui va contenir
    - le pourcentages actuel

Le reducer me parait nécessaire, avec une fonction didUpdate du reducer, nous pourrions avoir une MAJ quand on fera une modification dans le composant parent

[] Le composant va devoir intégrer une fonction qui va être appelé tte les 3 secondes
    Cette fonction va décrémenter le niveau present dans le reducer GAME_SLEEVE à la barre de pourcentage  

********* DECREMENTATION DE LA BARRE DE VIE ***********

[] La fonction sera présente dans le composant barre de vie
    [] A chaque appel de cette fonction, on va récupérer le pourcentage présent dans le reducer HEALTH_BAR
    [] On va le décrémenter du niveau actuellement présents dans le reducer GAME_SLEEVE
        [] Si la barre supérieur à 0
            [] mettre a jour le nombre de point dans le reducer HEALTH_BAR
        [] Si la barre inférieur ou égal à 0
            [] Appel de la fonction pour la fin du jeu en précisant le motif de fin

********* DEPLACEMENT D'UNE IMAGE ***********

[] Mise en place d'une fonction qui doit permettre d'inverser la position de 2 images
[] A chaque déplacement, Appel du paragraphe ALGO POUR VERIFIER SI IMAGES SUCCESSIVES - EN COURS DE PARTIE qui va vérifier la présence ou non d'image successive
    Si nombre de point superieur à 0
        appel du CALCUL DU SCORE A INCREMENTER
    

********* GAGNER DES POINTS ***********

    3 images alignées = 50
    4 images alignées = 150
    5 images alignées = 500

    Ce score doit être multiplié par le niveau actuel

    Si plus de 5 images sont alignés, 
    
    Sur le plan horizontal
        prendre en compte les images en commençant par la droite
    Sur le plan vertical
        prendre en compte les images en commençant par le haut


********* CALCUL DU SCORE A INCREMENTER ***********

    [] Récupérer le nombre de point actuellement présent dans l'input SCORE présent dans le reducer GAME_SLEEVE
    [] Aditionner le nb points avec le score généré par les images successives
--------[] Si on depasse PAS le palier objectif

            Exemple sur le début de partie pour 3 images alignés et 50 points obtenu :

            [] Récupérer les inforamtions suivants dans le reducer GAME_SLEEVE

                    Actuellement, le score est de 0
                    le palier objectif est de 100
                    niveau actuel ---> niveau 1

                    On obtient 50 points pour avoir aligner 3 images

                    50 * 1 = 50

                    0 + 50 = 50

                    50 est inférieur au palier objectif présent dans le reducer et qui a pour valeur 100

            Exemple en milieu de partie le début de partie pour 4 images alignés et 150 points obtenu :
            
            [] Récupérer les inforamtions suivants dans le reducer GAME_SLEEVE

                    Actuellement, le score est de 17 897
                    le palier objectif est de 50 000
                    niveau actuel ---> niveau 500

                    On obtient 150 points pour avoir aligner 3 images

                    50 * 500 = 25 000

                    17 897 + 25 000 = 42 897

                    42 897 est inférieur au palier objectif présent dans le reducer et qui a pour valeur 50 000

            [] Mettre à jour l'input SCORE
            [] Mettre à jour la progress bar

--------[] Si on égal le palier objectif

                Exemple sur le début de partie pour 3 images alignés et 50 points obtenu :

                    [] Récupérer les inforamtions suivants dans le reducer GAME_SLEEVE

                    Actuellement, le score est de 50
                    le palier objectif est de 100
                    niveau actuel ---> niveau 1

                    On obtient 50 points pour avoir aligner 3 images

                    50 * 1 = 50

                    50 + 50 = 100

                    100 est égal au palier objectif présent dans le reducer et qui a pour valeur 100
                
                [] Mettre à jour l'input SCORE
                [] Récupérer le palier objectif present dans le reducer  
                [] diviser le palier objectif par 100 pour obtenir le niveau atteint
                [] Incrementer le palier objectif de 100 pour obtenir le nouveau palier
                [] Mettre à jour dans le reducer GAME_SLEEVE, le palier objectif et le niveau
                [] Mettre à jour le score
                [] Mettre à jour la progress bar
                
                    Exemple en milieu de partie pour 3 images alignés et 50 points obtenu :

                        [] Récupérer les inforamtions suivants dans le reducer GAME_SLEEVE

                        Actuellement, le score est de 2550
                        le palier objectif est de 5 000
                        niveau actuel ---> niveau 49

                        On obtient 50 points pour avoir aligner 3 images

                        50 * 49 = 2450

                        2 550 + 2 450 = 5 000

                        5 000 est égal au palier objectif présent dans le reducer et qui a pour valeur 5 000

                        5 000 / 100 = 50 ---> nouveau niveau atteint
                        5 000 + 100 = 5 100 ----> nouveau palier objectif

--------[] Si on dépasse le palier objectif

            Exemple sur le début de partie pour 4 images alignés et 150 points obtenu :

                [] Récupérer les inforamtions suivants dans le reducer GAME_SLEEVE

                    Actuellement, le score est de 0
                    le palier objectif est de 100
                    niveau actuel ---> niveau 1

                    On obtient 150 points pour avoir aligner 4 images

                    150 * 1 = 150

                    0 + 150 = 150

                    150 est supérieur au palier objectif présent dans le reducer et qui a pour valeur 100

                [] On va diviser le score par 100 pour obtenir le niveau atteint 

                        150 / 100 = 1.5

                [] arrondir a l'entier du bas pour obtenir le niveau atteint et mettre à jour le reducer GAME_SLEEVE

                    exemple : 
                        Math.floor(1.5) = 1

                [] incrementer le niveau de 1 pour obtenir le nouveau palier objectif

                    exemple : 
                        1 + 1 = 2 * 100 = 200

                [] multiplier par 100 pour obtenir le nouveau palier objectif

                    exemple : 
                        2 * 100 = 200
            
                [] Mettre à jour dans le reducer GAME_SLEEVE, le palier objectif et le niveau
                [] Mettre à jour le score
                [] Mettre à jour la progress bar

            Exemple en milieu de partie pour 3 images alignés et 50 points obtenu :

                [] Récupérer les inforamtions suivants dans le reducer GAME_SLEEVE

                    Actuellement, le score est de 3 657
                    le palier objectif est de 4 200 
                    niveau actuel ---> niveau 41

                    On obtient 50 points pour avoir aligner 3 images

                    50 * 41 = 2 050

                    3 657 + 2 050 = 5 707

                    5 707 est supérieur au palier objectif présent dans le reducer et qui a pour valeur 4 200

                [] On va diviser le score par 100 pour obtenir le niveau atteint 

                    5 707 / 100 = 57.07

                [] arrondir a l'entier du bas pour obtenir le niveau atteint et mettre à jour le reducer GAME_SLEEVE

                    exemple : 
                        Math.floor(57.07) = 57

                [] incrementer le niveau de 1 pour obtenir le nouveau palier objectif

                    exemple : 
                        57 + 1 = 58 * 100 = 5 800

                [] Mettre à jour dans le reducer GAME_SLEEVE, le palier objectif et le niveau
                [] Mettre à jour le score
                [] Mettre à jour la progress bar

********* MISE A JOUR DE LA PROGRESS BAR ***********

La mise à jour de la progress bar repose sur un simple produit en croix

exemple :
        Actuellement, le score est de 17 897
        le palier objectif est de 50 000

        17 897 * 100 / 50 000 = 35.79

        On arrondi à l'entier inférieur = 35 %


        On obtient 25 000 point
        Le nouveau score est de 42 897

        42 897 * 100 / 50 000 = 85.79

        On arrondi à l'entier inférieur = 85 %

QUID de la partie graphique ?

********* MISE A JOUR DU NIVEAU ***********

Le niveau est présent dans le reducer GAME_SLEEVE, il sera mis à jour lors de l'incrémentation du score

********* NOMBRES ESSAIS ***********

Le nombre d'essais
[] Mise en place de la fonction pour décrementer le nombre d'essais
    [] Si nombre d'essai tombe a zero
        [] Appel de la fonction pour la fin du jeu en précisant le motif de fin
    [] Si nombre essai supérieur à zero, retour ok

********* BOUTTON HINT ***********

[] Mise en place de la fonction HINT
    [] Lancement de l'algo permettant de trouver un enchainement de 3 images minimum
        [] Si retour positif
            [] Appel de la fonction de surbrillance avec en paramétre les positions des cases concernés
        [] Si retour négatif
            [] Appel de la fonction pour la fin du jeu en précisant le motif de fin


QUID du reset du bouton HINT ?
Combien de fois il peut l'utiliser durant une partie ?
Si recharge du bouton, quelle frequence ?

********* MISE EN PLACE DE LA SURBRILLANCE LORS DU LANCEMENT DU HINT ***********

    [] Avec l'élement transmis par la fonction HINT, mettre en place le code CSS permettant de mettre en surbrillance les zones concernés
            [] En retour de cette fonction, indiquer si élement trouvé ou non 

********* BOUTTON PAUSE ***********

[] Lors du click sur le bouton pause
    [] Arreter la décrémentation automatique de la barre
    [] Cacher au jouer les images
    [] Passer le texte PAUSE à RESTART
    [] désactiver les boutons

********* BOUTTON RESTART ***********

[] Lors du click sur le bouton restart
    [] redémarrer la décrémentation automatique de la barre
    [] Afficher au jouer les images
    [] Passer le texte RESTART à PAUSE
    [] Activer les boutons

*********** RELANCER UNE PARTIE ***************

[] Sauvegarder le score et l'id du joeur de la partie qui vient de se terminer
[] Permettre la regénération d'une grille de jeu
[] Algo qui vérifie si la grille présente 3 images successives sur le plan horizontal et vertical, le cas echéant régénérer la grille

*********** FIN DE PARTIE ***************

3 confditions pour une fin de partie
- plus d'essais disponibles
- jauge de vie qui atteint 0
- Lors du lancement du hint, pas d'occurence trouvée

[] Sauvegarder le score et l'id du joeur de la partie qui vient de se terminer
[] En fin de partie afficher une modal 
    - Qui montre le score de la partie jouée
    - Du classement des 6 meilleurs scores
    - Un bouton qui propose de rejouer
    - UN bouton qui propose de quitter




*****************************************
***************** API ******************* 


*****************************************************
***************** BASE DE DONNEES ******************* 

[] Création d'une base de données

[] Création d'un table users
    Table Users qui va comprendre les informations des utilisateurs
    - nom
    - prenom
    - email
    - score de sa meilleure partie 


QUID du mail récapitulatif ?
Je pense que c'est l'api qui sera en charge d'envoyer le mail récapitulatif
Après que l'utilisateur finisse sa ou ses parties, on fait parvenir l'ensemble des parties à l'API qui mettra en place le code nécessaire pour envoyer le mail 1 heure après


QUID du mail en cas de modification du classement ?
A la connexion d'un utilisateur, on garde en mémoire (reducer) les 6 meilleurs classements avec les ids des joueurs
Si le joueur connecté

Chaque joueur ayant fait au moins une partie à un score enregistré, on fait une requete avec un ASC et une LIMIT de 6

Après chaque partie, on vérifie si la partie effectuée entre dans le classement

Si c'est le cas, on insère le score de la partie au classement final
On récupère l'ensemble des ids des scores suivants et on fait l'envoi pour dire indiquer le nouveau classement

Si un des ids récupéré est égal à l'id de l'utilisateur, on effectue pas d'envoi

POur le dernier, il faudra dire qu'il ne fait plus partie du classement

L'API fera le necessaire pour l'envoi de mail



    




