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

app.get("/joueurs", (req, res) => {

    let page = req.param('page');
    let queryJoueurs = `Select * from joueurs`;

    res.send("slt");
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
                    links: {self: {href: "/series/" + s.idSerie}}
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
    let querySerieId = `SELECT * FROM serie WHERE id_serie = ${req.params.id}`;

    db.query(querySerieId, (errSerieId, resultSerieId) => {
        if (errSerieId) {
            let erreur = {
                "type": "error",
                "error": 500,
                "message": errSerieId
            };
            JSON.stringify(erreur);
            res.send(erreur);
        } else if(resultSerieId == "") {
            let erreur = {
                "type": "error",
                "error": 404,
                "message": "L'id " + req.params.id + " n'existe pas"
            };
            JSON.stringify(erreur);
            res.send(erreur);
        }
        else {
            let queryPhotos = `SELECT * FROM photo WHERE id_serie = ${req.params.id}`;

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
                else if(resultPhotos == "") {
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
                            links: {self: {href: "/photos/" + p.id_photo}}
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
                            "photos": resultPhotos
                        }
                    });
                }
            });



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
                    links: {self: {href: "/series/" + s.id_serie}}
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
    }else{
        console.log("Connected to database");
    }
    
});

// Pour y accéder, port 19080