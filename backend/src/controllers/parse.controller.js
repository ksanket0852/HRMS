const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// API: POST /api/ai/parse-resume
const parseResume = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    let text = "";
    if (req.file.mimetype === "application/pdf") {
      text = (await pdfParse(req.file.buffer)).text;
    } else if (req.file.mimetype.includes('officedocument')) {
      text = (await mammoth.extractRawText({ buffer: req.file.buffer })).value;
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }
    res.json({ resumeText: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { parseResume };
