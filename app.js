const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(morgan('short'));

app.post('/addPlayer', (req,res) => {
    var newPlayer = {
        id: req.body.id,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        sport: req.body.sport
    }

    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Simplon318",
        database: "sports"
    })

    var queryAddPlayer = "INSERT INTO players (`id`,`firstName`,`lastName`,`sport`) VALUES ('" + newPlayer.id + "', '" + newPlayer.firstName + "', '" + newPlayer.lastName + "', '" + newPlayer.sport + "');";
    conn.query(queryAddPlayer,[newPlayer],(err,rows,fields) => {
        if(err) throw err;
        console.log("New player added !");
        res.json(rows);
    })
    
})

app.get('/players', (req,res) => {
    //objet afficher en JSON
    var player = {
        firstName: "Grace",
        lastName: "Kitoko"
    }
    //Reponse en format JSON nom complet ou juste prenom ou nom [player.firstName]
    res.json([player.firstName, player.lastName, player]);
})
//récupère tous les joueurs
app.get('/players/allPlayers', (req,res) => {
    console.log("Fetching all players");
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Simplon318",
        database: "sports"
    });
        var queryFetchAllPlayers = "SELECT * FROM players";
        conn.query(queryFetchAllPlayers,(err, rows, fields) => {
                if(err) {
                    console.log("Failed to query for players: " + err)
                    res.sendStatus(500)
                    return
                }
        res.json(rows)
       })

})

app.get('/players/:sport', (req,res) => {
    //permet de récupérer le champ "sport" dans la colonne sport de la table player
    var sportID = req.params.sport;
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Simplon318",
        database: "sports"
    });
        var queryFetchAllPlayers = "SELECT * FROM players WHERE sport = '" + sportID +" '";
        conn.query(queryFetchAllPlayers,(err, rows, fields) => {
                if(err) {
                    console.log("Failed to query for players: " + err)
                    res.sendStatus(500)
                    return
                }
        res.json(rows)
       })

})
//récupère un player spécifique par son id 
app.get('/players/:id', (req,res) => {
    var playerID = req.params.id;
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Simplon318",
        database: "sports"
    });
        var queryFetchOnePlayer = "SELECT * FROM players WHERE id = ?";
        conn.query(queryFetchOnePlayer,[playerID],(err, rows, fields) => {
        if(err) {
            console.log("Failed to query for players: " + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
   })

})

app.put('/updatePlayer', (req, res) => {

        var updatedPlayer = {
            id: req.body.id,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            sport: req.body.sport
        }
        
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Simplon318",
            database: "sports"
        })

        var queryUpdatedPlayer = "UPDATE players SET id = '" + updatedPlayer.id + "', firstName = '" + updatedPlayer.firstName + "', lastName = '" + updatedPlayer.lastName + "', sport = '"+ updatedPlayer.sport +"' WHERE id = '"+ updatedPlayer.id +"';"  
        conn.query(queryUpdatedPlayer,[updatedPlayer],(err,rows,fields) => {
            if(err) throw err;
            console.log("Player with id " + updatedPlayer.id + " successfully updated !!!");
            res.json(rows);
        })

})

app.delete('/deletePlayer/:id', (req,res) => {
            var playerID = req.params.id;
            var conn = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Simplon318",
                database: "sports"
            })

            var queryDeletePlayer = "DELETE FROM players WHERE id= '"+ playerID +"'";
            conn.query(queryDeletePlayer,[playerID],(err,rows,fields) => {
                if(err) throw err;
                console.log("Player with id " + playerID + " deleted successfully!!!");
                res.json(rows);
            })
})



module.exports = app;
