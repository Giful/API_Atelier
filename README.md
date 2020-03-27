# API_Atelier 2019/2020 version Node.js

Axel GAND, Antoine GACHENOT LP2

## GeoQuizz

> API REST GeoQuizz.

### Installation

Se rendre dans les dossiers ./backoffice_dev, ./mobile_dev et ./webapp_dev et exécuter la commande suivante :

``` bash
# Pour installer les dépendances
npm install
```

### Démarrer le projet

``` bash
# Pour démarrer le docker
docker-compose up
```

### Import des données avec Adminer de la base de données MariaDB

> ./backoffice_api/sql/backoffice_bdd.sql

### Re-Démarrer le projet après avoir importé toutes les données

``` bash
# Pour démarrer le docker
docker-compose up
```

### URLs

1. BackOffice : http://localhost:19080

2. Mobile : http://localhost:19180

3. WebApp : http://localhost:19280

4. Accès à l'administration "Adminer" de la base de données MariaDB : http://localhost:8080

- serveur : mysql.atelier
- base de données : atelier_bdd
- utilisateur : atelier_bdd
- mot de passe : atelier_bdd

### Stopper le projet

> ctrl + c

## Générer la javadoc

Supprimer le dossier apiDoc (s'il existe) et entrer la commande suivante à la racine du projet :

> apidoc -e "(node_modules)" -o apiDoc