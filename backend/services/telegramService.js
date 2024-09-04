const fetch = require('node-fetch');

const TELEGRAM_TOKEN = 'your-telegram-bot-token';
const CHAT_ID = 'your-chat-id';

exports.sendTelegramNotification = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
};
