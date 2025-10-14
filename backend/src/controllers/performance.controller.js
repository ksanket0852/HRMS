const { prisma } = require('../config/database');

// Create performance review for an employee
const createReview = async (req, res) => {
  try {
    const { employeeId, review, rating, reviewDate } = req.body;

    // Validate employee existence
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) return res.status(400).json({ error: 'Employee not found' });

    const performance = await prisma.performance.create({
      data: {
        employeeId,
        review,
        rating,
        reviewDate: reviewDate ? new Date(reviewDate) : new Date()
      }
    });
    res.status(201).json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get performance reviews by employee
const getReviewsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const reviews = await prisma.performance.findMany({
      where: { employeeId },
      orderBy: { reviewDate: 'desc' }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a performance review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating, reviewDate } = req.body;

    const updatedReview = await prisma.performance.update({
      where: { id },
      data: {
        review,
        rating,
        reviewDate: reviewDate ? new Date(reviewDate) : undefined
      }
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a performance review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.performance.delete({ where: { id } });
    res.json({ message: 'Performance review deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByEmployee,
  updateReview,
  deleteReview
};
