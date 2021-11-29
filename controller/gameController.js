var { db } = require('../database/database');
var jwtUtils = require('../utils');
var asyncLib = require('async');

// Routes
module.exports = {
    // All games function
    getAllGames: function (req, res) {
        console.log("getAllGames");
        const games = db.models.Game.findAll()
            .then(function (games) {
                if (games) {
                    res.status(201).json(games);
                    console.log(JSON.stringify(games, null, 2));
                } else {
                    res.status(404).json({ 'error': 'no games were found' });
                }
            }).catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch games' });
            });
    },

    addGame: function(req,res){

        var name = req.body.name;
        var desc = req.body.desc;
        var link = req.body.link;
        var category = req.body.category;

        console.log("getAllGames");
        const games = db.models.Game.findAll()
            .then(function (games) {
                if (games) {
                    res.status(201).json(games);
                    console.log(JSON.stringify(games, null, 2));
                } else {
                    res.status(404).json({ 'error': 'no games were found' });
                }
            }).catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch games' });
            });
    },
};
