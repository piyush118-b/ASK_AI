// index.js
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

// Routers
const authRouter = require('./routes/authRouter');
const chatsRouter = require('./routes/chatsRouter');
const apiRouter = require('./routes/apiRouter');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);     // for prompt generation
app.use('/chats', chatsRouter); // for storing/retrieving chat history

// Server
app.listen(3003, () => {
  console.log('✅ Backend server running on http://localhost:3003');
});