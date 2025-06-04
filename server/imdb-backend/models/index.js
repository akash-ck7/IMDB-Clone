const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const dbConfig = require("../config/db.config.js");
console.log("Loaded DB config:", dbConfig);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Movie = require("./movie.model")(sequelize, DataTypes);
db.Actor = require("./actor.model")(sequelize, DataTypes);
db.Producer = require("./producer.model")(sequelize, DataTypes);

// Movie ↔️ Actor (Many-to-Many)
db.Movie.belongsToMany(db.Actor, { through: "MovieActors" });
db.Actor.belongsToMany(db.Movie, { through: "MovieActors" });

// Movie → Producer (Many-to-One)
db.Producer.hasMany(db.Movie);
db.Movie.belongsTo(db.Producer);

module.exports = db;
