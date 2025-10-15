import axios from 'axios';

// Get current candidate ID from auth context or local storage
export function getCurrentCandidateId() {
  // This should come from your auth context/token/localStorage
  // For now, returning a placeholder - replace with actual implementation
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.id || user.candidateId;
}

// Fetch all applications for the current candidate
export async function fetchCandidateApplications(candidateId) {
  const res = await axios.get(`/api/jobs/applications/candidate/${candidateId}`);
  return res.data;
}

// Fetch applications with job details
export async function fetchCandidateApplicationsWithJobs(candidateId) {
  const applications = await fetchCandidateApplications(candidateId);
  
  // For each application, fetch the job details
  const applicationsWithJobs = await Promise.all(
    applications.map(async (app) => {
      try {
        const jobRes = await axios.get(`/api/jobs/${app.jobId}`);
        return {
          ...app,
          job: jobRes.data,
        };
      } catch (error) {
        return {
          ...app,
          job: { title: 'Unknown Job' },
        };
      }
    })
  );
  
  return applicationsWithJobs;
}

// Get candidate profile (assuming you have a candidate/user endpoint)
export async function fetchCandidateProfile(candidateId) {
  try {
    const res = await axios.get(`/api/candidates/${candidateId}`);
    return res.data;
  } catch (error) {
    // If no candidate-specific endpoint exists, fetch from user endpoint
    const res = await axios.get(`/api/users/${candidateId}`);
    return res.data;
  }
}

// Upload resume
export async function uploadResume(candidateId, file) {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('candidateId', candidateId);
  
  const res = await axios.post('/api/candidates/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return res.data;
}

// Update candidate profile
export async function updateCandidateProfile(candidateId, profileData) {
  const res = await axios.put(`/api/candidates/${candidateId}`, profileData);
  return res.data;
}

// Apply to a job
export async function applyToJob(jobId, candidateId, resumeUrl) {
  const res = await axios.post('/api/jobs/apply', {
    jobId,
    candidateId,
    resumeUrl,
  });
  return res.data;
}

// Get dashboard stats
export async function fetchCandidateDashboardStats(candidateId) {
  const applications = await fetchCandidateApplications(candidateId);
  const profile = await fetchCandidateProfile(candidateId);
  
  // Calculate stats
  const activeApplications = applications.filter(
    app => app.status !== 'REJECTED' && app.status !== 'WITHDRAWN'
  ).length;
  
  const hasResume = !!profile.resumeUrl;
  
  // Calculate profile completion percentage
  const profileCompletion = calculateProfileCompletion(profile);
  
  return {
    activeApplications,
    hasResume,
    profileCompletion,
    totalApplications: applications.length,
  };
}

// Calculate profile completion percentage
function calculateProfileCompletion(profile) {
  const fields = [
    'name',
    'email',
    'phone',
    'resumeUrl',
    'skills',
    'experience',
    'education',
  ];
  
  let completedFields = 0;
  fields.forEach(field => {
    if (profile[field] && profile[field] !== '') {
      completedFields++;
    }
  });
  
  return Math.round((completedFields / fields.length) * 100);
}

// Format application status for display
export function formatApplicationStatus(status) {
  const statusMap = {
    'APPLIED': 'Submitted',
    'UNDER_REVIEW': 'Under Review',
    'INTERVIEW_SCHEDULED': 'Interview Scheduled',
    'INTERVIEW_COMPLETED': 'Interview Completed',
    'OFFERED': 'Offer Received',
    'REJECTED': 'Rejected',
    'WITHDRAWN': 'Withdrawn',
    'ACCEPTED': 'Accepted',
  };
  
  return statusMap[status] || status;
}

// Get status color for badge
export function getStatusColor(status) {
  const colorMap = {
    'APPLIED': 'bg-blue-500',
    'UNDER_REVIEW': 'bg-yellow-500',
    'INTERVIEW_SCHEDULED': 'bg-green-500',
    'INTERVIEW_COMPLETED': 'bg-purple-500',
    'OFFERED': 'bg-green-600',
    'REJECTED': 'bg-red-500',
    'WITHDRAWN': 'bg-gray-500',
    'ACCEPTED': 'bg-green-700',
  };
  
  return colorMap[status] || 'bg-gray-500';
}
