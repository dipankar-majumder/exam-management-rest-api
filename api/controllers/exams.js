const Exam = require('../models/exam');
const sequelize = require('../database/sequelize');

exports.exams_create_exam = (req, res, next) => {
  sequelize.sync().then(() => {
    Exam.build({ name: req.body.examName })
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Exam created successfully',
          createdExam: result,
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
      });
  });
};

exports.exams_get_all = (req, res, next) => {
  Exam.findAll()
    .then(exams => {
      console.log(exams);
      res.status(200).json({
        count: exams.length,
        exams: exams.map(exam => {
          return {
            ...exam.toJSON(),
            request: {
              type: 'GET',
              url: `http://localhost:5000/exams/${exam.id}`,
            },
          };
        }),
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err });
    });
};

exports.exams_update_exam = (req, res, next) => {
  res.status(500).json('Under Mantainence⛔');
};
