define({ "api": [
  {
    "type": "get",
    "url": "/joueurs/:id",
    "title": "Informations joueur",
    "description": "<p>Requête pour afficher les informations d'un joueur.</p>",
    "name": "GetJoueurById",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID du joueur</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Liste des liens des pages des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.self",
            "description": "<p>Lien pour afficher les informations sur le joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "joueur",
            "description": "<p>Informations d'un joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "joueur.idjoueur",
            "description": "<p>ID du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "joueur.mail",
            "description": "<p>Mail du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "joueur.pseudo",
            "description": "<p>Pseudo du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "joueur.role",
            "description": "<p>Role du joueur, &quot;a&quot; pour administrateur et &quot;u&quot; pour utilisateur simple.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "joueur.created_at",
            "description": "<p>Date de création du joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"type\": \"ressource\",\n     \"links\": {\n         \"self\": \"/joueurs/1\"\n     },\n     \"joueur\": {\n         \"id\": 1,\n         \"mail\": \"gand@gmail.com\",\n         \"pseudo\": \"adminGand\",\n         \"role\": \"a\",\n         \"created_at\": \"2020-03-19T16:40:25.000Z\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/joueurs",
    "title": "Afficher joueurs",
    "description": "<p>Requête pour afficher tous les joueurs.</p>",
    "name": "GetJoueurs",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Nombre de joueurs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Liste des liens des pages des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.next",
            "description": "<p>Lien de la page suivante des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.prev",
            "description": "<p>Lien de la page précédente des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.last",
            "description": "<p>Lien de la dernière page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.first",
            "description": "<p>Lien de la première page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "joueurs",
            "description": "<p>Liste des joueurs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "joueurs.joueur",
            "description": "<p>Informations d'un joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "joueurs.joueur.idjoueur",
            "description": "<p>ID du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "joueurs.joueur.mail",
            "description": "<p>Mail du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "joueurs.joueur.pseudo",
            "description": "<p>Pseudo du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "joueurs.joueur.role",
            "description": "<p>Role du joueur, &quot;a&quot; pour administrateur et &quot;u&quot; pour utilisateur simple.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "joueurs.joueur.created_at",
            "description": "<p>Date de création du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "joueurs.links",
            "description": "<p>Liens vers les ressources associés au joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "joueurs.links.self",
            "description": "<p>Lien pour afficher les informations sur le joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"collection\",\n  \"count\": 2,\n  \"links\": {\n      \"next\": {\n          \"href\": \"/joueurs/?page=1\"\n      },\n      \"prev\": {\n          \"href\": \"/joueurs/?page=1\"\n      },\n      \"last\": {\n          \"href\": \"/joueurs/?page=1\"\n      },\n      \"first\": {\n          \"href\": \"/joueurs/?page=1\"\n      }\n  },\n  \"joueurs\": [\n      {\n          \"joueur\": {\n              \"idjoueur\": 1,\n              \"mail\": \"admin@admin.com\",\n              \"pseudo\": \"admin\",\n              \"role\": \"a\",\n              \"created_at\": \"2020-03-19T16:40:25.000Z\",\n          },\n          \"links\": {\n              \"self\": {\n                  \"href\": \"/joueurs/1\"\n              }\n          }\n    }\n ],",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/parties/:id",
    "title": "Afficher partie",
    "description": "<p>Requête pour afficher une seule.</p>",
    "name": "GetPartieById",
    "group": "BackOffice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID de la partie</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Nombre de parties.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Nombre maximum de parties sur la page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Liste des liens des pages des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.next",
            "description": "<p>Lien de la page suivante des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.prev",
            "description": "<p>Lien de la page précédente des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.last",
            "description": "<p>Lien de la dernière page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.first",
            "description": "<p>Lien de la première page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "partie",
            "description": "<p>Informations d'une partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "partie.idPartie",
            "description": "<p>ID de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "partie.token",
            "description": "<p>Token de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "partie.nb_photos",
            "description": "<p>Nombre de photos dans la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "partie.statut",
            "description": "<p>Statut de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "partie.temps",
            "description": "<p>Durée de la partie en seconde.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "partie.score",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "partie.refJoueur",
            "description": "<p>Id du joueur de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "partie.refSerie",
            "description": "<p>Id de la série de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "parties.partie.created_at",
            "description": "<p>Date de création de la partie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"ressource\",\n  \"links\": {\n      \"self\": \"/parties/47194f30-705a-11ea-997b-a1367d26846d\"\n  },\n  \"partie\": {\n      \"id\": \"47194f30-705a-11ea-997b-a1367d26846d\",\n      \"token\" : \"sha1$c86415f8$1$f536b07df60615e365128084d841529f07f3f3d5\",\n      \"nb_photos\": 15,\n      \"temps\": 156,\n      \"statut\": \"Terminée\",\n      \"score\": 81,\n      \"refSerie\": 1,\n      \"refJoueur\": 2,\n      \"created_at\": \"2020-03-27T18:39:23.000Z\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/parties",
    "title": "Afficher parties",
    "description": "<p>Requête pour afficher toutes les parties.</p>",
    "name": "GetParties",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Nombre de parties.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Nombre maximum de parties sur la page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Liste des liens des pages des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.next",
            "description": "<p>Lien de la page suivante des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.prev",
            "description": "<p>Lien de la page précédente des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.last",
            "description": "<p>Lien de la dernière page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.first",
            "description": "<p>Lien de la première page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "parties",
            "description": "<p>Liste des parties.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "partie",
            "description": "<p>Informations d'une partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partie.idPartie",
            "description": "<p>ID de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parties.partie.token",
            "description": "<p>Token de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partie.nb_photos",
            "description": "<p>Nombre de photos dans la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parties.partie.statut",
            "description": "<p>Statut de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partie.score",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partie.temps",
            "description": "<p>Durée de la partie en seconde.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partie.refJoueur",
            "description": "<p>Id du joueur de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partie.refSerie",
            "description": "<p>Id de la série de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "parties.partie.created_at",
            "description": "<p>Date de création de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "parties.partie.updated_at",
            "description": "<p>Date de modification de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "parties.partie.deleted_at",
            "description": "<p>Date de suppression de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.self",
            "description": "<p>Informations sur la partie seulement.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n\"type\": \"collection\",\n\"count\": 2,\n\"size\": 10,\n\"links\": {\n    \"next\": {\n        \"href\": \"/parties/?page=1\"\n    },\n    \"prev\": {\n        \"href\": \"/parties/?page=1\"\n    },\n    \"last\": {\n        \"href\": \"/parties/?page=1\"\n    },\n    \"first\": {\n        \"href\": \"/parties/?page=1\"\n    }\n},\n\"parties\": [\n    {\n        \"partie\": {\n            \"idPartie\": \"032b8f70-705c-11ea-bf83-6119755a76f1\",\n            \"token\": \"sha1$419ae0ed$1$7b6ccf3154799a0010e010e80c89a4c62c9c8f72\",\n            \"nb_photos\": 5,\n            \"statut\": \"Terminée\",\n            \"score\": 39,\n            \"temps\": 44,\n            \"refJoueur\": 2,\n            \"refSerie\": 1,\n            \"created_at\": \"2020-03-27T18:51:48.000Z\",\n            \"updated_at\": \"2020-03-27T18:52:36.000Z\",\n            \"deleted_at\": null\n        },\n        \"links\": {\n            \"self\": {\n                \"href\": \"/parties/032b8f70-705c-11ea-bf83-6119755a76f1\"\n            }\n        }\n    },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/joueurs/:id/parties",
    "title": "Afficher parties d'un joueur",
    "description": "<p>Requête pour afficher toutes les parties d'un seul joueur.</p>",
    "name": "GetPartiesByJoueur",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID du joueur</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Lien du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.self",
            "description": "<p>Lien pour afficher les informations sur le joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "parties",
            "description": "<p>Informations d'un joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partiejoueur.idPartie",
            "description": "<p>ID de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parties.partiejoueur.token",
            "description": "<p>Token de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parties.partiejoueur.nb_photos",
            "description": "<p>Nombre de photos de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parties.partiejoueur.statut",
            "description": "<p>Statut de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partiejoueur.score",
            "description": "<p>Score de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partiejoueur.temps",
            "description": "<p>Temps de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partiejoueur.refJoueur",
            "description": "<p>Id du joueur de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parties.partiejoueur.refSerie",
            "description": "<p>Id de la série de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parties.partiejoueur.created_at",
            "description": "<p>Date de création de la partie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"ressource\",\n  \"links\": {\n      \"joueur\": \"/joueurs/1\"\n  },\n  \"parties\": [\n      {\n          \"partiejoueur\": {\n              \"idPartie\": \"10050ca0-7037-11ea-97e1-83de28a49500\",\n              \"token\": \"sha1$3ec70132$1$ed287caeb5638a7bfeb4b902b2d4b234a26df659\",\n              \"nb_photos\": 5,\n              \"statut\": \"Terminée\",\n              \"score\": 0,\n              \"temps\": 43,\n              \"refJoueur\": 1,\n              \"refSerie\": 1,\n              \"created_at\": \"2020-03-27T14:27:18.000Z\",\n          },\n          \"links\": {\n             \"self\": {\n                  \"href\": \"/parties/10050ca0-7037-11ea-97e1-83de28a49500\"\n              }\n          }\n      },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/series/:id",
    "title": "Afficher série",
    "description": "<p>Requête pour afficher une série.</p>",
    "name": "GetSerieById",
    "group": "BackOffice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID de la série</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Lien de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "series",
            "description": "<p>Informations d'une série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.idSerie",
            "description": "<p>ID de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "series.ville",
            "description": "<p>Ville de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.latitude",
            "description": "<p>Latitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.longitude",
            "description": "<p>Longitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.zoom",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.dist",
            "description": "<p>Distance pour calculer le score.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.created_at",
            "description": "<p>Date de création de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "photos",
            "description": "<p>Liste de toutes les photos de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "photos.idPhoto",
            "description": "<p>Id de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photos.descr",
            "description": "<p>Description de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photos.url",
            "description": "<p>Url de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "photos.latitude",
            "description": "<p>Latitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "photos.longitude",
            "description": "<p>Longitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "refSerie",
            "optional": false,
            "field": "photos.refSerie",
            "description": "<p>Id de la série correspondante.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "photos.created_at",
            "description": "<p>Date de création de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "photos.updated_at",
            "description": "<p>Date de modification de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "photos.deleted_at",
            "description": "<p>Date de suppression de la photo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"resource\",\n  \"links\": {\n      \"self\": {\n          \"href\": \"/series/1\"\n      }\n  },\n  \"series\": {\n      \"idSerie\": 1,\n      \"ville\": \"Nancy\",\n      \"latitude\": 48.692054,\n      \"longitude\": 6.184417,\n      \"zoom\" : 15\n      \"dist\": 50,\n      \"created_at\": \"2020-03-27T17:42:32.000Z\",\n      \"photos\": [\n          {\n              \"photo\": {\n                  \"idPhoto\": 1,\n                  \"descr\": \"Place Stanislas\",\n                  \"url\": \"https://www.petitfute.com/medias/professionnel/30049/premium/600_450/223989-nancy-place-stanislas.jpg\",\n                  \"latitude\": 48.6936184,\n                  \"longitude\": 6.183241299999999,\n                  \"refSerie\": 1,\n                 \"created_at\": \"2020-03-27T17:43:27.000Z\",\n                  \"updated_at\": \"2020-03-27T17:43:27.000Z\",\n                  \"deleted_at\": null\n           }\n },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/series",
    "title": "Afficher séries",
    "description": "<p>Requête pour afficher toutes les séries.</p>",
    "name": "GetSeries",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Nombre de séries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Nombre maximum de séries sur la page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Liste des liens des pages des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.next",
            "description": "<p>Lien de la page suivante des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.prev",
            "description": "<p>Lien de la page précédente des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.last",
            "description": "<p>Lien de la dernière page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.first",
            "description": "<p>Lien de la première page des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "series",
            "description": "<p>Liste des séries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "serie",
            "description": "<p>Informations d'une série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.idSerie",
            "description": "<p>ID de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "series.serie.ville",
            "description": "<p>Ville de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.serie.latitude",
            "description": "<p>Latitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.serie.longitude",
            "description": "<p>Longitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.zoom",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.dist",
            "description": "<p>Distance pour calculer le score.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.created_at",
            "description": "<p>Date de création de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.updated_at",
            "description": "<p>Date de modification de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.deleted_at",
            "description": "<p>Date de suppression de la série.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"collection\",\n  \"count\" : 1,\n  \"size\" : 10,\n  \"links\": {\n      \"next\": {\n          \"href\": \"/series/?page=1\"\n      },\n      \"prev\": {\n          \"href\": \"/series/?page=1\"\n      },\n     \"first\": {\n         \"href\": \"/series/?page=1\"\n      }\n  },\n  \"series\": [\n     {\n         \"serie\": {\n             \"idSerie\": 1,\n             \"ville\": \"Nancy\",\n             \"latitude\": 48.692054,\n             \"longitude\": 6.184417,\n             \"zoom\": 15,\n             \"dist\": 50,\n             \"created_at\": \"2020-03-19T16:12:52.000Z\",\n             \"updated_at\": \"2020-03-19T16:12:52.000Z\",\n             \"deleted_at\": null\n         }\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "post",
    "url": "/joueurs/auth",
    "title": "Token auth joueur",
    "description": "<p>Requête pour récupérer le token d'authentification du joueur.</p>",
    "name": "PostJoueursAuth",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Adresse mail du joueur - Authorization (Basic Auth).</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe du joueur - Authorization (Basic Auth).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token d'authentification du joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUwNjg4NDF9.k3tKJg1BmTidIGYk0g5ap9Sa0CXyIMxtRL90sOhCdOE\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Aucune Authorization Basic Auth ou mauvaise adresse mail ou mot de passe.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"401\",\n  \"message\": \"Aucune Authorization Basic Auth\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"401\",\n  \"message\": \"Mauvaise adresse mail ou mot de passe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "post",
    "url": "/photos",
    "title": "Ajouter photo",
    "description": "<p>Requête pour ajouter une photo.</p>",
    "name": "PostPhotos",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          },
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations de la photo à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"descr\": \"Place Stanislas\",\n  \"url\": \"https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg\",\n  \"latitude\": 48.6936184,\n  \"longitude\": 6.1810526,\n  \"refSerie\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr",
            "description": "<p>Description de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Url de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "refSerie",
            "description": "<p>Référence de la série où se trouve la photo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"descr\": \"Place Stanislas\",\n  \"url\": \"https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg\",\n  \"latitude\": 48.6936184,\n  \"longitude\": 6.1810526,\n  \"refSerie\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token, mauvais format du token ou mauvaises informations concernant la photo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : refSerie, descr, position et url\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "post",
    "url": "/series",
    "title": "Ajouter série",
    "description": "<p>Requête pour ajouter une série.</p>",
    "name": "PostSeries",
    "group": "BackOffice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          },
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations de la série à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"ville\": \"Nancy\",\n  \"latitude\": 48.6880756,\n  \"longitude\": 6.1384175,\n  \"zoom\": 15,\n  \"dist\": 10\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ville",
            "description": "<p>Ville de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zoom",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dist",
            "description": "<p>Distance pour calculer le score.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"ville\": \"Nancy\",\n  \"latitude\": 48.6880756,\n  \"longitude\": 6.1384175,\n  \"zoom\": 12,\n  \"dist\": 10\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token ou mauvaises informations concernant la série.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : ville, référence de la carte et dist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./atelier_dev/server.js",
    "groupTitle": "BackOffice"
  },
  {
    "type": "get",
    "url": "/series",
    "title": "Afficher série",
    "description": "<p>Requête pour afficher une série.</p>",
    "name": "GetSeries",
    "group": "Mobile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "series",
            "description": "<p>Liste des séries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "serie",
            "description": "<p>Informations d'une série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.idSerie",
            "description": "<p>ID de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "series.serie.ville",
            "description": "<p>Ville de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.serie.latitude",
            "description": "<p>Latitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.serie.longitude",
            "description": "<p>Longitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.zoom",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.dist",
            "description": "<p>Distance pour calculer le score.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.created_at",
            "description": "<p>Date de création de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.updated_at",
            "description": "<p>Date de modification de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.deleted_at",
            "description": "<p>Date de suppression de la série.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"collection\",\n  \"series\": [\n     {\n         \"serie\": {\n             \"idSerie\": 1,\n             \"ville\": \"Nancy\",\n             \"latitude\": 48.692054,\n             \"longitude\": 6.184417,\n             \"zoom\": 12,\n             \"dist\": 10,\n             \"created_at\": \"2020-03-19T16:12:52.000Z\",\n             \"updated_at\": \"2020-03-19T16:12:52.000Z\",\n             \"deleted_at\": null\n         }\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mobile_dev/server.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "post",
    "url": "/joueurs/auth",
    "title": "Token auth joueur",
    "description": "<p>Requête pour récupérer le token d'authentification du joueur.</p>",
    "name": "PostJoueursAuth",
    "group": "Mobile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Adresse mail du joueur - Authorization (Basic Auth).</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe du joueur - Authorization (Basic Auth).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token d'authentification du joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUwNjg4NDF9.k3tKJg1BmTidIGYk0g5ap9Sa0CXyIMxtRL90sOhCdOE\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Aucune Authorization Basic Auth ou mauvaise adresse mail ou mot de passe.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"401\",\n  \"message\": \"Aucune Authorization Basic Auth\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"401\",\n  \"message\": \"Mauvaise adresse mail ou mot de passe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mobile_dev/server.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "post",
    "url": "/photos",
    "title": "Ajouter photo",
    "description": "<p>Requête pour ajouter une photo.</p>",
    "name": "PostPhotos",
    "group": "Mobile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          },
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations de la photo à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"descr\": \"Place Stanislas\",\n  \"url\": \"https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg\",\n  \"latitude\": 48.6936184,\n  \"longitude\": 6.1810526,\n  \"refSerie\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr",
            "description": "<p>Description de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Url de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "refSerie",
            "description": "<p>Référence de la série où se trouve la photo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"descr\": \"Place Stanislas\",\n  \"url\": \"https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg\",\n  \"latitude\": 48.6936184,\n  \"longitude\": 6.1810526,\n  \"refSerie\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token, mauvais format du token ou mauvaises informations concernant la photo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : refSerie, descr, position et url\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mobile_dev/server.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "post",
    "url": "/series",
    "title": "Ajouter série",
    "description": "<p>Requête pour ajouter une série.</p>",
    "name": "PostSeries",
    "group": "Mobile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          },
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations de la série à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"ville\": \"Nancy\",\n  \"latitude\": 48.6880756,\n  \"longitude\": 6.1384175,\n  \"zoom\": 12,\n  \"dist\": 10\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ville",
            "description": "<p>Ville de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zoom",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dist",
            "description": "<p>Distance pour calculer le score.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"ville\": \"Nancy\",\n  \"latitude\": 48.6880756,\n  \"longitude\": 6.1384175,\n  \"zoom\": 12,\n  \"dist\": 10\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token ou mauvaises informations concernant la série.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : ville, référence de la carte et dist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mobile_dev/server.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "get",
    "url": "/joueurs/:id",
    "title": "Informations joueur",
    "description": "<p>Requête pour afficher les informations d'un joueur.</p>",
    "name": "GetJoueurById",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID du joueur</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Liste des liens des pages des résultats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Link",
            "optional": false,
            "field": "links.self",
            "description": "<p>Lien pour afficher les informations sur le joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "joueur",
            "description": "<p>Informations d'un joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "joueur.idjoueur",
            "description": "<p>ID du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "joueur.mail",
            "description": "<p>Mail du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "joueur.pseudo",
            "description": "<p>Pseudo du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "joueur.role",
            "description": "<p>Role du joueur, &quot;a&quot; pour administrateur et &quot;u&quot; pour utilisateur simple.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "joueur.created_at",
            "description": "<p>Date de création du joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"type\": \"ressource\",\n     \"links\": {\n         \"self\": \"/joueurs/1\"\n     },\n     \"joueur\": {\n         \"id\": 1,\n         \"mail\": \"gand@gmail.com\",\n         \"pseudo\": \"adminGand\",\n         \"role\": \"a\",\n         \"created_at\": \"2020-03-19T16:40:25.000Z\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  },
  {
    "type": "get",
    "url": "/series",
    "title": "Afficher série",
    "description": "<p>Requête pour afficher une série.</p>",
    "name": "GetSeries",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "series",
            "description": "<p>Liste des séries.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "serie",
            "description": "<p>Informations d'une série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.idSerie",
            "description": "<p>ID de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "series.serie.ville",
            "description": "<p>Ville de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.serie.latitude",
            "description": "<p>Latitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "series.serie.longitude",
            "description": "<p>Longitude de la ville.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.zoom",
            "description": "<p>Zoom correspondant à l'affichage de la carte.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "series.serie.dist",
            "description": "<p>Distance pour calculer le score.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.created_at",
            "description": "<p>Date de création de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.updated_at",
            "description": "<p>Date de modification de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "series.serie.deleted_at",
            "description": "<p>Date de suppression de la série.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"collection\",\n  \"series\": [\n     {\n         \"serie\": {\n             \"idSerie\": 1,\n             \"ville\": \"Nancy\",\n             \"latitude\": 48.692054,\n             \"longitude\": 6.184417,\n             \"zoom\": 12,\n             \"dist\": 10,\n             \"created_at\": \"2020-03-19T16:12:52.000Z\",\n             \"updated_at\": \"2020-03-19T16:12:52.000Z\",\n             \"deleted_at\": null\n         }\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  },
  {
    "type": "get",
    "url": "/series/:id/photos",
    "title": "Afficher photos",
    "description": "<p>Requête pour afficher les photos d'une série.</p>",
    "name": "GetSeriesIdPhotos",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID de la série.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type de la réponse.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "photos",
            "description": "<p>Liste des photos d'une série.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "photos.photo",
            "description": "<p>Informations d'une photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "photos.photo.idPhoto",
            "description": "<p>ID de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photos.photo.descr",
            "description": "<p>Description de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photos.photo.url",
            "description": "<p>Url de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "photos.photo.latitude",
            "description": "<p>Latitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "photos.photo.longitude",
            "description": "<p>Longitude de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "photos.photo.refSerie",
            "description": "<p>Référence de la série où se trouve la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "photos.photo.created_at",
            "description": "<p>Date de création de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "photos.photo.updated_at",
            "description": "<p>Date de modification de la photo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "photos.photo.deleted_at",
            "description": "<p>Date de suppression de la photo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"type\": \"resource\",\n  \"photos\": [\n     {\n         \"photo\": {\n             \"idPhoto\": 1,\n             \"descr\": \"Place Stanislas\",\n             \"url\": \"https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg\",\n             \"latitude\": 48.6936184,\n             \"longitude\": 6.1810526,\n             \"refSerie\": 1,\n             \"created_at\": \"2020-03-24T17:24:23.000Z\",\n             \"updated_at\": \"2020-03-24T17:24:23.000Z\",\n             \"deleted_at\": null\n         }\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>ID série introuvable.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"404\",\n  \"message\": \"L'id 'ID de la série' n'existe pas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  },
  {
    "type": "post",
    "url": "/joueurs",
    "title": "Ajouter joueur",
    "description": "<p>Requête pour ajouter un joueur.</p>",
    "name": "PostJoueurs",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations du joueur à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"mail\": \"joueur@gmail.com\",\n  \"pseudo\": \"Joueur\",\n  \"mdp\": \"mdp123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Adresse mail du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>Pseudonyme du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mdp",
            "description": "<p>Mot de passe du joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"mail\": \"joueur@gmail.com\",\n  \"pseudo\": \"Joueur\",\n  \"mdp\": \"mdp123456\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Mauvaises informations concernant le joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : mail, pseudo et mdp\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  },
  {
    "type": "post",
    "url": "/joueurs/auth",
    "title": "Token auth joueur",
    "description": "<p>Requête pour récupérer le token d'authentification et l'ID du joueur.</p>",
    "name": "PostJoueursAuth",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Adresse mail du joueur - Authorization (Basic Auth).</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe du joueur - Authorization (Basic Auth).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token d'authentification du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID du joueur.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUwNjg4NDF9.k3tKJg1BmTidIGYk0g5ap9Sa0CXyIMxtRL90sOhCdOE\",\n  \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Aucune Authorization Basic Auth ou mauvaise adresse mail ou mot de passe.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"401\",\n  \"message\": \"Aucune Authorization Basic Auth\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"401\",\n  \"message\": \"Mauvaise adresse mail ou mot de passe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  },
  {
    "type": "post",
    "url": "/parties",
    "title": "Ajouter partie",
    "description": "<p>Requête pour ajouter une partie.</p>",
    "name": "PostParties",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          },
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations de la partie à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"nb_photos\": 10,\n  \"statut\": \"Créée\",\n  \"refJoueur\": 1,\n  \"refSerie\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nb_photos",
            "description": "<p>Nombre de photos de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statut",
            "description": "<p>Statut de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "refJoueur",
            "description": "<p>Référence du joueur.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "refSerie",
            "description": "<p>Référence de la série.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID de la série.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"nb_photos\": 10,\n  \"statut\": \"Créée\",\n  \"refJoueur\": 1,\n  \"refSerie\": 1,\n  \"id\": \"a5d3ac70-6eaa-11ea-a58f-ebf0a4b00e90\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token ou mauvaises informations concernant la partie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : nb_photos, statut, refJoueur et refSerie\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  },
  {
    "type": "put",
    "url": "/parties/:id",
    "title": "Modifier partie",
    "description": "<p>Requête pour modifier une partie.</p>",
    "name": "PutPartiesId",
    "group": "WebApp",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Token  Token d'authentification du joueur - Authorization (Bearer Token).</p>"
          },
          {
            "group": "Header",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Informations de la partie à renseigner en json.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"statut\": \"Terminée\",\n  \"score\": 450\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID de la partie.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statut",
            "description": "<p>Statut de la partie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Score de la partie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"statut\": \"Terminée\",\n  \"score\": 450\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Aucune Authorization Bearer Token ou mauvaises informations concernant la partie.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>ID partie introuvable.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Aucune Authorization Bearer Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Mauvais Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"400\",\n  \"message\": \"Veuillez entrez les informations suivantes : statut, score et temps\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"type\": \"error\",\n  \"error\": \"404\",\n  \"message\": \"L'id 'ID de la partie' n'existe pas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webapp_dev/server.js",
    "groupTitle": "WebApp"
  }
] });
