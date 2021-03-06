"use strict";

const bodyparser = require('body-parser');
const express = require("express");
const mysql = require("mysql");
const axios = require('axios');
const uuid = require("uuid/v1");
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
    res.send("WebApp API\n");
});

/**
 * @api {get} /series Afficher série
 * @apiDescription Requête pour afficher une série.
 * @apiName GetSeries
 * @apiGroup WebApp
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiSuccess {String} type  Type de la réponse.
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
 *       "series": [
 *          {
 *              "serie": {
 *                  "idSerie": 1,
 *                  "ville": "Nancy",
 *                  "latitude": 48.692054,
 *                  "longitude": 6.184417,
 *                  "zoom": 12,
 *                  "dist": 10,
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
                let querySeries = `SELECT * FROM serie order by ville ASC`;

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
                        resultSeries.forEach(function (s, index) {
                            resultSeries[index] = JSON.parse(JSON.stringify({
                                serie: s
                            }));
                        });

                        res.json({
                            "type": "collection",
                            "series": resultSeries
                        });
                    }
                });
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /series/:id/photos Afficher photos
 * @apiDescription Requête pour afficher les photos d'une série.
 * @apiName GetSeriesIdPhotos
 * @apiGroup WebApp
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiParam {Number} id  ID de la série.
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Object} photos  Liste des photos d'une série.
 * @apiSuccess {Object} photos.photo  Informations d'une photo.
 * @apiSuccess {Number} photos.photo.idPhoto  ID de la photo.
 * @apiSuccess {String} photos.photo.descr  Description de la photo.
 * @apiSuccess {String} photos.photo.url  Url de la photo.
 * @apiSuccess {Decimal} photos.photo.latitude  Latitude de la photo.
 * @apiSuccess {Decimal} photos.photo.longitude  Longitude de la photo.
 * @apiSuccess {Number} photos.photo.refSerie  Référence de la série où se trouve la photo.
 * @apiSuccess {Date} photos.photo.created_at  Date de création de la photo.
 * @apiSuccess {Date} photos.photo.updated_at  Date de modification de la photo.
 * @apiSuccess {Date} photos.photo.deleted_at  Date de suppression de la photo.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "type": "resource",
 *       "photos": [
 *          {
 *              "photo": {
 *                  "idPhoto": 1,
 *                  "descr": "Place Stanislas",
 *                  "url": "https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvcGxhY2VzdGFuaXNsYXNkZW51aXQuanBn.jpg",
 *                  "latitude": 48.6936184,
 *                  "longitude": 6.1810526,
 *                  "refSerie": 1,
 *                  "created_at": "2020-03-24T17:24:23.000Z",
 *                  "updated_at": "2020-03-24T17:24:23.000Z",
 *                  "deleted_at": null
 *              }
 *          }
 *       ]
 *     }
 * 
 * @apiError 400 Aucune Authorization Bearer Token.
 * @apiError 404 ID série introuvable.
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
 *       "error": "404",
 *       "message": "L'id 'ID de la série' n'existe pas"
 *     }
 */
