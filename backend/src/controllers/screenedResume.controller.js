// Create a screened resume result (after AI classification)
const { prisma } = require('../config/database');

const createScreenedResume = async (req, res) => {
  try {
    const { candidateName, resumeText, jobDescription, aiLabel, aiScores, reviewedById } = req.body;

    const result = await prisma.screenedResume.create({
      data: {
        candidateName,
        resumeText,
        jobDescription,
        aiLabel,
        aiScores,
        reviewedById,
      }
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Error saving screened resume:", error);
    return res.status(500).json({ error: error.message });
  }
};


// Read all screened resumes (pagination supported)
const getScreenedResumes = async (req, res) => {
  try {
    const records = await prisma.screenedResume.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a single screened resume by id
const getScreenedResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await prisma.screenedResume.findUnique({ where: { id } });
    if (!record) return res.status(404).json({ error: "Screened resume not found." });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update screened resume (optional fields)
const updateScreenedResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { candidateName, aiLabel, aiScores, reviewedById } = req.body;
    const record = await prisma.screenedResume.update({
      where: { id },
      data: { candidateName, aiLabel, aiScores, reviewedById }
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a screened resume
const deleteScreenedResume = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.screenedResume.delete({ where: { id } });
    res.json({ message: "Screened resume deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createScreenedResume,
  getScreenedResumes,
  getScreenedResumeById,
  updateScreenedResume,
  deleteScreenedResume
};
