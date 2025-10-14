const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const voiceTranscription = require('./ai/voiceTranscription');
const routes = require('./routes/ai.routes');
const jobApplicationRoutes = require('./routes/jobApplication.routes');  // Add this
const jobRoutes = require('./routes/job.routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// Security & Parsing Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'HRMS Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Request Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes (inc. AI/Interview routes)
// API Routes - mount each route only once
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/payroll', require('./routes/payroll.routes'));
app.use('/api/performance', require('./routes/performance.routes'));
app.use('/api/leaves', require('./routes/leave.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/ai', routes);  // Use once
app.use('/api/parse', require('./routes/parse.routes'));
app.use('/api/screened-resumes', require('./routes/screenedResume.routes'));
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/jobs', jobRoutes);

// WebSocket: Live audio chunk feedback
io.on('connection', (socket) => {
  console.log("WebSocket: Client connected");
  socket.on('audio-chunk', async ({ candidateId, jobId, question, audioChunk }) => {
    try {
      const feedback = await voiceTranscription.wsProcessInterviewChunk(candidateId, jobId, question, audioChunk);
      socket.emit('interview-feedback', feedback);
    } catch (e) {
      socket.emit('interview-feedback', { error: e.message });
    }
  });
  socket.on('disconnect', () => {
    console.log("WebSocket: Client disconnected");
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;