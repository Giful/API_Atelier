"use strict";

const bodyparser = require('body-parser');
const express = require("express");
const mysql = require("mysql");
const axios = require('axios');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const cors = require('cors');

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: false
    })
);

var corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            console.warn("Warning : Missing 'Origin' header")
        }
        callback(null, true)
    }
}
app.use(cors(corsOptions))

// GET

app.get("/", (req, res) => {
    res.send("Atelier API\n");
});
/**
 * @api {get} /joueurs Afficher joueurs
 * @apiDescription Requête pour afficher tous les joueurs.
 * @apiName GetJoueurs
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Number} count Nombre de joueurs
 * @apiSuccess {Object} links  Liste des liens des pages des résultats.
 * @apiSuccess {Link} links.next  Lien de la page suivante des résultats.
 * @apiSuccess {Link} links.prev  Lien de la page précédente des résultats.
 * @apiSuccess {Link} links.last  Lien de la dernière page des résultats.
 * @apiSuccess {Link} links.first  Lien de la première page des résultats.
 * @apiSuccess {Object} joueurs  Liste des joueurs.
 * @apiSuccess {Object} joueurs.joueur  Informations d'un joueur.
 * @apiSuccess {Number} joueurs.joueur.idjoueur  ID du joueur.
 * @apiSuccess {String} joueurs.joueur.mail  Mail du joueur.
 * @apiSuccess {String} joueurs.joueur.pseudo  Pseudo du joueur.
 * @apiSuccess {Decimal} joueurs.joueur.role  Role du joueur, "a" pour administrateur et "u" pour utilisateur simple.
 * @apiSuccess {Number} joueurs.joueur.created_at  Date de création du joueur.
 * @apiSuccess {Object} joueurs.links  Liens vers les ressources associés au joueur.
 * @apiSuccess {Link} joueurs.links.self  Lien pour afficher les informations sur le joueur.
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "type": "collection",
 *    "count": 2,
 *    "links": {
 *        "next": {
 *            "href": "/joueurs/?page=1"
 *        },
 *        "prev": {
 *            "href": "/joueurs/?page=1"
 *        },
 *        "last": {
 *            "href": "/joueurs/?page=1"
 *        },
 *        "first": {
 *            "href": "/joueurs/?page=1"
 *        }
 *    },
 *    "joueurs": [
 *        {
 *            "joueur": {
 *                "idjoueur": 1,
 *                "mail": "admin@admin.com",
 *                "pseudo": "admin",
 *                "role": "a",
 *                "created_at": "2020-03-19T16:40:25.000Z",
 *            },
 *            "links": {
 *                "self": {
 *                    "href": "/joueurs/1"
 *                }
 *            }
 *      }
 *   ],
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get("/joueurs", (req, res) => {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let page = req.param('page');
                if (typeof page === 'undefined' || page <= 0) page = 1;

                let countJoueurs = `SELECT * FROM joueur`;

                let count = 0;
                db.query(countJoueurs, (err, result) => {
                    if (err) console.log(err);
                    else {
                        count = result.length

                        let pageMax = Math.ceil(count / 10);
                        if (page > pageMax) page = pageMax;
                        let debutLimit = (page - 1) * 10;

                        let queryJoueurs = `SELECT idJoueur, mail, pseudo, role, created_at FROM joueur limit ${debutLimit}, 10`;
                        db.query(queryJoueurs, (errJoueurs, resultJoueurs) => {
                            if (errJoueurs) console.log(errJoueurs);
                            else {
                                let next = parseInt(page) + 1;
                                if (next > pageMax) next = pageMax;

                                let prev = page - 1;
                                if (prev < 1) prev = 1;

                                resultJoueurs.forEach(function (j, index) {
                                    resultJoueurs[index] = JSON.parse(JSON.stringify({
                                        joueur: j,
                                        links: { self: { href: "/joueurs/" + j.idJoueur } }
                                    }));
                                });
                                res.json({
                                    "type": "collection",
                                    "count": count,
                                    "links": {
                                        "next": {
                                            "href": "/joueurs/?page=" + next
                                        },
                                        "prev": {
                                            "href": "/joueurs/?page=" + prev
                                        },
                                        "last": {
                                            "href": "/joueurs/?page=" + pageMax
                                        },
                                        "first": {
                                            "href": "/joueurs/?page=1"
                                        },
                                    },
                                    "joueurs": resultJoueurs
                                });
                            }
                        });
                    }
                })
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /joueurs/:id Informations joueur
 * @apiDescription Requête pour afficher les informations d'un joueur.
 * @apiName GetJoueurById
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiParam {Number} id ID du joueur
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Object} links  Liste des liens des pages des résultats.
 * @apiSuccess {Link} links.self  Lien pour afficher les informations sur le joueur.
 * @apiSuccess {Object} joueur  Informations d'un joueur.
 * @apiSuccess {Number} joueur.idjoueur  ID du joueur.
 * @apiSuccess {String} joueur.mail  Mail du joueur.
 * @apiSuccess {String} joueur.pseudo  Pseudo du joueur.
 * @apiSuccess {Decimal} joueur.role  Role du joueur, "a" pour administrateur et "u" pour utilisateur simple.
 * @apiSuccess {Number} joueur.created_at  Date de création du joueur.
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "type": "ressource",
 *      "links": {
 *          "self": "/joueurs/1"
 *      },
 *      "joueur": {
 *          "id": 1,
 *          "mail": "gand@gmail.com",
 *          "pseudo": "adminGand",
 *          "role": "a",
 *          "created_at": "2020-03-19T16:40:25.000Z"
 *      }
 * }
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get("/joueurs/:id", function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let queryJoueurById = `SELECT idJoueur, mail, pseudo, role, created_at from joueur WHERE idJoueur = ${req.params.id}`;

                db.query(queryJoueurById, (errJoueurId, resultjoueurId) => {
                    if (errJoueurId) {
                        let erreur = {
                            "type": "error",
                            "error": 500,
                            "message": errJoueurId
                        };
                    } else if (resultjoueurId == "") {
                        let erreur = {
                            "type": "error",
                            "error": 404,
                            "message": req.params.id + " n'existe pas"
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    } else {
                        res.json({
                            "type": "ressource",
                            "links": {
                                "self": "/joueurs/" + req.params.id
                            },
                            "joueur": {
                                "id": resultjoueurId[0].idJoueur,
                                "mail": resultjoueurId[0].mail,
                                "pseudo": resultjoueurId[0].pseudo,
                                "role": resultjoueurId[0].role,
                                "created_at": resultjoueurId[0].created_at
                            }
                        });
                    }
                });
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /joueurs/:id/parties Afficher parties d'un joueur
 * @apiDescription Requête pour afficher toutes les parties d'un seul joueur.
 * @apiName GetPartiesByJoueur
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiParam {Number} id ID du joueur
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Object} links  Lien du joueur.
 * @apiSuccess {Link} links.self  Lien pour afficher les informations sur le joueur.
 * @apiSuccess {Object} parties  Informations d'un joueur.
 * @apiSuccess {Number} parties.partiejoueur.idPartie  ID de la partie.
 * @apiSuccess {String} parties.partiejoueur.token  Token de la partie.
 * @apiSuccess {String} parties.partiejoueur.nb_photos  Nombre de photos de la partie.
 * @apiSuccess {String} parties.partiejoueur.statut Statut de la partie.
 * @apiSuccess {Number} parties.partiejoueur.score Score de la partie.
 * @apiSuccess {Number} parties.partiejoueur.temps Temps de la partie.
 * @apiSuccess {Number} parties.partiejoueur.refJoueur Id du joueur de la partie.
 * @apiSuccess {Number} parties.partiejoueur.refSerie Id de la série de la partie.
 * @apiSuccess {String} parties.partiejoueur.created_at Date de création de la partie.
 * @apiSuccess {Object} links Lister de liens des différentes parties.
 * @apiSuccess {Link} links.self Lien pour accéder aux informations d'une partie.
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "type": "ressource",
 *   "links": {
 *       "joueur": "/joueurs/1"
 *   },
 *   "parties": [
 *       {
 *           "partiejoueur": {
 *               "idPartie": "10050ca0-7037-11ea-97e1-83de28a49500",
 *               "token": "sha1$3ec70132$1$ed287caeb5638a7bfeb4b902b2d4b234a26df659",
 *               "nb_photos": 5,
 *               "statut": "Terminée",
 *               "score": 0,
 *               "temps": 43,
 *               "refJoueur": 1,
 *               "refSerie": 1,
 *               "created_at": "2020-03-27T14:27:18.000Z",
 *           },
 *           "links": {
 *              "self": {
 *                   "href": "/parties/10050ca0-7037-11ea-97e1-83de28a49500"
 *               }
 *           }
 *       },
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get("/joueurs/:id/parties", function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let page = req.param('page');
                if (typeof page === 'undefined' || page <= 0) page = 1;
                let debutLimit = (page - 1) * 10;

                let queryPartiesJoueur = `SELECT idPartie, token, nb_photos, statut, score, temps, refJoueur, refSerie, created_at  FROM partie WHERE refJoueur = ${req.params.id} limit ${debutLimit}, 10`;

                let count = 0;

                db.query(queryPartiesJoueur, (errPartiesJoueur, resultPartiesJoueur) => {
                    if (errPartiesJoueur) {
                        let erreur = {
                            "type": "error",
                            "error": 500,
                            "message": errPartiesJoueur
                        };
                    } else if (resultPartiesJoueur == "") {
                        let erreur = {
                            "type": "error",
                            "error": 404,
                            "message": "L'utilisateur " + req.params.id + " n'existe pas ou n'a pas joué de parties."
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    } else {
                        count = resultPartiesJoueur.length;

                        let pageMax = Math.ceil(count / 10);
                        if (page > pageMax) page = pageMax;

                        let next = parseInt(page) + 1;
                        if (next > pageMax) next = pageMax;

                        let prev = page - 1;
                        if (prev < 1) prev = 1;

                        resultPartiesJoueur.forEach(function (pj, index) {
                            resultPartiesJoueur[index] = JSON.parse(JSON.stringify({
                                partiejoueur: pj,
                                links: { self: { href: "/parties/" + pj.idPartie } }
                            }));
                        });
                        res.json({
                            "type": "ressource",
                            "links": {
                                "joueur": "/joueurs/" + req.params.id
                            },
                            "parties": resultPartiesJoueur
                        });
                    }
                })
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
})

/**
 * @api {get} /series Afficher séries
 * @apiDescription Requête pour afficher toutes les séries.
 * @apiName GetSeries
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Number} count Nombre de séries.
 * @apiSuccess {Number} size Nombre maximum de séries sur la page.
 * @apiSuccess {Object} links  Liste des liens des pages des résultats.
 * @apiSuccess {Link} links.next  Lien de la page suivante des résultats.
 * @apiSuccess {Link} links.prev  Lien de la page précédente des résultats.
 * @apiSuccess {Link} links.last  Lien de la dernière page des résultats.
 * @apiSuccess {Link} links.first  Lien de la première page des résultats.
 * @apiSuccess {Object} series  Liste des séries.
 * @apiSuccess {Object} serie  Informations d'une série.
 * @apiSuccess {Number} series.serie.idSerie  ID de la série.
 * @apiSuccess {String} series.serie.ville  Ville de la série.
 * @apiSuccess {Decimal} series.serie.latitude  Latitude de la ville.
 * @apiSuccess {Decimal} series.serie.longitude  Longitude de la ville.
 * @apiSuccess {Number} series.serie.zoom  Zoom correspondant à l'affichage de la carte.
 * @apiSuccess {Number} series.serie.dist  Distance pour calculer le score.
 * @apiSuccess {Date} series.serie.created_at  Date de création de la série.
 * @apiSuccess {Date} series.serie.updated_at  Date de modification de la série.
 * @apiSuccess {Date} series.serie.deleted_at  Date de suppression de la série.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "type": "collection",
 *       "count" : 1,
 *       "size" : 10,
 *       "links": {
 *           "next": {
 *               "href": "/series/?page=1"
 *           },
 *           "prev": {
 *               "href": "/series/?page=1"
 *           },
 *          "first": {
 *              "href": "/series/?page=1"
 *           }
 *       },
 *       "series": [
 *          {
 *              "serie": {
 *                  "idSerie": 1,
 *                  "ville": "Nancy",
 *                  "latitude": 48.692054,
 *                  "longitude": 6.184417,
 *                  "zoom": 15,
 *                  "dist": 50,
 *                  "created_at": "2020-03-19T16:12:52.000Z",
 *                  "updated_at": "2020-03-19T16:12:52.000Z",
 *                  "deleted_at": null
 *              }
 *          }
 *       ]
 *     }
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get('/series', function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let page = req.param('page');
                if (typeof page === 'undefined' || page <= 0) page = 1;
                let debutLimit = (page - 1) * 10;

                let querySeries = `SELECT * FROM serie order by ville ASC limit ${debutLimit}, 10`;

                let count = 0;
                db.query(querySeries, (errSeries, resultSeries) => {
                    if (errSeries) {
                        let erreur = {
                            "type": "error",
                            "error": 500,
                            "message": errSeries
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    }
                    else {
                        count = resultSeries.length;

                        let pageMax = Math.ceil(count / 10);
                        if (page > pageMax) page = pageMax;

                        let next = parseInt(page) + 1;
                        if (next > pageMax) next = pageMax;

                        let prev = page - 1;
                        if (prev < 1) prev = 1;

                        resultSeries.forEach(function (s, index) {
                            resultSeries[index] = JSON.parse(JSON.stringify({
                                serie: s,
                                links: { self: { href: "/series/" + s.idSerie } }
                            }));
                        });
                        res.json({
                            "type": "collection",
                            "count": count,
                            "size": 10,
                            "links": {
                                "next": {
                                    "href": "/series/?page=" + next
                                },
                                "prev": {
                                    "href": "/series/?page=" + prev
                                },
                                "first": {
                                    "href": "/series/?page=1"
                                },
                            },
                            "series": resultSeries
                        });
                    }
                });
            }
        });
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /series/:id Afficher série
 * @apiDescription Requête pour afficher une série.
 * @apiName GetSerieById
 * @apiGroup BackOffice
 * 
 * @apiParam {Number} id ID de la série
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Object} links  Lien de la série.
 * @apiSuccess {Object} series  Informations d'une série.
 * @apiSuccess {Number} series.idSerie  ID de la série.
 * @apiSuccess {String} series.ville  Ville de la série.
 * @apiSuccess {Decimal} series.latitude  Latitude de la ville.
 * @apiSuccess {Decimal} series.longitude  Longitude de la ville.
 * @apiSuccess {Number} series.zoom  Zoom correspondant à l'affichage de la carte.
 * @apiSuccess {Number} series.dist  Distance pour calculer le score.
 * @apiSuccess {Date} series.created_at  Date de création de la série.
 * @apiSuccess {Object} photos Liste de toutes les photos de la série.
 * @apiSuccess {Number} photos.idPhoto Id de la photo.
 * @apiSuccess {String} photos.descr Description de la photo.
 * @apiSuccess {String} photos.url Url de la photo.
 * @apiSuccess {Number} photos.latitude Latitude de la photo.
 * @apiSuccess {Number} photos.longitude Longitude de la photo.
 * @apiSuccess {refSerie} photos.refSerie Id de la série correspondante.
 * @apiSuccess {Date} photos.created_at  Date de création de la photo.
 * @apiSuccess {Date} photos.updated_at  Date de modification de la photo.
 * @apiSuccess {Date} photos.deleted_at  Date de suppression de la photo.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "type": "resource",
 *   "links": {
 *       "self": {
 *           "href": "/series/1"
 *       }
 *   },
 *   "series": {
 *       "idSerie": 1,
 *       "ville": "Nancy",
 *       "latitude": 48.692054,
 *       "longitude": 6.184417,
 *       "zoom" : 15
 *       "dist": 50,
 *       "created_at": "2020-03-27T17:42:32.000Z",
 *       "photos": [
 *           {
 *               "photo": {
 *                   "idPhoto": 1,
 *                   "descr": "Place Stanislas",
 *                   "url": "https://www.petitfute.com/medias/professionnel/30049/premium/600_450/223989-nancy-place-stanislas.jpg",
 *                   "latitude": 48.6936184,
 *                   "longitude": 6.183241299999999,
 *                   "refSerie": 1,
 *                  "created_at": "2020-03-27T17:43:27.000Z",
 *                   "updated_at": "2020-03-27T17:43:27.000Z",
 *                   "deleted_at": null
 *            }
 *  },
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get('/series/:id', function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let querySerieId = `SELECT * FROM serie WHERE idSerie = ${req.params.id}`;

                db.query(querySerieId, (errSerieId, resultSerieId) => {
                    if (errSerieId) {
                        let erreur = {
                            "type": "error",
                            "error": 500,
                            "message": errSerieId
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    } else if (resultSerieId == "") {
                        let erreur = {
                            "type": "error",
                            "error": 404,
                            "message": "L'id " + req.params.id + " n'existe pas"
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    }
                    else {
                        let queryPhotos = `SELECT * FROM photo WHERE refSerie = ${req.params.id}`;

                        db.query(queryPhotos, (errPhotos, resultPhotos) => {
                            if (errPhotos) {
                                let erreur = {
                                    "type": "error",
                                    "error": 500,
                                    "message": errPhotos
                                };
                                JSON.stringify(erreur);
                                res.send(erreur);
                            }
                            else if (resultPhotos == "") {
                                let erreur = {
                                    "type": "error",
                                    "error": 404,
                                    "message": "L'id " + req.params.id + " n'existe pas"
                                };
                                JSON.stringify(erreur);
                                res.send(erreur);
                            }
                            else {
                                resultPhotos.forEach(function (p, index) {
                                    resultPhotos[index] = JSON.parse(JSON.stringify({
                                        photo: p,
                                    }));
                                });

                                res.json({
                                    "type": "resource",
                                    "links": {
                                        "self": {
                                            "href": "/series/" + req.params.id
                                        },
                                    },
                                    "series": {
                                        "idSerie": resultSerieId[0].idSerie,
                                        "ville": resultSerieId[0].ville,
                                        "latitude": resultSerieId[0].latitude,
                                        "longitude": resultSerieId[0].longitude,
                                        "zoom": resultSerieId[0].zoom,
                                        "dist": resultSerieId[0].dist,
                                        "created_at": resultSerieId[0].created_at,
                                        "photos": resultPhotos
                                    }
                                });
                            }
                        });
                    }
                });
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /parties Afficher parties
 * @apiDescription Requête pour afficher toutes les parties.
 * @apiName GetParties
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Number} count Nombre de parties.
 * @apiSuccess {Number} size Nombre maximum de parties sur la page.
 * @apiSuccess {Object} links  Liste des liens des pages des résultats.
 * @apiSuccess {Link} links.next  Lien de la page suivante des résultats.
 * @apiSuccess {Link} links.prev  Lien de la page précédente des résultats.
 * @apiSuccess {Link} links.last  Lien de la dernière page des résultats.
 * @apiSuccess {Link} links.first  Lien de la première page des résultats.
 * @apiSuccess {Object} parties  Liste des parties.
 * @apiSuccess {Object} partie  Informations d'une partie.
 * @apiSuccess {Number} parties.partie.idPartie  ID de la partie.
 * @apiSuccess {String} parties.partie.token  Token de la partie.
 * @apiSuccess {Number} parties.partie.nb_photos  Nombre de photos dans la partie.
 * @apiSuccess {String} parties.partie.statut  Statut de la partie.
 * @apiSuccess {Number} parties.partie.score  Zoom correspondant à l'affichage de la carte.
 * @apiSuccess {Number} parties.partie.temps  Durée de la partie en seconde.
 * @apiSuccess {Number} parties.partie.refJoueur Id du joueur de la partie.
 * @apiSuccess {Number} parties.partie.refSerie Id de la série de la partie.
 * @apiSuccess {Date} parties.partie.created_at  Date de création de la partie.
 * @apiSuccess {Date} parties.partie.updated_at  Date de modification de la partie.
 * @apiSuccess {Date} parties.partie.deleted_at  Date de suppression de la partie.
 * @apiSuccess {Object} links Lien de la partie.
 * @apiSuccess {Link} links.self Informations sur la partie seulement.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *   "type": "collection",
 *   "count": 2,
 *   "size": 10,
 *   "links": {
 *       "next": {
 *           "href": "/parties/?page=1"
 *       },
 *       "prev": {
 *           "href": "/parties/?page=1"
 *       },
 *       "last": {
 *           "href": "/parties/?page=1"
 *       },
 *       "first": {
 *           "href": "/parties/?page=1"
 *       }
 *   },
 *   "parties": [
 *       {
 *           "partie": {
 *               "idPartie": "032b8f70-705c-11ea-bf83-6119755a76f1",
 *               "token": "sha1$419ae0ed$1$7b6ccf3154799a0010e010e80c89a4c62c9c8f72",
 *               "nb_photos": 5,
 *               "statut": "Terminée",
 *               "score": 39,
 *               "temps": 44,
 *               "refJoueur": 2,
 *               "refSerie": 1,
 *               "created_at": "2020-03-27T18:51:48.000Z",
 *               "updated_at": "2020-03-27T18:52:36.000Z",
 *               "deleted_at": null
 *           },
 *           "links": {
 *               "self": {
 *                   "href": "/parties/032b8f70-705c-11ea-bf83-6119755a76f1"
 *               }
 *           }
 *       },
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get("/parties", function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let page = req.param('page');
                if (typeof page === 'undefined' || page <= 0) page = 1;

                let countParties = `SELECT * FROM partie`
                let count = 0;
                db.query(countParties, (err, result) => {
                    if (err) console.log(err);
                    else {
                        count = result.length;

                        let pageMax = Math.ceil(count / 10);
                        if (page > pageMax) page = pageMax;
                        let debutLimit = (page - 1) * 10;

                        let queryParties = `SELECT * FROM partie limit ${debutLimit}, 10`;
                        db.query(queryParties, (errParties, resultParties) => {
                            if (errParties) console.log(errParties);
                            else {

                                let next = parseInt(page) + 1;
                                if (next > pageMax) next = pageMax;

                                let prev = page - 1;
                                if (prev < 1) prev = 1;

                                resultParties.forEach(function (p, index) {
                                    resultParties[index] = JSON.parse(JSON.stringify({
                                        partie: p,
                                        links: { self: { href: "/parties/" + p.idPartie } }
                                    }));
                                });
                                res.json({
                                    "type": "collection",
                                    "count": count,
                                    "size": 10,
                                    "links": {
                                        "next": {
                                            "href": "/parties/?page=" + next
                                        },
                                        "prev": {
                                            "href": "/parties/?page=" + prev
                                        },
                                        "last": {
                                            "href": "/parties/?page=" + pageMax
                                        },
                                        "first": {
                                            "href": "/parties/?page=1"
                                        },
                                    },
                                    "parties": resultParties
                                });
                            }
                        });
                    }
                });
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /parties/:id Afficher partie
 * @apiDescription Requête pour afficher une seule.
 * @apiName GetPartieById
 * @apiGroup BackOffice
 * 
 * @apiParam {Number} id ID de la partie
 *
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Number} count Nombre de parties.
 * @apiSuccess {Number} size Nombre maximum de parties sur la page.
 * @apiSuccess {Object} links  Liste des liens des pages des résultats.
 * @apiSuccess {Link} links.next  Lien de la page suivante des résultats.
 * @apiSuccess {Link} links.prev  Lien de la page précédente des résultats.
 * @apiSuccess {Link} links.last  Lien de la dernière page des résultats.
 * @apiSuccess {Link} links.first  Lien de la première page des résultats.
 * @apiSuccess {Object} partie  Informations d'une partie.
 * @apiSuccess {Number} partie.idPartie  ID de la partie.
 * @apiSuccess {String} partie.token  Token de la partie.
 * @apiSuccess {Number} partie.nb_photos  Nombre de photos dans la partie.
 * @apiSuccess {String} partie.statut  Statut de la partie.
 * @apiSuccess {Number} partie.temps  Durée de la partie en seconde.
 * @apiSuccess {Number} partie.score  Zoom correspondant à l'affichage de la carte.
 * @apiSuccess {Number} partie.refJoueur Id du joueur de la partie.
 * @apiSuccess {Number} partie.refSerie Id de la série de la partie.
 * @apiSuccess {Date} parties.partie.created_at  Date de création de la partie.
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "type": "ressource",
 *   "links": {
 *       "self": "/parties/47194f30-705a-11ea-997b-a1367d26846d"
 *   },
 *   "partie": {
 *       "id": "47194f30-705a-11ea-997b-a1367d26846d",
 *       "token" : "sha1$c86415f8$1$f536b07df60615e365128084d841529f07f3f3d5",
 *       "nb_photos": 15,
 *       "temps": 156,
 *       "statut": "Terminée",
 *       "score": 81,
 *       "refSerie": 1,
 *       "refJoueur": 2,
 *       "created_at": "2020-03-27T18:39:23.000Z",
 *   }
 * }
 * @apiError 400 Aucune Authorization Bearer Token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 */
