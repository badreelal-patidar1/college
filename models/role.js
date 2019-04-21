'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Role.associate = function (models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
    })
    Role.hasMany(models.Student, {
      foreignKey: 'studentId',
    })
  };
  return Role;
};