app.get('/series/:id/photos', function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let queryPhotos = `SELECT * FROM photo WHERE refSerie = ?`;

                db.query(queryPhotos, [req.params.id], (errPhotos, resultPhotos) => {
                    if (errPhotos) {
                        let erreur = {
                            "type": "error",
                            "error": 500,
                            "message": errPhotos
                        };
                        JSON.stringify(erreur);
                        res.send(erreur);
                    }
                    else if (resultPhotos.length == 0) {
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
                                photo: p
                            }));
                        });

                        res.json({
                            "type": "resource",
                            "photos": resultPhotos
                        });
                    }
                });
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {get} /joueurs/:id Informations joueur
 * @apiDescription Requête pour afficher les informations d'un joueur.
 * @apiName GetJoueurById
 * @apiGroup WebApp
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
                let queryJoueurById = `SELECT * from joueur WHERE idJoueur = ?`;

                db.query(queryJoueurById, [req.params.id], (errJoueurId, resultjoueurId) => {
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
                                "created_at": resultjoueurId[0].created_at,
                                "mail": resultjoueurId[0].mail,
                                "pseudo": resultjoueurId[0].pseudo,
                            }
                        });
                    }
                });
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});
/**
 * @api {get} /joueurs/:id/partiesCreees Afficher les parties créées d'un joueur
 * @apiDescription Requête pour afficher toutes les parties créées d'un seul joueur.
 * @apiName GetPartiesCreeesByJoueur
 * @apiGroup WebApp
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiParam {Number} id ID du joueur
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Object} parties  Liste des parties Créées.
 * @apiSuccess {Object} partie Informations sur la partie.
 * @apiSuccess {Number} parties.partie.idPartie  ID de la partie.
 * @apiSuccess {String} parties.partie.token  Token de la partie.
 * @apiSuccess {String} parties.partie.nb_photos  Nombre de photos de la partie.
 * @apiSuccess {String} parties.partie.statut Statut de la partie.
 * @apiSuccess {Number} parties.partie.score Score de la partie.
 * @apiSuccess {Number} parties.partie.temps Temps de la partie.
 * @apiSuccess {Number} parties.partie.refJoueur Id du joueur de la partie.
 * @apiSuccess {Number} parties.partie.refSerie Id de la série de la partie.
 * @apiSuccess {String} parties.partie.created_at Date de création de la partie.
 * @apiSuccess {String} parties.partie.updated_at Date de la mise à jour de la partie.
 * @apiSuccess {String} parties.partie.deleted_at Date de la suppression de la partie.
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "type": "ressource",
 *   "parties": [
 *       {
 *           "partie": {
 *               "idPartie": "032b8f70-705c-11ea-bf83-6119755a76f1",
 *               "token": "sha1$419ae0ed$1$7b6ccf3154799a0010e010e80c89a4c62c9c8f72",
 *               "nb_photos": 5,
 *               "statut": "Créée",
 *               "score": 39,
 *               "temps": 44,
 *              "refJoueur": 2,
 *               "refSerie": 1,
 *               "created_at": "2020-03-27T18:51:48.000Z",
 *               "updated_at": "2020-03-27T18:52:36.000Z",
 *               "deleted_at": null
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
app.get("/joueurs/:id/partiesCreees", function (req, res) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let page = req.param('page');
                if (typeof page === 'undefined' || page <= 0) page = 1;
                let debutLimit = (page - 1) * 10;

                let queryPartiesJoueur = `SELECT * FROM partie WHERE refJoueur = ? AND statut = "Créée" ORDER BY created_at DESC limit ?, 10 `;

                let count = 0;

                db.query(queryPartiesJoueur, [req.params.id, debutLimit], (errPartiesJoueur, resultPartiesJoueur) => {
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
                                partie: pj,
                            }));
                        });
                        res.json({
                            "type": "ressource",
                            "parties": resultPartiesJoueur
                        });
                    }
                })
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
})

/**
 * @api {get} /joueurs/:id/partieTerminees Afficher les parties terminées d'un joueur
 * @apiDescription Requête pour afficher toutes les parties terminées d'un seul joueur.
 * @apiName GetPartiesTermineesByJoueur
 * @apiGroup WebApp
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * 
 * @apiParam {Number} id ID du joueur
 * 
 * @apiSuccess {String} type  Type de la réponse.
 * @apiSuccess {Object} parties  Liste des parties Créées.
 * @apiSuccess {Object} partie Informations sur la partie.
 * @apiSuccess {Number} parties.partie.idPartie  ID de la partie.
 * @apiSuccess {String} parties.partie.token  Token de la partie.
 * @apiSuccess {String} parties.partie.nb_photos  Nombre de photos de la partie.
 * @apiSuccess {String} parties.partie.statut Statut de la partie.
 * @apiSuccess {Number} parties.partie.score Score de la partie.
 * @apiSuccess {Number} parties.partie.temps Temps de la partie.
 * @apiSuccess {Number} parties.partie.refJoueur Id du joueur de la partie.
 * @apiSuccess {Number} parties.partie.refSerie Id de la série de la partie.
 * @apiSuccess {String} parties.partie.created_at Date de création de la partie.
 * @apiSuccess {String} parties.partie.updated_at Date de la mise à jour de la partie.
 * @apiSuccess {String} parties.partie.deleted_at Date de la suppression de la partie.
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "type": "ressource",
 *   "parties": [
 *       {
 *           "partie": {
 *               "idPartie": "032b8f70-705c-11ea-bf83-6119755a76f1",
 *               "token": "sha1$419ae0ed$1$7b6ccf3154799a0010e010e80c89a4c62c9c8f72",
 *               "nb_photos": 5,
 *               "statut": "Terminée",
 *               "score": 39,
 *               "temps": 44,
 *              "refJoueur": 2,
 *               "refSerie": 1,
 *               "created_at": "2020-03-27T18:51:48.000Z",
 *               "updated_at": "2020-03-27T18:52:36.000Z",
 *               "deleted_at": null
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
app.get("/joueurs/:id/partiesTerminees", function (req, res) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                let queryPartiesJoueur = `SELECT * FROM partie WHERE refJoueur = ? AND statut = "Terminée" ORDER BY updated_at DESC limit 25`;

                db.query(queryPartiesJoueur, [req.params.id], (errPartiesJoueur, resultPartiesJoueur) => {
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

                        resultPartiesJoueur.forEach(function (pj, index) {
                            resultPartiesJoueur[index] = JSON.parse(JSON.stringify({
                                partie: pj,
                            }));
                        });
                        res.json({
                            "type": "ressource",
                            "parties": resultPartiesJoueur
                        });
                    }
                })
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
})

// POST

/**
 * @api {post} /parties Ajouter partie
 * @apiDescription Requête pour ajouter une partie.
 * @apiName PostParties
 * @apiGroup WebApp
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * @apiHeader {Object} body  Informations de la partie à renseigner en json.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "nb_photos": 10,
 *       "statut": "Créée",
 *       "refJoueur": 1,
 *       "refSerie": 1
 *     }
 * 
 * @apiSuccess {Number} nb_photos  Nombre de photos de la partie.
 * @apiSuccess {String} statut  Statut de la partie.
 * @apiSuccess {Number} refJoueur  Référence du joueur.
 * @apiSuccess {Number} refSerie  Référence de la série.
 * @apiSuccess {String} id  ID de la série.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "nb_photos": 10,
 *       "statut": "Créée",
 *       "refJoueur": 1,
 *       "refSerie": 1,
 *       "id": "a5d3ac70-6eaa-11ea-a58f-ebf0a4b00e90"
 *     }
 * 
 * @apiError 400 Aucune Authorization Bearer Token ou mauvaises informations concernant la partie.
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
 *       "message": "Veuillez entrez les informations suivantes : nb_photos, statut, refJoueur et refSerie"
 *     }
 */
