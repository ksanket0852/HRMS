const { prisma } = require("../config/database");
const axios = require("axios");
// For voice → text: Google Cloud Speech-to-Text
const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();
const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MODEL_PATH = path.resolve(__dirname, '../../models/vosk-model-small-en-us-0.15');

// Gemini conversational AI (chat) - do not change
async function geminiChat(history) {
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  const modelName = 'gemini-2.5-flash';

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      { contents },
      { headers: { "Content-Type": "application/json" } }
    );
    const textReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (textReply) return textReply;
    console.error("No text reply found in Gemini AI response data:", response.data);
    throw new Error("Invalid Gemini AI response or empty text reply");
  } catch (error) {
    console.error("Gemini Chat API error:", error.response?.data || error.message);
    throw error;
  }
}


async function speechToText(audioBuffer) {
  // Save buffer to a temporary file (.wav, .mp3, etc.)
  const tempFile = path.resolve(__dirname, "temp.wav");
  fs.writeFileSync(tempFile, audioBuffer);

  return new Promise((resolve, reject) => {
    execFile(
      "python",
      [path.resolve(__dirname, "stt_whisper.py"), tempFile],
      (err, stdout, stderr) => {
        fs.unlinkSync(tempFile);
        if (err) return reject(err);
        resolve(stdout.trim());
      }
    );
  });
}

// Use Gemini for intelligent follow-up question generation
async function generateFollowup(transcript, jobId) {
  return geminiChat([
    { role: 'user', content: `Given this answer from a candidate for job ID ${jobId}: "${transcript}", what is a smart follow-up question? Give just the follow-up question.` }
  ]);
}

// Use Gemini for sentiment analysis
async function getSentiment(transcript) {
  return geminiChat([
    { role: 'user', content: `Analyze the sentiment of this answer (positive, neutral, or negative): "${transcript}" and reply with only the sentiment.` }
  ]);
}

// Optionally use Gemini for more analysis (scoring, etc.)
async function analyzeWithGemini(text, prompt) {
  return geminiChat([{ role: 'user', content: `${prompt}:\n${text}` }]);
}

// Save and fetch functions as before (for Prisma)
async function saveConversation(userId, history, response) {
  return prisma.geminiConversation.create({
    data: { userId, chatHistory: history, response }
  });
}
async function saveTranscription(userId, audioFile, transcript) {
  return prisma.geminiTranscription.create({
    data: {
      userId,
      audioMeta: {
        originalName: audioFile.originalname,
        mimeType: audioFile.mimetype,
        size: audioFile.size,
      },
      transcript,
    },
  });
}

module.exports = {
  geminiChat,
  speechToText,
  generateFollowup,
  getSentiment,
  analyzeWithGemini,
  saveConversation,
  saveTranscription
};
