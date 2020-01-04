const express = require('express');
const router = express();

const AdminController = require('../controllers/admin');

router.post('/signup', AdminController.admin_signup);

router.post('/login', AdminController.admin_login);

router.delete('/:id', AdminController.admin_delete);

module.exports = router;
