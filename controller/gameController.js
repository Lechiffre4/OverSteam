var { db } = require('../database/database');
var asyncLib = require('async');
const utils = require('../utils');

// Routes
module.exports = {
	// All games function
	getAllGames: function (req, res) {
		const games = db.models.Game.findAll()
			.then(function (games) {
				if (games) {
					res.status(201).json(games);
				} else {
					res.status(404).json({ 'error': 'no games were found' });
				}
			}).catch(function (err) {
				res.status(500).json({ 'error': 'cannot fetch games' });
			});
	},

	// Games by gategory function
	getGamesByCategory: function (req, res) {
		// get params
		const category = req.query.id;

		const games = db.models.Game.findAll({
			where: {
				categoryId: category
			}
		}).then(function (games) {
			if (games) {
				res.status(201).json(games);
			} else {
				res.status(404).json({ 'error': 'no games were found' });
			}
		}).catch(function (err) {
			res.status(500).json({ 'error': 'cannot fetch games' });
		});
	},

	addGame: function (req, res) {

		var name = req.body.name;
		var desc = req.body.description;
		var link = req.body.link;
		var author = utils.getUserId(req.headers.authorization);
		var category = req.body.category;

		console.log("name: " + name);
		console.log("desc: " + desc);
		console.log("link: " + link);
		console.log("author: " + author);
		console.log("category: " + category);

		asyncLib.waterfall([
			function (done) {
				db.models.Game.findOne({
					attributes: ['name'],
					where: { name: name }
				})
					.then(function (GameFound) {
						done(null, GameFound);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'Unable to verify game' });
					});
			},
			function (GameFound, done) {
				if (!GameFound) {
					done(null, GameFound);
				} else {
					return res.status(409).json({ 'error': 'This game already exist' });
				}
			}
		]);
	},


	addtoMyGames: function (req, res) {
		//var name = utils.getUserId(req.headers.authorization);
		var name = req.body.userid;
		var game = req.body.gameid;

		asyncLib.waterfall([
			function (done) {
				db.models.User_Game.findOne({
					attributes: ['UserId', 'GameId'],
					where: { UserId: name, GameId: game }
				})
					.then(function (GameFound) {
						done(null, GameFound);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'Unable to verify game' });
					});
			},
			function (GameFound, done) {
				if (!GameFound) {
					done(null, GameFound);
				} else {
					return res.status(409).json({ 'error': 'You already have this game' });
				}
			},
			function (GameFound, done) {
				var newGame = db.models.User_Game.create({
					GameId: game,
					UserId: name
				})
					.then(function (newGame) {
						done(newGame);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'Cannot add this game' });
					});
			}
		], function (newGame) {
			if (newGame) {
				return res.status(201).json({
					GameId: game,
					UserId: name
				});
			} else {
				return res.status(500).json({ 'error': 'Cannot add this game' });
			}
		});

	},

	getGamesByUser: function (req, res) {
		// get header
		var user = utils.getUserId(req.headers.authorization);

		asyncLib.waterfall([
			function (done) {
				db.models.User_Game.findAll({
					attributes: ['GameId'],
					where: { UserId: user }
				})
					.then(function (games) {
						done(null, games);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'Unable to verify game' });
					});
			},
			function (games, done) {
				if (games) {
					done(null, games);
				} else {
					return res.status(404).json({ 'error': 'No games were found' });
				}
			},
			function (games, done) {
				var gameIds = [];
				games.forEach(function (game) {
					gameIds.push(game.GameId);
				});
				done(null, gameIds);
			},
			function (gameIds, done) {
				db.models.Game.findAll({
					where: { id: gameIds }
				})
					.then(function (games) {
						done(null, games);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'Unable to verify game' });
					});
			}
		]);
	}
};
