const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const { processPayroll, payrollHistory, updatePayroll, deletePayroll } = require('../controllers/payroll.controller');

const router = express.Router();

router.use(authMiddleware, roleMiddleware('HR', 'ADMIN'));

router.post('/process', processPayroll);
router.get('/history', payrollHistory);
router.put('/:id', roleMiddleware('HR', 'ADMIN'), updatePayroll);
router.delete('/:id', roleMiddleware('HR', 'ADMIN'), deletePayroll);


module.exports = router;
