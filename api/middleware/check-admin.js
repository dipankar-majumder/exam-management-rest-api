const Admin = require('../models/admin');

module.exports = (req, res, next) => {
  Admin.findOne({ where: { email: req.userData.email } })
    .then(admin => {
      if (admin) next();
      else res.status(401).json({ message: 'Auth failed' });
    })
    .catch();
};
