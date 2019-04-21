'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      role: 'Admin',
      description: "It has all permissions",
      createdAt:new Date(),
      updatedAt:new Date()
    }, {
      role: "Teacher",
      description: "It has permission to add students",
      createdAt:new Date(),
      updatedAt:new Date()
    }, {
      role: "Student",
      description: "It has pemission to view marksheets",
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
