import axios from 'axios';

// Fetch all employees from backend
export async function fetchEmployees() {
  const res = await axios.get('/api/employees');
  return res.data.map(emp => ({
    id: emp.id,
    name: emp.name,
    email: emp.email,
    phone: emp.phone || 'N/A',
    department: emp.department || 'N/A',
    position: emp.position || 'N/A',
    status: emp.status || 'Active',
    initials: emp.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase(),
  }));
}
