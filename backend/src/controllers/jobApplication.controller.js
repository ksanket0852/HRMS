const { prisma } = require("../config/database");

// Create application
exports.applyToJob = async (req, res) => {
  try {
    const { jobId, candidateId, resumeUrl } = req.body;
    const application = await prisma.jobApplication.create({
      data: { jobId, candidateId, status: 'APPLIED', resumeUrl }
    });
    res.status(201).json(application);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Get single application
exports.getApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.jobApplication.findUnique({ where: { id } });
    if (!application) return res.status(404).json({ error: 'Not found' });
    res.json(application);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Update application (status/review)
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // can include status or other review data
    const updated = await prisma.jobApplication.update({
      where: { id },
      data: updateData
    });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Delete application (remove candidate/app from process)
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.jobApplication.delete({ where: { id } });
    res.json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// List applications for candidate
exports.getApplicationsByCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const applications = await prisma.jobApplication.findMany({ where: { candidateId } });
    res.json(applications);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// List applications for job
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await prisma.jobApplication.findMany({ where: { jobId } });
    res.json(applications);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
