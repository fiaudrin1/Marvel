# api_marvel_vj_mf

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### A propos de notre projet (Rapport du projet en bref) :

Pout cloturer le module portant sur VueJS de notre parcours en Licence Pro Developpement web et Big Data (LPDW) à l'IUT du Limousin, nous avons dû réaliser une application basée sur l'utilisation de l'API Marvel.

Ce projet a été réalisé en pair programming, à savoir une première partie codée depuis l'ordinateur de Mael et dans un second temps codé depuis l'ordinateur de Valentin. Pour suivre les contraintes sanitaires nous nous donions rendez-vous sur l'application Discord d'où nous effectuions ce developpement en pair programming.

Dans le Projet, une fois un "npm install" effectué vous trouverez à la racine un dossier node_modules comportant les dépendances du projet.
Le dossier public contient les resources publiques de l'application (notamment sont favicon).
La racine contient par ailleurs églalement les fichiers nécéssaires au bon fonctionnement du projet (package.json etc...).
Enfin le dossier nous intéressant le plus est "src" :

Ce dernier contient le composant de base App, c'est à dire notre application. (Concrètement il s'agit le barre de navigation et de l'inclusion des autre composants.)
Il contient aussi main.js d'où on import l'application et marvel.js contenant les clé d'utilisation de l'API marvel.

Chaque composant vue est décomposé ainsi : 
-Le template html
-Le script contenant le composant
-Le style appliqué au composant en question (entre des balises html de style)

Trois autres dossiers  sont disponibles dans src : 
-Router contenant le fichier JS qui définit les différentes routes accessibles depuis notre application.
-Views contenant les vue de nos deux principales routes de l'application / qui renvoit à l'explorer (d'où l'on peu lister et chercher des personnages) et /equipes (qui comporte la gestion de l'équipe de l'utilisateur)

Enfin le dossier src/component contient nos 4 principaux composants pour le site : 
-Search le composant permettant d'effectuer des recherches par mot-clé et aléatoires
-Team permettant la gestion des équipes
-Thumbnails proposant un catalogue visuel par ordre alphabétique des personnages dans l'accueil du site
-Et Character, le composant responsable de l'affichage des détails de n'importe quel personnage, depuis n'importe quel onglet, lorsqu'on clique que son nom ou thumbnail !