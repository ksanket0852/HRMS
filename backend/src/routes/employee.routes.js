const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee.controller');

const router = express.Router();

// All employee CRUD routes - ADMIN & HR only
router.use(authMiddleware, roleMiddleware('ADMIN', 'HR'));

router.get('/', listEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
