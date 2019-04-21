'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    collegeId: DataTypes.STRING,
    collegeName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    gender:DataTypes.STRING,
    phoneNo: DataTypes.INTEGER(15)
  
  }, {});
  Student.associate = function (models) {
    // // associations can be defined here
    Student.belongsTo(models.College, {
      foreignKey: 'collegeId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    Student.hasMany(models.Marksheet, {
      foreignKey: 'studentId',
    })
  };
  return Student;
};