app.get('/parties/:id', function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {

                let queryPartiesId = `SELECT * FROM partie WHERE idPartie = '${req.params.id}'`;

                db.query(queryPartiesId, (errPartieId, resultPartieId) => {
                    if (errPartieId) {
                        let erreur = {
                            "type": "error",
                            "error": 500,
                            "message": err
                        };
                    } else if (resultPartieId == "") {
                        let erreur = {
                            "type": "error",
                            "error": 404,
                            "message": req.params.id + " n'existe pas"
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    } else {
                        res.json({
                            "type": "ressource",
                            "links": {
                                "self": "/parties/" + req.params.id,
                            },
                            "partie": {
                                "id": resultPartieId[0].idPartie,
                                "token": resultPartieId[0].token,
                                "nb_photos": resultPartieId[0].nb_photos,
                                "temps": resultPartieId[0].temps,
                                "statut": resultPartieId[0].statut,
                                "score": resultPartieId[0].score,
                                "refSerie": resultPartieId[0].refSerie,
                                "refJoueur": resultPartieId[0].refJoueur,
                                "created_at": resultPartieId[0].created_at,
                            }
                        });
                    }
                });
            }
        });
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

// POST

/**
 * @api {post} /series Ajouter série
 * @apiDescription Requête pour ajouter une série.
 * @apiName PostSeries
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * @apiHeader {Object} body  Informations de la série à renseigner en json.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "ville": "Nancy",
 *       "latitude": 48.6880756,
 *       "longitude": 6.1384175,
 *       "zoom": 15,
 *       "dist": 10
 *     }
 * 
 * @apiSuccess {String} ville  Ville de la série.
 * @apiSuccess {Decimal} latitude  Latitude de la ville.
 * @apiSuccess {Decimal} longitude  Longitude de la ville.
 * @apiSuccess {Number} zoom  Zoom correspondant à l'affichage de la carte.
 * @apiSuccess {Number} dist  Distance pour calculer le score.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "ville": "Nancy",
 *       "latitude": 48.6880756,
 *       "longitude": 6.1384175,
 *       "zoom": 12,
 *       "dist": 10
 *     }
 * 
 * @apiError 400 Aucune Authorization Bearer Token ou mauvaises informations concernant la série.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Veuillez entrez les informations suivantes : ville, référence de la carte et dist"
 *     }
 */
