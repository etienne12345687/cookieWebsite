Projet réalisé par Etienne TOURNIER-RIGAUDY

Initialisation du projet: 
    -> run npm install

Pour lancer le projet : 
    -> dans le fichier server/ :
        commande pour lancer mongo db : mongod --dbpath data/db/
        commande pour lancer le server : nodemon server.js
        Le server run sur localhost:8080
    
    -> dans le fichier cookies-cloudFront/ :
        commande pour lancer l'app : ng serve
        L'application run sur localhost:4200

Le profil Administrateur est accessible avec les identifiants : 
    username: root
    password: root

Le profil utilisateur est accessible avec les identifiants : 
    username: user
    password: user
    OU
    username: test
    password: test
( A noter que vous pouvez aussi créer votre profil utilisateur mais pas admin)

En tant qu'utilisateur, n'oubliez pas de valider votre panier afin qu'il soit visible par l'administrateur dans la rubrique "Commandes" du module admin.

En tant qu'administrateur, lors de la modification d'un cookie, l'image restera la même si vous ne téléchargez pas une autre image lors de la 
modification, pas besoin de télécharger la même si vous voulez la conserver.

Votre addresse ne sera demandé qu'au moment de la validation du panier, non à l'inscription.