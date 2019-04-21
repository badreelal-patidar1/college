'use strict';
module.exports = (sequelize, DataTypes) => {
  const Marksheet = sequelize.define('Marksheet', {
    rollNo: DataTypes.STRING,
    name: DataTypes.STRING,
    studentId: DataTypes.STRING,
    physics: DataTypes.INTEGER,
    chemistry: DataTypes.INTEGER,
    maths: DataTypes.INTEGER
  }, {});
  Marksheet.associate = function(models) {
    // associations can be defined here
    Marksheet.belongsTo(models.Student, {
      foreignKey: 'studentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  };
  return Marksheet;
};