app.post("/series", (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                if (!req.body.ville || !req.body.lat || !req.body.long || !req.body.zoom || !req.body.dist) res.status(400).json({ "type": "error", "error": 400, "message": "Veuillez entrez les informations suivantes : ville, référence de la carte et dist" });
                else {
                    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
                    db.query(`INSERT INTO serie (ville, latitude,longitude, zoom, dist, created_at, updated_at) VALUES ("${req.body.ville}","${req.body.lat}","${req.body.long}","${req.body.zoom}","${req.body.dist}","${dateAct}","${dateAct}")`, (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send(JSON.stringify(err));
                        } else {
                            res.status(201).json(req.body);
                        }
                    });
                }
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {post} /photos Ajouter photo
 * @apiDescription Requête pour ajouter une photo.
 * @apiName PostPhotos
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * @apiHeader {Object} body  Informations de la photo à renseigner en json.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "descr": "Place Stanislas",
 *       "url": "https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg",
 *       "latitude": 48.6936184,
 *       "longitude": 6.1810526,
 *       "refSerie": 1
 *     }
 * 
 * @apiSuccess {String} descr  Description de la photo.
 * @apiSuccess {String} url  Url de la photo.
 * @apiSuccess {Decimal} latitude  Latitude de la photo.
 * @apiSuccess {Decimal} longitude  Longitude de la photo.
 * @apiSuccess {Number} refSerie  Référence de la série où se trouve la photo.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "descr": "Place Stanislas",
 *       "url": "https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg",
 *       "latitude": 48.6936184,
 *       "longitude": 6.1810526,
 *       "refSerie": 1
 *     }
 * 
 * @apiError 400 Aucune Authorization Bearer Token, mauvais format du token ou mauvaises informations concernant la photo.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Aucune Authorization Bearer Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Veuillez entrez les informations suivantes : refSerie, descr, position et url"
 *     }
 */
