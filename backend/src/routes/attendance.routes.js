const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const {
  logAttendance,
  getAttendanceReport,
  updateAttendance,
  deleteAttendance
} = require('../controllers/attendance.controller');

const router = express.Router();

router.use(authMiddleware);

router.post('/log', roleMiddleware('EMPLOYEE', 'HR', 'ADMIN'), logAttendance);
router.get('/report', roleMiddleware('EMPLOYEE', 'HR', 'ADMIN'), getAttendanceReport);

router.put('/:id', roleMiddleware('HR', 'ADMIN'), updateAttendance);
router.delete('/:id', roleMiddleware('HR', 'ADMIN'), deleteAttendance);

module.exports = router;
