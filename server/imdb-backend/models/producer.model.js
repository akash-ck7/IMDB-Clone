module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define("Producer", {
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    bio: { type: DataTypes.STRING },
  });

  return Producer;
};
