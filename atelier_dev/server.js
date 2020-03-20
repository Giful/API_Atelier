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

app.get("/joueurs", (req, res) => {

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

            let queryJoueurs = `SELECT * FROM joueur limit ${debutLimit}, 10`;
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
                        "size": 10,
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
});

app.get("/joueurs/:id", function (req, res) {

    let queryJoueurById = `SELECT * from joueur WHERE idJoueur = ${req.params.id}`;

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
                    "created_at": resultjoueurId[0].created_at,
                    "mail": resultjoueurId[0].mail,
                    "pseudo": resultjoueurId[0].pseudo,
                }
            });
        }
    });
});

app.get("/joueurs/:id/parties", function (req, res) {

    let page = req.param('page');
    if (typeof page === 'undefined' || page <= 0) page = 1;
    let debutLimit = (page - 1) * 10;

    let queryPartiesJoueur = `SELECT idPartie, nb_photos, statut, score, created_at FROM partie WHERE refJoueur = ${req.params.id} limit ${debutLimit}, 10`;

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
})

app.get('/series', function (req, res) {
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
});

app.get('/series/:id', function (req, res) {
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
            let queryPhotos = `SELECT * FROM photo WHERE idSerie = ${req.params.id}`;

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
                            links: { self: { href: "/photos/" + p.idPhoto } }
                        }));
                    });

                    res.json({
                        "type": "resource",
                        "links": {
                            "self": {
                                "href": "/series/" + req.params.id
                            },
                            "photos": {
                                "href": "/series/" + req.params.id + "/photos/"
                            }
                        },
                        "series": {
                            "idSerie": resultSerieId[0].idSerie,
                            "ville": resultSerieId[0].ville,
                            "mapRef": resultSerieId[0].mapRef,
                            "dist": resultSerieId[0].dist,
                            "created_at": resultSerieId[0].created_at,
                            "photos": resultPhotos
                        }
                    });
                }
            });
        }
    });
});

app.get('/series/:id/photos', function (req, res) {
    let queryPhotos = `SELECT * FROM photo WHERE idSerie = ${req.params.id}`;

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
                    links: { self: { href: "/photos/" + p.idPhoto } }
                }));
            });

            res.json({
                "type": "resource",
                "photos": resultPhotos
            });
        }
    });
});

app.get('/photos/:id', function (req, res) {
    let queryPhotosId = `SELECT * FROM photo WHERE idPhoto = ${req.params.id}`;

    db.query(queryPhotosId, (errPhotosId, resultPhotosId) => {
        if (errPhotosId) {
            let erreur = {
                "type": "error",
                "error": 500,
                "message": errPhotosId
            };
            JSON.stringify(erreur);
            res.send(erreur);
        }
        else if (resultPhotosId == "") {
            let erreur = {
                "type": "error",
                "error": 404,
                "message": "L'id " + req.params.id + " n'existe pas"
            };
            JSON.stringify(erreur);
            res.send(erreur);
        }
        else {
            res.json({
                "type": "resource",
                "links": {
                    "self": {
                        "href": "/photos/" + req.params.id
                    }
                },
                "photo": resultPhotosId
            });
        }
    });
});

app.get("/parties", function (req, res) {
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
});

app.get('/parties/:id', function (req, res) {

    let queryPartiesId = `SELECT * FROM partie WHERE idPartie = ${req.params.id}`;

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
            let querySerieId = `SELECT * FROM serie WHERE idSerie = ${resultPartieId[0].refSerie}`;
            db.query(querySerieId, (errSerieId, resultSerieId) => {
                if (errSerieId) {
                    let erreur = {
                        "type": "error",
                        "error": 500,
                        "message": err2
                    };
                    JSON.stringify(erreur);
                    res.send(erreur);
                } else if (resultSerieId === "") {
                    let erreur = {
                        "type": "error",
                        "error": 404,
                        "message": req.params.id + " n'existe pas"
                    };
                    JSON.stringify(erreur);
                    res.send(erreur);
                } else {
                    let queryJoueurId = `SELECT * FROM joueur WHERE idJoueur = ${resultPartieId[0].refJoueur}`;
                    db.query(queryJoueurId, (errJoueurId, resultJoueurId) => {
                        if (errJoueurId) {
                            let erreur = {
                                "type": "error",
                                "error": 500,
                                "message": err2
                            };
                            JSON.stringify(erreur);
                            res.send(erreur);
                        } else if (resultJoueurId === "") {
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
                                    "joueur": "/joueurs/" + resultPartieId[0].refJoueur,
                                    "serie": "/series/" + resultPartieId[0].refSerie
                                },
                                "partie": {
                                    "id": resultPartieId[0].idPartie,
                                    "created_at": resultPartieId[0].created_at,
                                    "nb_photos": resultPartieId[0].nb_photos,
                                    "statut": resultPartieId[0].statut,
                                    "score": resultPartieId[0].score,
                                    "serie": resultSerieId,
                                    "joueur": resultJoueurId,
                                }
                            });
                        }
                    });
                }
            });
        };
    });
});

// POST

app.post("/series", (req, res) => {
    //if(!req.body.ville || !req.body.mapRef || !req.body.dist) res.status(400).end("Veuillez entrez les informations suivantes : ville, mapRef et dist");
    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
    db.query(`INSERT INTO serie (ville, mapRef, dist, created_at, updated_at) VALUES ("${req.body.ville}","${req.body.mapRef}","${req.body.dist}","${dateAct}","${dateAct}")`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(201).json(req.body);
        }
    });
});

app.post("/photos", (req, res) => {
    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
    db.query(`INSERT INTO photo (refSerie, descr, position, url, created_at, updated_at) VALUES ("${req.body.refSerie}","${req.body.descr}","${req.body.position}","${req.body.url}","${dateAct}","${dateAct}")`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(201).json(req.body);
        }
    });
});


app.post("/joueur", (req, res) => {
    let pwd = passwordHash.generate(req.body.mdp)
    let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
    db.query(`INSERT INTO joueur (mail,pseudo,password,role,created_at,updated_at) VALUES ("${req.body.mail}","${req.body.pseudo}","${pwd}","u","${dateAct}","${dateAct}")`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(201).json(req.body)
        }
    })
});

app.post("/parties", (req, res) => {
    let token = null;
    if (req.headers['x-quizz-token'] != null) token = req.headers['x-quizz-token'];
    if (token != null) {
        let dateAct = new Date().toJSON().slice(0, 19).replace('T', ' ');
        db.query(`INSERT INTO partie (token, nb_photos, statut, refJoueur, refSerie, created_at, updated_at) VALUES ("${token}","${req.body.nb_photos}","${req.body.statut}","${req.body.refJoueur}","${req.body.refSerie}","${dateAct}","${dateAct}")`, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(JSON.stringify(err));
            } else {
                res.status(201).json(req.body);
            }
        });
    }
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
                    res.json({id: result[0].idJoueur, token: token})
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