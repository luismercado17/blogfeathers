// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const userModel = require('./users.model');
const blogModel = require('./blogs.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const comments = sequelizeClient.define('comments', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  comments.associate = function (models) {
    comments.belongsTo(userModel(app), {
      foreignKey: "user_id",
      onDelete: "RESTRICT",
    });
    comments.belongsTo(blogModel(app), {
      foreignKey: "blog_id",
      onDelete: "RESTRICT",
    });
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return comments;
};
