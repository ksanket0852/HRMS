// src/services/aiService.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const analyzeResume = async (resumeText) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an HR assistant." },
      { role: "user", content: `Evaluate this resume: ${resumeText}` }
    ],
  });
  return response.data.choices[0].message.content;
};

module.exports = { analyzeResume };
