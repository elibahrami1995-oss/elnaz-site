import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { processMessage } from '../brain/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

// Full-page chat UI
router.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/chat.html'));
});

// REST API for both the chat page and the widget
router.post('/api/chat', async (req, res) => {
  const { message, sessionId, userId } = req.body || {};

  if (!message?.trim()) {
    return res.status(400).json({ error: 'پیام خالی است' });
  }

  try {
    const reply = await processMessage({
      message:   message.trim(),
      sessionId: sessionId || `web_anon_${Date.now()}`,
      userId:    userId    || null,
      source:    req.headers['x-chat-source'] || 'website',
    });
    res.json({ reply });
  } catch (err) {
    console.error('[Chat API] error:', err.message);
    res.status(500).json({ error: 'خطای سرور — لطفاً دوباره امتحان کنید.' });
  }
});

export default router;
