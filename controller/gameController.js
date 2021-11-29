var { db } = require('../database/database');
var asyncLib = require('async');
const Category = require('../model/category');

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

	addGame: function (req, res) {

		var name = req.body.name;
		var desc = req.body.description;
		var link = req.body.link;
		var author = req.body.author;
		var category = req.body.category;

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
			},
			function (GameFound, done) {
				var newGame = db.models.Game.create({
					name: name,
					description: desc,
					link: link,
					UserId: {
						name: author
					},
					CategoryId: {
						name: category
					},
				}, {
					include: Category,
					include: User,
				})
					.then(function (newGame) {
						console.log(newGame);
						done(newGame);
					})
					.catch(function (err) {
						return res.status(500).json({ 'error': 'Cannot add this game' });
					});
			}
		], function (newGame) {
			if (newGame) {
				return res.status(201).json({
					'game': newGame.id
				});
			} else {
				console.log("error");
				return res.status(500).json({ 'error': 'Cannot add this game' });
			}
		});
	}
};
