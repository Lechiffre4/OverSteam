const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
    id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER,
});

(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();