import { TELEGRAM_CONFIG } from '../utils/telegramConfig';

const TELEGRAM_BOT_TOKEN = TELEGRAM_CONFIG.BOT_TOKEN;
const TELEGRAM_CHAT_ID = TELEGRAM_CONFIG.CHAT_ID;

export const sendToTelegram = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Telegram yuborishda xato:', error);
    return false;
  }
};

export const formatReportForTelegram = (report) => {
  const { date, totalSales, totalEarnings, totalDebt, orders } = report;
  
  let message = `<b>📊 Kunlik Hisobot - ${date}</b>\n\n`;
  message += `💰 <b>Jami daromad:</b> ${totalEarnings.toLocaleString()} so'm\n`;
  message += `📋 <b>Jami sotilgan:</b> ${totalSales} ta mahsulot\n`;
  message += `💳 <b>Qarzga berilgan:</b> ${totalDebt.toLocaleString()} so'm\n\n`;
  
  if (orders.length > 0) {
    message += `<b>Sotilgan mahsulotlar:</b>\n`;
    orders.forEach((order, index) => {
      message += `${index + 1}. ${order.itemName} - ${order.price.toLocaleString()} so'm ${order.isDebt ? '(Qarz)' : ''}\n`;
    });
  }
  
  return message;
};

export const sendWaiterRatingToTelegram = async (ratingData) => {
  const { rating, comment, customerName, date } = ratingData;
  
  // Create star emoji representation
  const starEmoji = '⭐'.repeat(rating);
  const emptyStarEmoji = '☆'.repeat(5 - rating);
  
  let message = `<b>🌟 Afitsant Bahosi</b>\n\n`;
  message += `👤 <b>Mijoz:</b> ${customerName}\n`;
  message += `📅 <b>Sana:</b> ${date}\n`;
  message += `⭐ <b>Baho:</b> ${starEmoji}${emptyStarEmoji} (${rating}/5)\n\n`;
  
  if (comment && comment.trim()) {
    message += `💬 <b>Izoh:</b>\n${comment}\n`;
  } else {
    message += `💬 <i>Izoh yo'q</i>\n`;
  }
  
  return await sendToTelegram(message);
};