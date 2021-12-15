var { db } = require('../database/database');
var asyncLib = require('async');
const utils = require('../utils');

// Routes
module.exports = {
	// All games function
	getAllGames: function (req, res) {
		var games = [];

		db.models.Game.findAll({
			attributes: ['id', 'name', 'description', 'link', 'UserId', 'CategoryId'],
		})
			.then(function (rawGgames) {
				if (rawGgames.length == 0) {
					return res.status(201).json({ 'games': [] });
				}
				rawGgames.forEach(function (currentGame) {
					//get game
					var game = {
						id: currentGame.dataValues.id,
						name: currentGame.dataValues.name,
						description: currentGame.dataValues.description,
						link: currentGame.dataValues.link,
						category: currentGame.dataValues.CategoryId,
						author: currentGame.dataValues.UserId,
					}
					// replace categoryId with category name
					db.models.Category.findOne({
						where: { id: game.category }
					})
						.then(function (category) {
							game.category = category.dataValues.name;
							// Replace authorId with author name
							db.models.User.findOne({
								where: { id: game.author }
							})
								.then(function (author) {
									game.author = author.dataValues.username;
									games.push(game);
									if (games.length == rawGgames.length) {
										return res.status(201).json(games);
									}
								})
								.catch(function (err) {
									return res.status(500).json({ 'error': 'Unable to fetch author' });
								});
						})
						.catch(function (err) {
							return res.status(500).json({ 'error': 'cannot fetch category' });
						});
				})
			})
			.catch(function (err) {
				return res.status(500).json({ 'error': 'Unable to fetch games' });
			});
	},

	// Games by gategory function
	getGamesByCategory: function (req, res) {
		// get params
		const category = req.query.id;

		var games = [];

		db.models.Game.findAll({
			attributes: ['id', 'name', 'description', 'link', 'UserId', 'CategoryId'],
			where: { CategoryId: category }
		})
			.then(function (rawGgames) {
				if (rawGgames.length == 0) {
					return res.status(201).json({ 'games': [] });
				}
				rawGgames.forEach(function (currentGame) {
					//get game
					var game = {
						id: currentGame.dataValues.id,
						name: currentGame.dataValues.name,
						description: currentGame.dataValues.description,
						link: currentGame.dataValues.link,
						category: currentGame.dataValues.CategoryId,
						author: currentGame.dataValues.UserId,
					}
					// replace categoryId with category name
					db.models.Category.findOne({
						where: { id: game.category }
					})
						.then(function (category) {
							game.category = category.dataValues.name;
							// Replace authorId with author name
							db.models.User.findOne({
								where: { id: game.author }
							})
								.then(function (author) {
									game.author = author.dataValues.username;
									games.push(game);
									if (games.length == rawGgames.length) {
										return res.status(201).json(games);
									}
								})
								.catch(function (err) {
									return res.status(500).json({ 'error': 'Unable to fetch author' });
								});
						})
						.catch(function (err) {
							return res.status(500).json({ 'error': 'cannot fetch category' });
						});
				})
			})
			.catch(function (err) {
				return res.status(500).json({ 'error': 'Unable to fetch games' });
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
			},
			function (GameFound, done) {
				console.log(name);
				var newGame = db.models.Game.create({
					name: name,
					description: desc,
					link: link,
					CategoryId: category,
					UserId: author,
				})
					.then(function (newGame) {
						console.log("newGame");
						done(newGame);
					})
					.catch(function (err) {
						console.log(newGame);
						return res.status(500).json({ 'error': 'Cannot add this game' });
					});
			}
		], function (newGame) {
			if (newGame) {
				return res.status(201).json({
					'game': newGame.id
				});
			} else {
				return res.status(500).json({ 'error': 'Cannot add this game' });
			}
		});
	},

	addtoMyGames: function (req, res) {
		idgame = req.body.id

        var headerAuth = req.body.token;
        console.log(headerAuth)
        var userId = utils.getUserId(headerAuth);
        console.log(userId)

        if (userId < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        db.models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        })
		.then(function (user) {
            if (user) {
                db.models.Game.findOne({
                    attributes: ['id'],
                    where: { id: idgame }
                })
                .then(function (creator)
                {
                    db.models.User_Game.create({
                        GameId: creator.id,
						UserId: user.id
                        })
                    .then(function (result) {
                            res.status(201).json("Added");    
                    })
                    .catch(function (err) {
                        res.status(500).json({ 'error': 'cannot add this game' });
                    });
                })
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });


	},

	getGamesByUser: function (req, res) {
		// get header
		var user = utils.getUserId(req.headers.authorization);

		if (user < 0)
			return res.status(400).json({ 'error': 'wrong token' });

		var games = [];

		db.models.User_Game.findAll({
			attributes: ['GameId'],
			where: { UserId: user }
		})
			.then(function (gameIds) {
				if (gameIds.length == 0) {
					return res.status(201).json({ 'games': [] });
				}
				gameIds.forEach(function (gameId) {
					//get game
					db.models.Game.findOne({
						where: { id: gameId.dataValues.GameId }
					})
						.then(function (game) {
							game = {
								id: game.dataValues.id,
								name: game.dataValues.name,
								description: game.dataValues.description,
								link: game.dataValues.link,
								category: game.dataValues.CategoryId,
								author: game.dataValues.UserId,
							}
							// replace categoryId with category name
							db.models.Category.findOne({
								where: { id: game.category }
							})
								.then(function (category) {
									game.category = category.dataValues.name;
									// Replace authorId with author name
									db.models.User.findOne({
										where: { id: game.author }
									})
										.then(function (author) {
											game.author = author.dataValues.username;
											games.push(game);
											if (games.length == gameIds.length) {
												return res.status(201).json(games);
											}
										})
										.catch(function (err) {
											return res.status(500).json({ 'error': 'Unable to fetch author' });
										});
								})
								.catch(function (err) {
									return res.status(500).json({ 'error': 'cannot fetch category' });
								});
						})
						.catch(function (err) {
							return res.status(500).json({ 'error': 'Unable to verify game' });
						});
				});
			})
			.catch(function (err) {
				return res.status(500).json({ 'error': 'Unable to fetch games' });
			});
	}
};
