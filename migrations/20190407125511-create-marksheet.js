'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Marksheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rollNo: {
        type: Sequelize.STRING
      },
      studentId: {
        type: Sequelize.STRING
      },
      physics: {
        type: Sequelize.INTEGER
      },
      chemistry: {
        type: Sequelize.INTEGER
      },
      chemistry: {
        type: Sequelize.INTEGER
      },
      maths: {
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Students',
          key: 'id',
          as: 'studentId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Marksheets');
  }
};