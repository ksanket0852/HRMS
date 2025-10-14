const { prisma } = require("../config/database");
const { screenResume } = require("../ai/resumeScreening");
const {
  geminiChat,
  speechToText,
  generateFollowup,
  getSentiment,
  analyzeWithGemini,
  saveConversation,
  saveTranscription,
} = require("../ai/geminiService");

// Resume screening (unchanged)
exports.screenResumeApi = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "resumeText and jobDescription required." });
    }
    const result = await screenResume({ resumeText, jobDescription });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Gemini conversation chat (do not change)
exports.geminiChatApi = async (req, res) => {
  try {
    const { userId, history } = req.body;
    if (!Array.isArray(history)) {
      return res.status(400).json({ error: "history (array) required." });
    }
    const aiResponse = await geminiChat(history);
    const saved = await saveConversation(userId, history, aiResponse);
    res.json({ aiResponse, savedConversation: saved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET conversation by ID
exports.getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await prisma.geminiConversation.findUnique({ where: { id: conversationId } });
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT (update) conversation by ID
exports.updateConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { chatHistory, response } = req.body;
    const updated = await prisma.geminiConversation.update({
      where: { id: conversationId },
      data: { chatHistory, response }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE conversation by ID
exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    await prisma.geminiConversation.delete({ where: { id: conversationId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Voice interview module
exports.processVoiceInterview = async (req, res) => {
  try {
    const { candidateId, jobId, question } = req.body;
    if (!req.file || !req.file.buffer) throw new Error('Audio file required');
    // 1. Transcribe audio
    const transcript = await speechToText(req.file.buffer);
    // 2. Analyze with Gemini (followup, sentiment, scoring)
    const followup = await generateFollowup(transcript, jobId);
    const sentiment = await getSentiment(transcript);
    const score = await analyzeWithGemini(transcript, "Rate the candidate's answer from 1 (poor) to 10 (excellent)");
    // 3. Save everything
    const saved = await prisma.voiceInterview.create({
      data: {
        candidateId,
        jobId,
        question,
        transcript,
        followup,
        sentiment,
        score
      },
    });
    res.json({ saved, transcript, followup, sentiment, score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET interview record
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

// PUT interview update
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

// DELETE interview
exports.deleteVoiceInterview = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.voiceInterview.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
