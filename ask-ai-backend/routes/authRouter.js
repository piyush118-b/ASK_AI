const express = require('express');
const authRouter = express.Router();
const supabase = require('../services/supabase-client');

// ── POST /auth/signup ────────────────────────────────
authRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true // auto-confirm user
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ user: data.user });
});

// ── POST /auth/login ─────────────────────────────────
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  res.status(200).json({ session: data.session, user: data.user });
});

module.exports = authRouter;
