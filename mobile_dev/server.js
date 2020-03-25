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
    res.send("Mobile API\n");
});

/**
 * @api {get} /series Afficher série
 * @apiDescription Requête pour afficher une série.
 * @apiName GetSeries
 * @apiGroup Mobile
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
 */
app.get('/series', function (req, res) {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") token = req.headers.authorization.split(' ')[1];

    if(token != null) {
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
    } else res.status(400).json({"type": "error","error": 400,"message": "Aucune Authorization Bearer Token"});
});

// POST

/**
 * @api {post} /series Ajouter série
 * @apiDescription Requête pour ajouter une série.
 * @apiName PostSeries
 * @apiGroup Mobile
 * 
 * @apiHeader {String} Bearer Token  Token d'authentification du joueur - Authorization (Bearer Token).
 * @apiHeader {Object} body  Informations de la série à renseigner en json.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "ville": "Nancy",
 *       "latitude": 48.6880756,
 *       "longitude": 6.1384175,
 *       "zoom": 12,
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
 *       "message": "Veuillez entrez les informations suivantes : ville, référence de la carte et dist"
 *     }
 */
app.post("/series", (req, res) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") token = req.headers.authorization.split(' ')[1];

    if(token != null) {
        if(!req.body.ville || !req.body.latitude || !req.body.longitude || !req.body.zoom || !req.body.dist) res.status(400).json({"type": "error","error": 400,"message": "Veuillez entrez les informations suivantes : ville, référence de la carte et dist"});
        else {
            let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
            db.query(`INSERT INTO serie (ville, latitude, longitude, zoom, dist, created_at, updated_at) VALUES ("${req.body.ville}","${req.body.latitude}","${req.body.longitude}","${req.body.zoom}","${req.body.dist}","${dateAct}","${dateAct}")`, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(JSON.stringify(err));
                } else {
                    res.status(201).json(req.body);
                }
            });
        }
    } else res.status(400).json({"type": "error","error": 400,"message": "Aucune Authorization Bearer Token"});
});

/**
 * @api {post} /photos Ajouter photo
 * @apiDescription Requête pour ajouter une photo.
 * @apiName PostPhotos
 * @apiGroup Mobile
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
 * @apiError 400 Aucune Authorization Bearer Token ou mauvaises informations concernant la photo.
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
 *       "message": "Veuillez entrez les informations suivantes : refSerie, descr, position et url"
 *     }
 */
app.post("/photos", (req, res) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") token = req.headers.authorization.split(' ')[1];

    if(token != null) {
        if(!req.body.refSerie || !req.body.descr || !req.body.latitude || !req.body.longitude || !req.body.url) res.status(400).json({"type": "error","error": 400,"message": "Veuillez entrez les informations suivantes : refSerie, descr, position et url"});
        else {
            let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
            db.query(`INSERT INTO photo (descr, url, latitude, longitude, refSerie, created_at, updated_at) VALUES ("${req.body.descr}","${req.body.url}","${req.body.latitude}","${req.body.longitude}","${req.body.refSerie}","${dateAct}","${dateAct}")`, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(JSON.stringify(err));
                } else {
                    res.status(201).json(req.body);
                }
            });
        }
    } else res.status(400).json({"type": "error","error": 400,"message": "Aucune Authorization Bearer Token"});
});

/**
 * @api {post} /joueurs/auth Token auth joueur
 * @apiDescription Requête pour récupérer le token d'authentification du joueur.
 * @apiName PostJoueursAuth
 * @apiGroup Mobile
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
 *       "error": "401",
 *       "message": "Mauvaise adresse mail ou mot de passe"
 *     }
 */
app.post("/joueurs/auth", (req, res) => {
    let mail, password;

    if(req.headers.authorization) {
        const base64Credentials = req.headers.authorization.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
        mail = credentials.split(':')[0]
        password = credentials.split(':')[1]

        db.query(`select mail, password from joueur where mail = "${mail}"`, (err, result) => {
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
                if(mail == result[0].mail && passwordHash.verify(password, result[0].password)) {
                    let token = jwt.sign({}, 'privateKeyApi', {algorithm: 'HS256'})
                    res.json({token: token})
                } else res.status(401).json({"type": "error","error": 401,"message": "Mauvaise adresse mail ou mot de passe"})
            }
        })
    } else res.status(401).json({"type": "error","error": 401,"message": "Aucune Authorization Basic Auth"})
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
console.log(`Mobile API Running on http://${HOST}:${PORT}`);

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

// Pour y accéder, port 19180