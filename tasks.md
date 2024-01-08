

*****************************************
************ BASE DE DONNEES ************ 

[] Création d'une base de données

[] Création d'un table users
    Table Users qui va comprendre les informations des utilisateurs
    - nom
    - prenom
    - email
    - score de sa meilleure partie ---- Si son score fait partie des 6 meilleures parties, il sera présent dans le classement des 6 meilleures qui doit être affiché à chaque fin de game


QUID du mail récapitulatif ?
Je pense que c'est l'api qui sera en charge d'envoyer le mail récapitulatif
Après que l'utilisateur finisse sa ou ses parties, on fait parvenir l'ensemble des parties à l'API qui mettra en place le code nécessaire pour envoyer le mail 1 heure après


QUID du mail en cas de modification du classement ?
A la connexion d'un utilisateur, on garde en mémoire (reducer) les 6 meilleurs classements avec les ids des joueurs
Chaque joueur ayant fait au moins une partie à un score enregistré, on fait une requete avec un ASC et une LIMIT de 6

Après chaque partie, on vérifie si la partie effectuée entre dans le classement

Si c'est le cas, on insère le score de la partie au classement final
On récupère l'ensemble des ids des scores suivants et on fait l'envoi pour dire indiquer le nouveau classement

Si un des ids récupéré est égal à l'id de l'utilisateur, on effectue pas d'envoi

POur le dernier, il faudra dire qu'il ne fait plus partie du classement

L'API fera le necessaire pour l'envoi de mail



------------- UTILISATEUR ---------------

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


------------------ JEUX --------------------

********* MISE EN PLACE DU JEU ***********

La page du jeu se découpe en 4 principaux éléments qui se distingue par ligne

1er ligne ----> les deux boutons "new game" et "high scores"
2eme ligne ----> les deux champs d'informations "essais restants" et "score"
3eme ligne ----> La grille de jeux
4eme ligne ----> le jauge de "vie"
5eme ligne ----> bouton "hint" et le bouton "pause"

[] Mise ne place d'un reducer GAME_SLEEVE
    - Le reducer devra conserver l'email du joueur qui lancer la manche
    - le nombre d'essais
    - le score
    - niveau de la partie à 1 au début
    - l'état de la jauge de vie

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
[] Mettre en place la possibilité d'échanger une image avec une autre
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

********* ALGO POUR MISE A JOUR DE LA GRILLE ***********



********* ALGO POUR VERIFIER SI IMAGES SUCCESSIVES  ***********

Cette aldo doit permettre de trouver les images successive et de determiner le nombre de d'images concernées

apres cette opération, incrémenter le score


********* BARRE DE VIE ***********

[] Créer un reducer HEALTH_BAR pour la barre de vie qui va contenir
    - le nombre de point/pourcentage actuel
    - la palier pour atteindre le niveau suivant

    Le reducer me parait nécessaire, avec une fonction didUpdate du reducer, nous pourrions avoir une mise quand on fera une modification dans le composant parent

[] Le composant va devoir intégrer une fonction qui va être appelé tte les 3 secondes
    Cette fonction va décrémenter la barre du niveau présent dans le reducer


********* CALCUL DU SCORE A DECREMENTER ***********

[] La fonction sera présente dans le composant barre de vie
    [] A chaque appel de cette fonction, on va récupérer le score présent dans le reducer HEALTH_BAR
    [] On va le décrémenter du niveau actuellement présents dans le reducer GAME_SLEEVE
        [] on divise ce resultat par 100
        [] on arrondie a l'entier superieur * 100
        [] Si egal au palier objectf, mettre a jour le reducer HEALTH_BAR UNIQUEMENT pour le nombre de point
        [] Si différent, mettre a jour le reducer HEALTH_BAR pour le nombre de point et le palier objectif (on arrondie a l'entier superieur * 100)
        

********* CALCUL DU SCORE A INCREMENTER ***********

[] Mise en place d'une fonction qui va calculer 
    - le nombre de point selon le nombre d'images
    - modifier si besoin le niveau présent dans le reducer GAME_SLEEVE
[] Modifier en conséquence le reducer HEALTH_BAR
    [] Récupérer le nombre de point actuellement présent dans la barre de vie
    [] Aditionner le nb point avec le score généré par les images successives
    [] Vérifier si cette adition permet d'atteindre ou dépasser le palier objectif
        [] Si on égal le palier objectif
            [] On va diviser le palier par 100 pour obtenir le niveau atteint et mettre à jour le reducer GAME_SLEEVE
            [] On va augmenter le palier objectif de 100
            [] mettre a jour le reducer HEALTH_BAR pour le nombre de point et le palier objectif
        [] Si on dépasse le palier objectif
            [] On va récuperer l'adition
            [] la diviser par 100 pour obtenir le niveau atteint lors du dépassement
            [] arrondir a l'entier du bas pour obtenir le palier atteint
            [] On va diviser le palier par 100 pour obtenir le niveau atteint et mettre à jour le reducer GAME_SLEEVE
            [] arrondir a l'entier du dessus pour obtenir le palier à atteindre
            [] multiplier par 100 pour obtenir le nouveau palier objectif
            [] mettre a jour le reducer HEALTH_BAR pour le nombre de point et le palier objectif
        [] Si on depasse PAS le palier objectif
            [] mettre a jour le reducer HEALTH_BAR pour le nombre de point

********* MISE A JOUR DU NIVEAU ***********

Le niveau est présent dans le reducer GAME_SLEEVE, il sera mis à jour lors de l'incrémentation du score et la décrémentation


********* NOMBRES ESSAIS ***********

Le nombre d'essais

********* BOUTTON HINT ***********

Lors de l'utilisation du bouton HINT, lancer la recherche de la premier occurence d'image successives

Si pas d'occurence, terminer la partie

Mettre en surbrillance les zones concernées

QUID du reset du bouton HINT ?
Combien de fois il peut l'utiliser durant une partie ?
Si recharge du bouton, quelle frequence ?

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



    




