// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const userModel = require('./users.model')

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const blog = sequelizeClient.define('blog', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    main_image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  blog.associate = function (models) {
    blog.belongsTo(userModel(app), {
      foreignKey: "user_id",
      onDelete: "RESTRICT",
    });
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return blog;
};
