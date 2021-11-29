'use strict';
module.exports = (sequelize, DataTypes) => {
	var Game = sequelize.define('Game', {
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		date: DataTypes.DATE,
	}, {
		classMethods: {
			associate: function (models) {
				models.Game.hasMany(models.Category);
				models.Game.belongsToMany(models.User);
			}
		}
	});
	return Game;
}