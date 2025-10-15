import axios from 'axios';

// Fetch all jobs from backend
export async function fetchJobs() {
  const res = await axios.get('/api/jobs');
  return res.data;
}

// Fetch all job applications
export async function fetchAllApplications() {
  // You'll need to create an endpoint to get all applications across all jobs
  // For now, we can aggregate by fetching applications per job
  const jobs = await fetchJobs();
  
  let totalApplications = 0;
  for (const job of jobs) {
    const appRes = await axios.get(`/api/jobs/applications/job/${job.id}`);
    totalApplications += appRes.data.length;
  }
  
  return totalApplications;
}

// Fetch jobs with applicant counts
export async function fetchJobsWithApplicants() {
  const jobs = await fetchJobs();
  
  // For each job, fetch application count
  const jobsWithApplicants = await Promise.all(
    jobs.map(async (job) => {
      const appRes = await axios.get(`/api/jobs/applications/job/${job.id}`);
      const applicants = appRes.data.length;
      
      return {
        id: job.id,
        title: job.title,
        department: job.department || 'N/A',
        location: job.location || 'Remote',
        type: job.type || 'Full-time',
        salary: job.salary || 'Competitive',
        applicants,
        status: job.status || 'Active',
        posted: formatDate(job.createdAt),
        description: job.description,
      };
    })
  );
  
  return jobsWithApplicants;
}

// Create a new job
export async function createJob(jobData) {
  const res = await axios.post('/api/jobs', jobData);
  return res.data;
}

// Update a job
export async function updateJob(jobId, jobData) {
  const res = await axios.put(`/api/jobs/${jobId}`, jobData);
  return res.data;
}

// Delete a job
export async function deleteJob(jobId) {
  const res = await axios.delete(`/api/jobs/${jobId}`);
  return res.data;
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}
