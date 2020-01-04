const express = require('express');
const router = express();

const TeacherController = require('../controllers/teacher');

router.get('/', TeacherController.teachers_get_all);

module.exports = router;
