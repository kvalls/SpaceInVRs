module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    profile_img: {
      type: Sequelize.STRING
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.role, {
      onDelete: "CASCADE",
      foreignKey: {
        field: 'role_id',
        defaultValue: 2
      }
    })
  }

  return User;
};