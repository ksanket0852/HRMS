const { prisma } = require('../config/database');

const logAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, checkIn, checkOut } = req.body;

    // Validate employee existence!
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) return res.status(400).json({ error: 'Invalid employeeId: employee does not exist.' });

    // Check for duplicate attendance for the same day
    let attendance = await prisma.attendance.findFirst({
      where: { employeeId, date: new Date(date) }
    });

    if (attendance) {
      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          status: status || attendance.status,
          checkIn: checkIn ? new Date(checkIn) : attendance.checkIn,
          checkOut: checkOut ? new Date(checkOut) : attendance.checkOut
        }
      });
      return res.json(attendance);
    }

    attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date: new Date(date),
        status,
        checkIn: checkIn ? new Date(checkIn) : undefined,
        checkOut: checkOut ? new Date(checkOut) : undefined
      }
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceReport = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;
    const where = {};
    if (employeeId) where.employeeId = employeeId;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }
    const records = await prisma.attendance.findMany({
      where,
      orderBy: { date: 'desc' }
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, checkIn, checkOut } = req.body;
    const attendance = await prisma.attendance.update({
      where: { id },
      data: {
        status,
        checkIn: checkIn ? new Date(checkIn) : undefined,
        checkOut: checkOut ? new Date(checkOut) : undefined
      }
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.attendance.delete({ where: { id } });
    res.json({ message: 'Attendance deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  logAttendance,
  getAttendanceReport,
  updateAttendance,
  deleteAttendance
};
