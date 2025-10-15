import axios from 'axios';

const API_BASE = '/api'; // adjust if needed

export const fetchTotalEmployees = async () => {
  const res = await axios.get(`${API_BASE}/employees`);
  return res.data.length; // total employees count
};

export const fetchRecentHires = async () => {
  const res = await axios.get(`${API_BASE}/employees`);
  // sort descending by joinDate, take recent 3 or configurable count
  return res.data
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 3);
};

export const fetchActiveToday = async () => {
  const today = new Date().toISOString().split('T')[0];
  const res = await axios.get(`${API_BASE}/attendance/report?date=${today}`);
  // count attendance records with status 'Present' or similar criteria
  return res.data.filter(att => att.status === 'Present').length;
};

export const fetchPerformanceScore = async () => {
  const res = await axios.get(`${API_BASE}/performance`);
  // compute average rating or take most recent rating
  const ratings = res.data.map(p => p.rating);
  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length || 0;
  return avgRating.toFixed(1);
};

export const fetchPayrollAmount = async () => {
  const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const res = await axios.get(`${API_BASE}/payroll/summary?month=${thisMonth}`);
  return res.data.total || 0; // assuming backend returns total
};

export const fetchPendingLeaves = async () => {
  const res = await axios.get(`${API_BASE}/leaves`);
  return res.data.filter(leave => leave.status === 'Pending').length;
};

export const fetchPendingJobApplications = async () => {
  const res = await axios.get(`${API_BASE}/jobApplications`);
  return res.data.filter(app => app.status === 'Applied' || app.status === 'Pending').length;
};
