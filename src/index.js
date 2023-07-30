if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');
const {sendDailyDutyNotification} = require("./dailyMessages");

const token = process.env.SECRET_TELEGRM_BOT_TOKEN;


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

sendDailyDutyNotification(bot);




// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId)

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});


