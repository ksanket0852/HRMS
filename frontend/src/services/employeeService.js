import axios from 'axios';

// Get current employee ID from auth context or local storage
export function getCurrentEmployeeId() {
  // This should come from your auth context/token/localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.employeeId || user.id;
}

// Get current employee name
export function getCurrentEmployeeName() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.name || 'Employee';
}

// Fetch employee profile/details
export async function fetchEmployeeProfile(employeeId) {
  const res = await axios.get(`/api/employees/${employeeId}`);
  return res.data;
}

// Fetch leave balance and leave requests for employee
export async function fetchEmployeeLeaves(employeeId) {
  const res = await axios.get(`/api/leaves/employee/${employeeId}`);
  return res.data;
}

// Calculate leave balance
export async function calculateLeaveBalance(employeeId) {
  const leaves = await fetchEmployeeLeaves(employeeId);
  
  // Total annual leave allocation (this should ideally come from employee profile)
  const totalLeaveAllocation = 20; // days per year
  
  // Calculate used leaves (approved leaves)
  const usedLeaves = leaves
    .filter(leave => leave.status === 'Approved')
    .reduce((total, leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return total + days;
    }, 0);
  
  return totalLeaveAllocation - usedLeaves;
}

// Fetch attendance records for employee
export async function fetchEmployeeAttendance(employeeId, startDate, endDate) {
  const params = new URLSearchParams({
    employeeId,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });
  
  const res = await axios.get(`/api/attendance/report?${params}`);
  return res.data;
}

// Calculate attendance percentage for current month
export async function calculateMonthlyAttendance(employeeId) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const attendance = await fetchEmployeeAttendance(
    employeeId,
    startOfMonth.toISOString().split('T')[0],
    endOfMonth.toISOString().split('T')[0]
  );
  
  const totalDays = attendance.length;
  const presentDays = attendance.filter(
    record => record.status === 'Present' || record.status === 'Late'
  ).length;
  
  return totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
}

// Fetch payroll history for employee
export async function fetchEmployeePayroll(employeeId) {
  const res = await axios.get(`/api/payroll/history?employeeId=${employeeId}`);
  return res.data;
}

// Get available payslips count
export async function getAvailablePayslipsCount(employeeId) {
  const payrolls = await fetchEmployeePayroll(employeeId);
  return payrolls.length;
}

// Fetch performance reviews for employee
export async function fetchEmployeePerformance(employeeId) {
  const res = await axios.get(`/api/performance/employee/${employeeId}`);
  return res.data;
}

// Get latest performance rating
export async function getLatestPerformanceRating(employeeId) {
  const reviews = await fetchEmployeePerformance(employeeId);
  if (reviews.length === 0) return 0;
  
  // Get most recent review
  const latest = reviews.sort((a, b) => 
    new Date(b.reviewDate) - new Date(a.reviewDate)
  )[0];
  
  return latest.rating || 0;
}

// Apply for leave
export async function applyForLeave(employeeId, leaveData) {
  const res = await axios.post('/api/leaves', {
    employeeId,
    ...leaveData,
  });
  return res.data;
}

// Log attendance (check-in/check-out)
export async function logAttendance(employeeId, attendanceData) {
  const res = await axios.post('/api/attendance', {
    employeeId,
    ...attendanceData,
  });
  return res.data;
}

// Fetch employee dashboard stats
export async function fetchEmployeeDashboardStats(employeeId) {
  const [leaveBalance, attendanceRate, payslipsCount, performanceRating] = 
    await Promise.all([
      calculateLeaveBalance(employeeId),
      calculateMonthlyAttendance(employeeId),
      getAvailablePayslipsCount(employeeId),
      getLatestPerformanceRating(employeeId),
    ]);
  
  return {
    leaveBalance,
    attendanceRate,
    payslipsCount,
    performanceRating,
  };
}

// Fetch recent activity for employee
export async function fetchRecentActivity(employeeId) {
  // Fetch recent leaves, attendance, and performance reviews
  const [leaves, payrolls, performance] = await Promise.all([
    fetchEmployeeLeaves(employeeId),
    fetchEmployeePayroll(employeeId),
    fetchEmployeePerformance(employeeId),
  ]);
  
  const activities = [];
  
  // Add recent leave activities
  leaves.slice(0, 2).forEach(leave => {
    activities.push({
      action: `Leave request ${leave.status.toLowerCase()}`,
      time: formatRelativeTime(leave.reviewedAt || leave.appliedAt),
      color: leave.status === 'Approved' ? 'bg-green-500' : 
             leave.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500',
      timestamp: new Date(leave.reviewedAt || leave.appliedAt),
    });
  });
  
  // Add recent payroll activities
  if (payrolls.length > 0) {
    activities.push({
      action: `Payslip for ${payrolls[0].month} available`,
      time: formatRelativeTime(payrolls[0].createdAt),
      color: 'bg-blue-500',
      timestamp: new Date(payrolls[0].createdAt),
    });
  }
  
  // Add recent performance reviews
  if (performance.length > 0) {
    activities.push({
      action: 'Performance review submitted',
      time: formatRelativeTime(performance[0].reviewDate),
      color: 'bg-purple-500',
      timestamp: new Date(performance[0].reviewDate),
    });
  }
  
  // Sort by most recent and return top 3
  return activities
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);
}

// Helper function to format relative time
function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
}
