const express = require('express');

const ExamsController = require('../controllers/exams');

const router = express.Router();

router.get('/', ExamsController.exams_get_all);
router.post('/', ExamsController.exams_create_exam);

module.exports = router;
