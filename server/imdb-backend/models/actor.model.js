module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define("Actor", {
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
  });

  return Actor;
};
