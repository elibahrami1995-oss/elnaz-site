/**
 * Register Telegram webhook with your server.
 * Run once after deployment: node scripts/set-webhook.js
 */
import 'dotenv/config';

const TOKEN   = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK = `${process.env.WEBHOOK_URL}/telegram/webhook`;

if (!TOKEN || !process.env.WEBHOOK_URL) {
  console.error('Set TELEGRAM_BOT_TOKEN and WEBHOOK_URL in .env');
  process.exit(1);
}

const res  = await fetch(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify({ url: WEBHOOK }),
});
const data = await res.json();

if (data.ok) {
  console.log('✅ Webhook set:', WEBHOOK);
} else {
  console.error('❌ Error:', data.description);
}
