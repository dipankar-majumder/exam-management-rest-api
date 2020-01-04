const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Teacher = require('../models/teacher');

exports.teacher_signup = (req, res, next) => {
  // Find a Teacher of given email
  Teacher.findOne({ where: { email: req.body.email } })
    .then(teacher => {
      // if Teacher exist
      if (teacher) {
        res.status(409).json({ message: 'Mail exists' });
      } else {
        // Encrypt the password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            // Create a Teacher
            Teacher.create({
              email: req.body.email,
              password: hash,
              type: req.body.type,
            })
              .then(result =>
                res.status(201).json({ message: 'Teacher created' }),
              )
              .catch(err => res.status(500).json({ error: err }));
          }
        });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.teacher_login = (req, res, next) => {
  Teacher.findOne({ where: { email: req.body.email } })
    .then(teacher => {
      if (teacher) {
        bcrypt.compare(req.body.password, teacher.password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: 'Auth failed' });
          }
          if (result) {
            const token = jwt.sign(
              { email: teacher.email, teacherId: teacher.id },
              process.env.JWT_KEY,
              { expiresIn: 60 },
            );
            res.status(200).json({ message: 'Auth successful', token: token });
          } else {
            res.status(401).json({ message: 'Auth failed' });
          }
        });
      } else {
        return res.status(401).json({ message: 'Auth failed' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.teachers_get_all = (req, res, next) => {
  Teacher.findAll({ attributes: ['id', 'email', 'type'] })
    .then(teachers =>
      res.status(200).json({ count: teachers.length, teachers }),
    )
    .catch(err => res.status(500).json({ error: err }));
};

exports.teacher_delete = (req, res, next) => {
  console.log(req.params.teacherId);
  Teacher.findOne({ where: { id: req.params.teacherId } })
    .then(teacher => {
      if (teacher) {
        Teacher.destroy({ where: { id: req.params.teacherId } })
          .then(result => res.status(200).json({ message: 'Teacher deleted' }))
          .catch(err => res.status(500).json({ error: err }));
      } else {
        res.status(409).json({ message: 'Teacher does not exists' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
};
