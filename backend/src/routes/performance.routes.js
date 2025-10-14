const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const {
  createReview,
  getReviewsByEmployee,
  updateReview,
  deleteReview
} = require('../controllers/performance.controller');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Only HR and Admin can manage performance reviews
router.use(roleMiddleware('HR', 'ADMIN'));

// Create review
router.post('/', createReview);

// Get all reviews of an employee
router.get('/employee/:employeeId', getReviewsByEmployee);

// Update review
router.put('/:id', updateReview);

// Delete review
router.delete('/:id', deleteReview);

module.exports = router;
