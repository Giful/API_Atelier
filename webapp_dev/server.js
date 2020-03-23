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
    res.send("WebApp API\n");
});

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
    } else res.status(400).json({"type": "error","error": 400,"message": "Aucun Bearer Token en paramètre Header"});
});

app.get('/series/:id/photos', function (req, res) {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") token = req.headers.authorization.split(' ')[1];

    if(token != null) {
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
                        photo: p
                    }));
                });

                res.json({
                    "type": "resource",
                    "photos": resultPhotos
                });
            }
        });
    } else res.status(400).json({"type": "error","error": 400,"message": "Aucun Bearer Token en paramètre Header"});
});

// POST

app.post("/parties", (req, res) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer") token = req.headers.authorization.split(' ')[1];

    if (token != null) {
        let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
        db.query(`INSERT INTO partie (token, nb_photos, statut, refJoueur, refSerie, created_at, updated_at) VALUES ("${token}","${req.body.nb_photos}","${req.body.statut}","${req.body.refJoueur}","${req.body.refSerie}","${dateAct}","${dateAct}")`, (err, result) => {
            if (err) {
                let erreur = {
                    "type": "error",
                    "error": 500,
                    "message": err
                };
                JSON.stringify(erreur);
                res.send(erreur);
            } else {
                res.status(201).json(req.body);
            }
        });
    }
});

app.post("/joueurs", (req, res) => {
    let pwd = passwordHash.generate(req.body.mdp)
    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
    db.query(`INSERT INTO joueur (mail,pseudo,password,role,created_at,updated_at) VALUES ("${req.body.mail}","${req.body.pseudo}","${pwd}","u","${dateAct}","${dateAct}")`, (err, result) => {
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
});

app.post("/joueurs/auth", (req, res) => {
    let mail, password;

    if(req.headers.authorization) {
        const base64Credentials = req.headers.authorization.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
        mail = credentials.split(':')[0]
        password = credentials.split(':')[1]

        db.query(`select idJoueur, mail, password from joueur where mail = "${mail}"`, (err, result) => {
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
                    res.json({token: token, id: result[0].idJoueur})
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