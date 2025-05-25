module.exports = {
  HOST: "localhost",
  USER: "akash",
  PASSWORD: "vidhya1612",
  DB: "imdb_clone",
  DIALECT: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
