const express = require('express');
const { spawn } = require('child_process');
const supabase = require('../services/supabase-client');
const apiRouter = express.Router();

apiRouter.post('/generate', async (req, res) => {
  console.log('🚀 Backend: received prompt');
  const prompt = req.body.prompt || 'tell me a short story and make it funny';

  const python = spawn('python', ['ollama_generate.py', prompt]);
  let result = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`❌ stderr: ${data}`);
  });

  python.on('close', async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Python script failed.' });
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('❌ Failed to get user', userError);
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data, error } = await supabase
      .from('chats')
      .insert([
        {
          user_id: user.id,
          user_message: prompt,          // ✅ Corrected field
          bot_response: result.trim()    // ✅ Corrected field
        }
      ])
      .select();

    if (error) {
      console.error('❌ Failed to insert chat:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ response: result.trim(), chat: data[0] });
  });
});

module.exports = apiRouter;
