'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      dob: '1984-05-05',
      phoneNo:"9999999999",
      gender:'male',
      roleId:1,
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
