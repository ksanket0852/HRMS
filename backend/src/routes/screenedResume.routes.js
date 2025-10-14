const express = require('express');
const {
  createScreenedResume,
  getScreenedResumes,
  getScreenedResumeById,
  updateScreenedResume,
  deleteScreenedResume
} = require('../controllers/screenedResume.controller');

const router = express.Router();

// Create (POST)
router.post('/', createScreenedResume);

// Read all (GET)
router.get('/', getScreenedResumes);

// Read one by ID (GET)
router.get('/:id', getScreenedResumeById);

// Update (PUT)
router.put('/:id', updateScreenedResume);

// Delete (DELETE)
router.delete('/:id', deleteScreenedResume);

module.exports = router;
