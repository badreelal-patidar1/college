'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.DATE,
    phoneNo: DataTypes.INTEGER(15),
    gender: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    })
  };
  return User;
};