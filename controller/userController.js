var { db } = require('../database/database');
var jwtUtils = require('../utils');
var bcrypt = require('bcrypt');
var asyncLib = require('async');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,20}$/;

// Routes
module.exports = {
    // Register function
    register: function (req, res) {


        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var passwordVerif = req.body.passwordVerif;


        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'Some parameters are missing' });
        }

        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'Wrong username (must be length 5 - 12)' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'Email is not valid' });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'Wrong password (must length 4 - 20 and include 1 number at least)' });
        }
        if (password != passwordVerif) {
            return res.status(400).json({ 'error': 'Confirmation password is not the same as password ' });
        }

        asyncLib.waterfall([
            function (done) {
                db.models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'Unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'This user already exist' });
                }
            },
            function (userFound, bcryptedPassword, done) {
                var newUser = db.models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    isAdmin: 0
                })
                    .then(function (newUser) {
                        done(newUser);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'Cannot add this user' });
                    });
            }
        ], function (newUser) {
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id
                });
            } else {
                return res.status(500).json({ 'error': 'Cannot add this user' });
            }
        });
    },

    // Login function
    login: function (req, res) {

        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Some parameters are missing' });
        }

        asyncLib.waterfall([
            function (done) {
                db.models.User.findOne({
                    where: { email: email }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'Unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'This user does not exist in the database' });
                }
            },
            function (userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'Wrong password' });
                }
            }
        ], function (userFound) {
            if (userFound) {
                return res.status(201).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            } else {
                return res.status(500).json({ 'error': 'Cannot log on user' });
            }
        });
    },

    // Profile function
    getUserProfile: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['token'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        db.models.User.findOne({
            attributes: ['id', 'email', 'username', 'isAdmin'],
            where: { id: userId }
        }).then(function (user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    },

    // Update function
    updateUserProfile: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['token'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var email = req.body.email;
        var username = req.body.username;

        asyncLib.waterfall([
            function (done) {
                db.models.User.findOne({
                    attributes: ['id', 'email','username'],
                    where: { id: userId }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    userFound.update({
                        email: (email ? email : userFound.email),
                        username: (username ? username : userFound.username)
                    }).then(function () {
                        done(userFound);
                    }).catch(function (err) {
                        res.status(500).json({ 'error': 'cannot update user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function (userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });
    },

    getMyGames: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['token'];
        var userId = jwtUtils.getUserId(headerAuth);
        console.log(headerAuth)
        console.log(userId)

        if (userId < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        db.models.Game.findAll({
            attributes: ['UserId','id','name','description'],
            where: { UserId: userId }
        }).then(function (games) {
            if (games) {
                res.status(201).json(games);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    },

    deletemyGame: function (req, res) {
        
        idgame = req.body.id

        var headerAuth = req.body.token;
        console.log(headerAuth)
        var userId = jwtUtils.getUserId(headerAuth);
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
                    attributes: ['UserId'],
                    where: { id: idgame }
                })
                .then(function (creator)
                {
                    if(user.id == creator.UserId)
                    {
                        //delete
                        db.models.Game.destroy({
                            attributes: ['UserId'],
                                where: {
                                    id: idgame
                                }
                            })
                        .then(function (result) {
                                res.status(201).json("Deleted");    
                        })
                        .catch(function (err) {
                            res.status(500).json({ 'error': 'cannot delete game' });
                        });



                    }
                    else {
                        res.status(500).json({ 'error': 'thats not your game' });
                    }
                })
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });

    }

    

}