app.post("/photos", (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                if (!req.body.refSerie || !req.body.descr || !req.body.lat || !req.body.lng || !req.body.url) res.status(400).json({ "type": "error", "error": 400, "message": "Veuillez entrez les informations suivantes : refSerie, descr, position et url" });
                else {
                    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
                    db.query(`INSERT INTO photo (refSerie, descr, latitude, longitude, url, created_at, updated_at) VALUES ("${req.body.refSerie}","${req.body.descr}","${req.body.lat}","${req.body.lng}","${req.body.url}","${dateAct}","${dateAct}")`, (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send(JSON.stringify(err));
                        } else {
                            res.status(201).json(req.body);
                        }
                    });
                }
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {post} /joueurs/auth Token auth joueur
 * @apiDescription Requête pour récupérer le token d'authentification du joueur.
 * @apiName PostJoueursAuth
 * @apiGroup BackOffice
 * 
 * @apiHeader {String} username  Adresse mail du joueur - Authorization (Basic Auth).
 * @apiHeader {String} password  Mot de passe du joueur - Authorization (Basic Auth).
 * 
 * @apiSuccess {String} token  Token d'authentification du joueur.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUwNjg4NDF9.k3tKJg1BmTidIGYk0g5ap9Sa0CXyIMxtRL90sOhCdOE"
 *     }
 * 
 * @apiError 401 Aucune Authorization Basic Auth ou mauvaise adresse mail ou mot de passe.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "401",
 *       "message": "Aucune Authorization Basic Auth"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Mauvais Token"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "401",
 *       "message": "Mauvaise adresse mail ou mot de passe"
 *     }
 */
