const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);   // To register as candidate, send role: 'CANDIDATE'
router.post('/login', login);         // To login as candidate, send role: 'CANDIDATE'

module.exports = router;
