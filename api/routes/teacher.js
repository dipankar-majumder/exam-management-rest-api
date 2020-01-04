const express = require('express');
const router = express();

const TeacherController = require('../controllers/teacher');

router.post('/signup', TeacherController.teacher_signup);

router.post('/login', TeacherController.teacher_login);

router.delete('/:teacherId', TeacherController.teacher_delete);

module.exports = router;
