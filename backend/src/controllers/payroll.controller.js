const { prisma } = require('../config/database');

// Process payroll for an employee for a month
const processPayroll = async (req, res) => {
  try {
    const { employeeId, month, baseSalary, bonus = 0, deductions = 0 } = req.body;
    
    // Validation: check employee exists
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) return res.status(400).json({ error: 'Employee not found' });

    const total = parseFloat(baseSalary) + parseFloat(bonus) - parseFloat(deductions);

    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        month,
        baseSalary: parseFloat(baseSalary),
        bonus: parseFloat(bonus),
        deductions: parseFloat(deductions),
        total
      }
    });

    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payroll history by employee
const payrollHistory = async (req, res) => {
  try {
    const { employeeId } = req.query;
    if (!employeeId) return res.status(400).json({ error: 'employeeId query parameter is required' });

    const records = await prisma.payroll.findMany({
      where: { employeeId },
      orderBy: { month: 'desc' }
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const { baseSalary, bonus, deductions, month } = req.body;

    // Optional: Validate employee existence if employeeId is to be updated.
    // For now, just update payroll fields

    const updatedPayroll = await prisma.payroll.update({
      where: { id },
      data: {
        baseSalary: baseSalary !== undefined ? parseFloat(baseSalary) : undefined,
        bonus: bonus !== undefined ? parseFloat(bonus) : undefined,
        deductions: deductions !== undefined ? parseFloat(deductions) : undefined,
        month: month || undefined
      }
    });

    res.json(updatedPayroll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.payroll.delete({ where: { id } });
    res.json({ message: 'Payroll record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { processPayroll, payrollHistory, updatePayroll,deletePayroll };
