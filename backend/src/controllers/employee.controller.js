const { prisma } = require('../config/database');

// List all employees
const listEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { user: { select: { id: true, name: true, email: true, role: true } } }
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true, role: true } } }
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const { userId, department, position, salary, joinDate } = req.body;
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(400).json({ error: "User does not exist" });
    // Ensure only one employee per user
    const existing = await prisma.employee.findUnique({ where: { userId } });
    if (existing) return res.status(400).json({ error: "Employee already exists for this user" });

    const employee = await prisma.employee.create({
      data: {
        userId,
        department,
        position,
        salary: parseFloat(salary),
        joinDate: new Date(joinDate)
      }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update employee data
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { department, position, salary, joinDate } = req.body;
    // Optionally, check if employee exists first
    const updated = await prisma.employee.update({
      where: { id },
      data: {
        department,
        position,
        salary: salary ? parseFloat(salary) : undefined,
        joinDate: joinDate ? new Date(joinDate) : undefined
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id } });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
