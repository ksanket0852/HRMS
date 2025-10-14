const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const {
  applyLeave,
  getAllLeaves,
  getLeavesByEmployee,
  reviewLeave,
  deleteLeave
} = require('../controllers/leave.controller');

const router = express.Router();

router.use(authMiddleware);

// Employees can apply and view their leaves
router.post('/', roleMiddleware('EMPLOYEE'), applyLeave);
router.get('/employee/:employeeId', roleMiddleware('EMPLOYEE', 'HR', 'ADMIN'), getLeavesByEmployee);

// HR/Admin can view all and review leaves
router.get('/', roleMiddleware('HR', 'ADMIN'), getAllLeaves);
router.put('/review/:id', roleMiddleware('HR', 'ADMIN'), reviewLeave);
router.delete('/:id', roleMiddleware('HR', 'ADMIN'), deleteLeave);

module.exports = router;
