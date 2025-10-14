const { speechToText, analyzeWithGemini, generateFollowup, getSentiment } = require('./geminiService');
const prisma = require('../config/database');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Real-time WebSocket chunk handler
exports.wsProcessInterviewChunk = async (candidateId, jobId, question, audioBuffer) => {
  const tempPath = path.join(__dirname, `${uuidv4()}.wav`);
  fs.writeFileSync(tempPath, audioBuffer);
  const transcript = await speechToText(tempPath);
  fs.unlinkSync(tempPath);
  const followup = await generateFollowup(transcript, jobId);
  const sentiment = await getSentiment(transcript);
  const score = await analyzeWithGemini(transcript, question, jobId);
  return { transcript, followup, sentiment, score };
};

// Batch REST endpoint for a full file (POST)
exports.processVoiceInterviewBatch = async (req, res) => {
  try {
    const { candidateId, jobId, question } = req.body;
    if (!req.file || !req.file.buffer) throw new Error("Audio file required");
    const transcript = await speechToText(req.file.buffer);
    const followup = await generateFollowup(transcript, jobId);
    const sentiment = await getSentiment(transcript);
    const score = await analyzeWithGemini(transcript, question, jobId);
    const record = await prisma.voiceInterview.create({
      data: { candidateId, jobId, question, transcript, followup, sentiment, score }
    });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch single interview
exports.getVoiceInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await prisma.voiceInterview.findUnique({ where: { id } });
    if (!interview) return res.status(404).json({ error: 'Not found' });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List interviews with optional filtering
exports.listInterviews = async (req, res) => {
  try {
    const interviews = await prisma.voiceInterview.findMany(); // add filters as needed
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateVoiceInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { transcript, followup, sentiment, score } = req.body;
    const updated = await prisma.voiceInterview.update({
      where: { id },
      data: { transcript, followup, sentiment, score }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteVoiceInterview = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.voiceInterview.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
