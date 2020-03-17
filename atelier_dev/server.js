"use strict";

const bodyparser = require('body-parser');
const express = require("express");
const mysql = require("mysql");
const uuid = require("uuid/v1");
const axios = require('axios');
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
    let debutLimit = (page - 1) * 10;

    let queryJoueurs = `SELECT * FROM joueur limit ${debutLimit}, 10`;

    let count = 0;
    db.query(queryJoueurs, (errJoueurs, resultJoueurs) => {
        if (errJoueurs) console.log(errJoueurs);
        else {
            count = resultJoueurs.length;

            let pageMax = Math.ceil(count / 10);
            if (page > pageMax) page = pageMax;

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
});

app.get("/joueurs/:id", function (req, res) {


    let queryJoueurById = `SELECT * FROM joueur WHERE idJoueur = ${req.params.id}`;

    db.query(queryJoueurById, (errJoueurId, resultJoueurId) => {
        if (errJoueurId) {
            let erreur = {
                "type": "error",
                "error": 500,
                "message": err
            };
        } else if (resultJoueurId == "") {
            let erreur = {
                "type": "error",
                "error": 404,
                "message": req.params.id + " n'est pas valide"
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
                    "id": resultJoueurId[0].idJoueur,
                    "created_at": resultJoueurId[0].created_at,
                    "mail": resultJoueurId[0].mail,
                    "nom": resultJoueurId[0].nom,
                }
            });
        }
    });
});

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
                    "last": {
                        "href": "/series/?page=" + pageMax
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
    let debutLimit = (page - 1) * 10;

    let queryParties = `SELECT * FROM partie limit ${debutLimit}, 10`;

    let count = 0;
    db.query(queryParties, (errParties, resultParties) => {
        if (errParties) console.log(errParties);
        else {
            count = resultParties.length;

            let pageMax = Math.ceil(count / 10);
            if (page > pageMax) page = pageMax;

            let next = parseInt(page) + 1;
            if (next > pageMax) next = pageMax;

            let prev = page - 1;
            if (prev < 1) prev = 1;

            resultParties.forEach(function (p, index) {
                resultParties[index] = JSON.parse(JSON.stringify({
                    parties: p,
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
                "message": req.params.id + " n'est pas valide"
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
                        "message": req.params.id + " isn't a valid id"
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
                                "message": req.params.id + " isn't a valid id"
                            };
                            JSON.stringify(erreur);
                            res.send(erreur);
                        } else {
                            res.json({
                                "type": "ressource",
                                "links": {
                                    "self": "/parties/" + req.params.id
                                },
                                "partie": {
                                    "id": resultPartieId[0].idPartie,
                                    "created_at": resultPartieId[0].created_at,
                                    "statut": resultPartieId[0].statut,
                                    "score": resultPartieId[0].score,
                                    "serie": resultSerieId,
                                    "linkSerie": {
                                        "selfSerie" : "/series/" + resultPartieId[0].refSerie
                                    },
                                    "joueur": resultJoueurId,
                                    "linkJoueur": {
                                        "joueur" : "/joueurs/" + resultPartieId[0].refJoueur
                                    },
                                }
                            });
                        }
                    });
                }
            });
        };
    });
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