const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const Teacher = require('../models/teacher');

const { Model } = Sequelize;

class Exam extends Model {}
Exam.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    semester: {
      type: Sequelize.INTEGER,
    },
    questionPaperSeter: {
      type: Sequelize.INTEGER,
      references: { model: Teacher, key: 'id' },
    },
    hallGuard: {
      type: Sequelize.INTEGER,
      references: { model: Teacher, key: 'id' },
    },
    answerPaperChecker: {
      type: Sequelize.INTEGER,
      references: { model: Teacher, key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'exam',
    timestamps: false,
    underscored: true,
  },
);

Exam.sync()
  .then(result => console.log(result))
  .catch(err => console.log(err));

module.exports = Exam;