app.post("/parties", (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
            else {
                if (!req.body.nb_photos || !req.body.statut || !req.body.refJoueur || !req.body.refSerie) res.status(400).json({ "type": "error", "error": 400, "message": "Veuillez entrez les informations suivantes : nb_photos, statut, refJoueur et refSerie" });
                else {
                    let id = uuid();
                    let tkn = passwordHash.generate(id);
                    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
                    db.query(`INSERT INTO partie (idPartie, token, nb_photos, statut, score, temps, refJoueur, refSerie, created_at, updated_at) VALUES (?,?,?,?,0,0,?,?,?,?)`, [id, tkn, req.body.nb_photos, req.body.statut, req.body.refJoueur, req.body.refSerie, dateAct, dateAct], (err, result) => {
                        if (err) {
                            let erreur = {
                                "type": "error",
                                "error": 500,
                                "message": err
                            };
                            JSON.stringify(erreur);
                            res.send(erreur);
                        } else {
                            let resulat = req.body;
                            resulat.id = id;
                            res.status(201).json(resulat);
                        }
                    });
                }
            }
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

/**
 * @api {post} /joueurs Ajouter joueur
 * @apiDescription Requête pour ajouter un joueur.
 * @apiName PostJoueurs
 * @apiGroup WebApp
 * 
 * @apiHeader {Object} body  Informations du joueur à renseigner en json.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "mail": "joueur@gmail.com",
 *       "pseudo": "Joueur",
 *       "mdp": "mdp123456"
 *     }
 * 
 * @apiSuccess {String} mail  Adresse mail du joueur.
 * @apiSuccess {String} pseudo  Pseudonyme du joueur.
 * @apiSuccess {String} mdp  Mot de passe du joueur.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "mail": "joueur@gmail.com",
 *       "pseudo": "Joueur",
 *       "mdp": "mdp123456"
 *     }
 * 
 * @apiError 400 Mauvaises informations concernant le joueur.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "400",
 *       "message": "Veuillez entrez les informations suivantes : mail, pseudo et mdp"
 *     }
 */
app.post("/joueurs", (req, res) => {
    if (!req.body.mail || !req.body.pseudo || !req.body.mdp) res.status(400).json({ "type": "error", "error": 400, "message": "Veuillez entrez les informations suivantes : mail, pseudo et mdp" });
    else {
        let pwd = passwordHash.generate(req.body.mdp);
        let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
        db.query(`INSERT INTO joueur (mail,pseudo,password,role,created_at,updated_at) VALUES (?,?,?,"u",?,?)`, [req.body.mail, req.body.pseudo, pwd, dateAct, dateAct], (err, result) => {
            if (err) {
                let erreur = {
                    "type": "error",
                    "error": 500,
                    "message": err
                };
                JSON.stringify(erreur);
                res.send(erreur);
            } else {
                res.status(201).json(req.body)
            }
        })
    }
});

/**
 * @api {post} /joueurs/auth Token auth joueur
 * @apiDescription Requête pour récupérer le token d'authentification et l'ID du joueur.
 * @apiName PostJoueursAuth
 * @apiGroup WebApp
 * 
 * @apiHeader {String} username  Adresse mail du joueur - Authorization (Basic Auth).
 * @apiHeader {String} password  Mot de passe du joueur - Authorization (Basic Auth).
 * 
 * @apiSuccess {String} token  Token d'authentification du joueur.
 * @apiSuccess {Number} id  ID du joueur.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUwNjg4NDF9.k3tKJg1BmTidIGYk0g5ap9Sa0CXyIMxtRL90sOhCdOE",
 *       "id": 1
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

        db.query(`select idJoueur, mail, password from joueur where mail = ?`, [mail], (err, result) => {
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
                    res.json({ token: token, id: result[0].idJoueur })
                } else res.status(401).json({ "type": "error", "error": 401, "message": "Mauvaise adresse mail ou mot de passe" })
            }
        })
    } else res.status(401).json({ "type": "error", "error": 401, "message": "Aucune Authorization Basic Auth" })
})

// PUT

/**
 * @api {put} /parties/:id Modifier partie
 * @apiDescription Requête pour modifier une partie.
 * @apiName PutPartiesId
 * @apiGroup WebApp
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * @apiHeader {Object} body  Informations de la partie à renseigner en json.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "statut": "Terminée",
 *       "score": 450
 *     }
 * 
 * @apiParam {String} id  ID de la partie.
 * 
 * @apiSuccess {String} statut  Statut de la partie.
 * @apiSuccess {Number} score  Score de la partie.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "statut": "Terminée",
 *       "score": 450
 *     }
 * 
 * @apiError 400 Aucune Authorization Bearer Token ou mauvaises informations concernant la partie.
 * @apiError 404 ID partie introuvable.
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
 *       "message": "Veuillez entrez les informations suivantes : statut, score et temps"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "type": "error",
 *       "error": "404",
 *       "message": "L'id 'ID de la partie' n'existe pas"
 *     }
 */
app.put("/parties/:id", (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'privateKeyApi', { algorithm: "HS256" }, (err) => {
            db.query("SELECT idPartie FROM partie WHERE idPartie = ?", [req.params.id], (err_cmd, result_cmd) => {
                if (err_cmd) {
                    let erreur = {
                        "type": "error",
                        "error": 500,
                        "message": err_cmd
                    };
                    JSON.stringify(erreur);
                    res.send(erreur);
                } else if(result_cmd == "") {
                    let erreur = {
                        "type": "error",
                        "error": 404,
                        "message": req.params.id + " n'est pas un id valide"
                    };
                    JSON.stringify(erreur);
                    res.send(erreur);
                } else if (err) res.status(400).json({ "type": "error", "error": 400, "message": "Mauvais token" })
                else {
                    if (!req.body.statut || typeof req.body.score == 'undefined' || !req.body.temps) res.status(400).json({ "type": "error", "error": 400, "message": "Veuillez entrez les informations suivantes : statut, score et temps" });
                    else {
                        let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
                        db.query(`UPDATE partie SET statut = ?, score = ?,temps = ?, updated_at = ? WHERE idPartie = ?`, [req.body.statut, req.body.score, req.body.temps, dateAct, req.params.id], (err, result) => {
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
                                    "message": "L'id " + req.params.id + " n'existe pas"
                                };
                                JSON.stringify(erreur);
                                res.send(erreur);
                            } else {
                                res.status(201).json(req.body);
                            }
                        });
                    }
                }
            })
        })
    } else res.status(400).json({ "type": "error", "error": 400, "message": "Aucune Authorization Bearer Token" });
});

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
console.log(`WebApp API Running on http://${HOST}:${PORT}`);

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

// Pour y accéder, port 19280