app.post("/joueurs/auth", (req, res) => {
    let mail, password;

    if (req.headers.authorization) {
        const base64Credentials = req.headers.authorization.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
        mail = credentials.split(':')[0]
        password = credentials.split(':')[1]

        db.query(`select idJoueur, mail, role, password from joueur where mail = "${mail}"`, (err, result) => {
            if (err) {
                let erreur = {
                    "type": "error",
                    "error": 500,
                    "message": err
                };
                JSON.stringify(erreur);
                res.send(erreur);
            } else if (result.length == 0) {
                let erreur = {
                    "type": "error",
                    "error": 404,
                    "message": mail + " n'existe pas"
                };
                JSON.stringify(erreur);
                res.send(erreur);
            } else {
                if (mail == result[0].mail && passwordHash.verify(password, result[0].password)) {
                    let token = jwt.sign({}, 'privateKeyApi', { algorithm: 'HS256' })
                    res.json({ id: result[0].idJoueur, token: token, role: result[0].role })
                } else res.status(401).json({ "type": "error", "error": 401, "message": "Mauvaise adresse mail ou mot de passe" })
            }
        })
    } else res.status(401).json({ "type": "error", "error": 401, "message": "Aucune Authorization Basic Auth" })
})

// Les autres méthodes ne sont pas allowed

app.all("/*", (req, res) => {
    let erreur = {
        "type": "error",
        "error": 400,
        "message": "BAD REQUEST"
    }
    JSON.stringify(erreur)
    res.send(erreur)
});

app.listen(PORT, HOST);
console.log(`Atelier API Running on http://${HOST}:${PORT}`);

const db = mysql.createConnection({
    host: "mysql.atelier",
    user: "atelier_bdd",
    password: "atelier_bdd",
    database: "atelier_bdd"
});

db.connect(err => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to database");
    }

});

// Pour y accéder, port 19080