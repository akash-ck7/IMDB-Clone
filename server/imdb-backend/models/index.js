const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
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
