const User = require('./user');
const Game = require('./game');
const Category = require('./category');

// User <-> Game relationship
User.hasMany(Game);
Game.belongsToMany(User, { through: 'User_Game' });

// Game <-> Category relationship
Category.hasMany(Game);
Game.belongsTo(Category);

// Category list
categories = [
	"Sandbox",
	"Real - time strategy(RTS)",
	"Shooters(FPS and TPS)",
	"Multiplayer online battle arena(MOBA)",
	"Role - playing(RPG, ARPG, and More)",
	"Simulation and sports",
	"Puzzlers and party games",
	"Action - adventure",
	"Survival and horror",
	"Platformer",
]

// Populate categories
categories.forEach(category => {
	Category.findOrCreate({
		where: {
			name: category
		},
		defaults: {
			name: category
		}
	})
});