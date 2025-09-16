const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    phone: { type: DataTypes.STRING, allowNull: true },
    website: { type: DataTypes.STRING, allowNull: true },
    companyName: { type: DataTypes.STRING, allowNull: true },
    companyCatchPhrase: { type: DataTypes.STRING, allowNull: true },
    addressStreet: { type: DataTypes.STRING, allowNull: true },
    addressCity: { type: DataTypes.STRING, allowNull: true },
    addressZipcode: { type: DataTypes.STRING, allowNull: true },
    geoLat: { type: DataTypes.STRING, allowNull: true },
    geoLng: { type: DataTypes.STRING, allowNull: true },
  }, {
    timestamps: true
  });

  return User;
};