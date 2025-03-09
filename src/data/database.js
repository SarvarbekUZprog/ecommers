const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Path to your SQLite database file
  logging: false, // Disable logging of SQL queries, set to true if you need to debug
});

module.exports = sequelize;
