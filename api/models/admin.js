const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const { Model } = Sequelize;

class Admin extends Model {}
Admin.init(
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email ID',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'admin',
    timestamps: false,
    underscored: true,
  },
);

Admin.sync()
  .then(result => console.log(result))
  .catch(err => console.log(err));

module.exports = Admin;
