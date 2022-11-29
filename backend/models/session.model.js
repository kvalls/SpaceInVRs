module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    score: {
      type: Sequelize.INTEGER
    },
    ships_destroyed: {
      type: Sequelize.INTEGER
    },
    bullets_fired: {
      type: Sequelize.INTEGER
    },
    powerups: {
      type: Sequelize.INTEGER
    },
  });

  Session.associate = function(models) {
    Session.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "user_id",
      as: "users",
    })
  }

  return Session;
};