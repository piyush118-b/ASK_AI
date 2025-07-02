const express = require('express');
const chatsRouter = express.Router();
const supabase = require('../services/supabase-client');

// GET all chats for current user
chatsRouter.get('/', async (req, res) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

// POST new chat message (user_message + bot_response)
chatsRouter.post('/', async (req, res) => {
  const { prompt, response } = req.body;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  const newChat = {
    user_id: user.id,
    user_message: prompt,     // ✅ Correct field name
    bot_response: response,   // ✅ Correct field name
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('chats')
    .insert([newChat])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// DELETE a chat by ID
chatsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('chats').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

module.exports = chatsRouter;
