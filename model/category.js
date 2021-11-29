'use strict';
module.exports = (sequelize, DataTypes) => {
	var Category = sequelize.define('Category', {
		name: DataTypes.STRING,
	}, {
		classMethods: {
			associate: function (models) {
				models.Category.belongsToMany(models.Game);
			}
		}
	});
	return Category;
}