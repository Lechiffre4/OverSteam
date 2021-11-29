'use strict';
module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function (models) {
				models.User.hasMany(models.Game);
			}
		}
	});
	return User;
}