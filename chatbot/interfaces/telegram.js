import { Router } from 'express';
import { processMessage } from '../brain/index.js';

const router = Router();

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:    chatId,
      text:       text,
      parse_mode: 'Markdown',
    }),
  });
}

async function sendTyping(chatId) {
  await fetch(`${TELEGRAM_API}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
  });
}

router.post('/webhook', async (req, res) => {
  // Respond to Telegram immediately (must be < 5s)
  res.sendStatus(200);

  const update = req.body;
  const msg = update.message || update.edited_message;
  if (!msg?.text) return;

  const chatId  = msg.chat.id;
  const userId  = `tg_${msg.from.id}`;
  const session = `tg_${chatId}`;
  const text    = msg.text.trim();

  if (text === '/start') {
    await sendMessage(
      chatId,
      '👋 سلام! من دستیار هوشمند *الناز بهرامی* هستم.\n\nمی‌تونم درباره خدمات، دوره‌های آموزشی، و تولید محتوا با هوش مصنوعی کمکت کنم. چطور می‌تونم کمکت کنم؟'
    );
    return;
  }

  if (text === '/help') {
    await sendMessage(
      chatId,
      '📌 *کارهایی که می‌تونم انجام بدم:*\n\n' +
      '• اطلاعات درباره خدمات الناز بهرامی\n' +
      '• راهنمایی ثبت‌نام دوره‌های آموزشی\n' +
      '• بررسی وضعیت ثبت‌نامت\n' +
      '• پاسخ سوالات درباره هوش مصنوعی و محتوا\n\n' +
      'فقط بنویس، من اینجام! 🤖'
    );
    return;
  }

  try {
    await sendTyping(chatId);
    const reply = await processMessage({
      message:   text,
      sessionId: session,
      userId,
      source:    'telegram',
    });
    await sendMessage(chatId, reply);
  } catch (err) {
    console.error('[Telegram] error:', err.message);
    await sendMessage(chatId, 'متأسفم، مشکلی پیش اومد. لطفاً دوباره امتحان کن 🙏');
  }
});

export default router;
