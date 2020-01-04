const Sequelize = require('sequelize');

const sequelize = new Sequelize('exam_management', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Asia/Kolkata',
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MariaDB Database.');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL database: ', err);
  });

module.exports = sequelize;
