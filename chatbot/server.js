import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import telegramRouter from './interfaces/telegram.js';
import chatRouter from './interfaces/chat-routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static files (widget.js, etc.) ─────────────────────────
app.use(express.static(join(__dirname, 'public')));

// ── Routes ──────────────────────────────────────────────────
app.use('/telegram', telegramRouter);   // POST /telegram/webhook
app.use('/chat',     chatRouter);       // GET  /chat  |  POST /api/chat

// Health check (useful for Antigravity / uptime monitors)
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Chatbot] running on port ${PORT}`);
  console.log(`  Chat page : http://localhost:${PORT}/chat`);
  console.log(`  Widget JS : http://localhost:${PORT}/widget.js`);
  console.log(`  TG webhook: POST http://localhost:${PORT}/telegram/webhook`);
});
