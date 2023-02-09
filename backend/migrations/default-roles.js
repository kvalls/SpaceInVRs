'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // console.log(User);
    return queryInterface.bulkInsert('roles', [
        { id: 1, role_name: "Administrator", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, role_name: "User", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};