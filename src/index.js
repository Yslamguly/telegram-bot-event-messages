if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const TelegramBot = require('node-telegram-bot-api');
const {sendDailyDutyNotification, test} = require("./dailyMessages");
const {askForCsvScheduleFile} = require('./monthlyMessages')
const {onChangeScheduleCommand} = require("./commandsHandler");

const token = process.env.SECRET_TELEGRM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


// Handle incoming messages
onChangeScheduleCommand(bot)

sendDailyDutyNotification(bot);

askForCsvScheduleFile(bot)



