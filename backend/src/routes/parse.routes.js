const express = require('express');
const multer = require('multer');
const { parseResume } = require('../controllers/parse.controller');
const router = express.Router();

const upload = multer();

// route: POST /api/ai/parse-resume
router.post('/parse-resume', upload.single('resume'), parseResume);

module.exports = router;
