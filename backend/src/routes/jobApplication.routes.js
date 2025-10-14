const express = require('express');
const { applyToJob, getApplication, updateApplication, deleteApplication, getApplicationsByCandidate, getApplicationsByJob } = require('../controllers/jobApplication.controller');
const router = express.Router();

router.post('/jobs/apply', applyToJob);
router.get('/jobs/applications/:id', getApplication);
router.put('/jobs/applications/:id', updateApplication); // update status, etc
router.delete('/jobs/applications/:id', deleteApplication); // remove/reject
router.get('/jobs/applications/candidate/:candidateId', getApplicationsByCandidate);
router.get('/jobs/applications/job/:jobId', getApplicationsByJob);

module.exports = router;
