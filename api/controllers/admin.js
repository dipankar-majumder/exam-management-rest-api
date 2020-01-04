const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

exports.admin_signup = (req, res, next) => {
  Admin.findOne({ where: { email: req.body.email } })
    .then(admin => {
      if (admin) {
        res.status(409).json({ msg: 'Mail exists' });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ err });
          } else {
            Admin.create({
              email: req.body.email,
              password: hash,
            })
              .then(result => {
                console.log(result);
                res.status(201).json({ msg: 'Admin created' });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ err });
              });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

exports.admin_login = (req, res, next) => {
  Admin.findOne({ where: { email: req.body.email } })
    .then(admin => {
      if (admin) {
        bcrypt.compare(req.body.password, admin.password, (err, result) => {
          if (err) {
            return res.status(401).json({ msg: 'Auth failed' });
          }
          if (result) {
            const token = jwt.sign(
              { email: admin.email, id: admin.id },
              process.env.JWT_KEY,
              { expiresIn: 60 },
            );
            return res.status(200).json({ msg: 'Auth successful', token });
          } else {
            res.status(401).json({ msg: 'Auth failed' });
          }
        });
      } else {
        return res.status(401).json({ msg: 'Auth failed' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

exports.admin_delete = (req, res, next) => {
  console.log(req.params.id);
  Admin.findOne({ where: { id: req.params.id } })
    .then(admin => {
      if (admin) {
        Admin.destroy({ where: { id: req.params.id } })
          .then(result => {
            console.log(result);
            res.status(200).json({ msg: 'Admin deleted' });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ err });
          });
      } else {
        res.status(409).json({ msg: 'Admin does not exists' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};
