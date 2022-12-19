'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    console.log(User);
    return [
      queryInterface.bulkInsert('roles', [
        { id: 1, role_name: "Administrator", createdAt: Date.now(), updatedAt: Date.now() },
        { id: 2, role_name: "User", createdAt: Date.now(), updatedAt: Date.now() }
      ])
    ];
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};