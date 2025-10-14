const express = require('express');
const multer = require('multer');
const upload = multer();

const {
  screenResumeApi,
  geminiChatApi,
  getConversation,
  updateConversation,
  deleteConversation,
  processVoiceInterview,
  getVoiceInterview,
  updateVoiceInterview,
  deleteVoiceInterview,
} = require('../controllers/ai.controller');

const router = express.Router();

// Resume screening
router.post('/screen-resume', screenResumeApi);

// Gemini chat + CRUD
router.post('/gemini/conversation', geminiChatApi);
router.get('/gemini/conversation/:conversationId', getConversation);
router.put('/gemini/conversation/:conversationId', updateConversation);
router.delete('/gemini/conversation/:conversationId', deleteConversation);

// Voice interview endpoints
router.post('/voice/interview', upload.single('audio'), processVoiceInterview);
router.get('/voice/interview/:id', getVoiceInterview);
router.put('/voice/interview/:id', updateVoiceInterview);
router.delete('/voice/interview/:id', deleteVoiceInterview);

module.exports = router;
