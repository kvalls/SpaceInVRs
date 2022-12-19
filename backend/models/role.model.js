module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    role_name: {
      type: Sequelize.STRING
    }
  });

  return Role;
};