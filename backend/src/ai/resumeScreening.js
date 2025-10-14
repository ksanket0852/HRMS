const { HfInference } = require('@huggingface/inference')
const { prisma } = require('../config/database');
const hf = new HfInference(process.env.HF_API_TOKEN);

async function screenResume({ resumeText, jobDescription }) {
  const labels = [
    "Excellent Match",
    "Potential Fit",
    "Underqualified",
    "Not Relevant"
  ];

  async function saveScreeningResult({ candidateName, resumeText, jobDescription, label, scores, reviewedById }) {
  return await prisma.screenedResume.create({
    data: {
      candidateName,
      resumeText,
      jobDescription,
      aiLabel: label,
      aiScores: scores,
      reviewedById
    }
  });
}

  // Use zero-shot classification for matching
  const result = await hf.zeroShotClassification({
    model: 'facebook/bart-large-mnli',
    inputs: `Resume:\n${resumeText}\nJob Description:\n${jobDescription}`,
    parameters: {
      candidate_labels: labels.join(","),
      multi_label: false
    }
  });
  return result;
}

module.exports = { screenResume };
