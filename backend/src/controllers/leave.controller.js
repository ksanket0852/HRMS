const { prisma } = require('../config/database');

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const {
      employeeId,
      startDate,
      endDate,
      type,
      reason
    } = req.body;

    // Validate employee exists
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) return res.status(400).json({ error: 'Employee not found' });

    const leave = await prisma.leave.create({
      data: {
        employeeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type,
        reason,
        status: 'Pending'
      }
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all leave requests (HR/Admin view)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany({
      include: { employee: { select: { id: true, userId: true } } },
      orderBy: { appliedAt: 'desc' }
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leave requests by employee
const getLeavesByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const leaves = await prisma.leave.findMany({
      where: { employeeId },
      orderBy: { appliedAt: 'desc' }
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve or reject leave (HR/Admin)
const reviewLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewerId } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedLeave = await prisma.leave.update({
      where: { id },
      data: {
        status,
        reviewedAt: new Date(),
        reviewerId
      }
    });
    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete leave request (optional)
const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.leave.delete({ where: { id } });
    res.json({ message: 'Leave request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  applyLeave,
  getAllLeaves,
  getLeavesByEmployee,
  reviewLeave,
  deleteLeave
};
