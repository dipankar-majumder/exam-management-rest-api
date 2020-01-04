const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const { Model } = Sequelize;

class Teacher extends Model {}
Teacher.init(
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
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
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'teacher',
    timestamps: false,
    underscored: true,
  },
);

Teacher.sync()
  .then(result => console.log(result))
  .catch(err => console.log(err));

module.exports = Teacher;
