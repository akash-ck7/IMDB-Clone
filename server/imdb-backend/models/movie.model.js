module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    name: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
    plot: { type: DataTypes.STRING },
  });

  return Movie;
};
