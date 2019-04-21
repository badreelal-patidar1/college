'use strict';
module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define('College', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    phoneNo: DataTypes.INTEGER(15)
  }, {});
  College.associate = function(models) {
    // associations can be defined here\
    College.hasMany(models.Student, {
      foreignKey: 'collegeId',
    })
  };
  return College;
};