if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const TelegramBot = require('node-telegram-bot-api');
const {sendDailyDutyNotification} = require("./dailyMessages");
const {askForCsvScheduleFile} = require('./monthlyMessages')
const {sendNotificationForWeeklyCleaning} = require('./weeklyMessages')
const {onChangeScheduleCommand} = require("./commandsHandler");
const {testMessageAfterCSVChange} = require("./utils");
const {buildDailyDutyMessage} = require("./messageBuilder")
const token = process.env.SECRET_TELEGRM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});



onChangeScheduleCommand(bot)
    .then(()=> testMessageAfterCSVChange(bot,'./cooking-schedule.csv',buildDailyDutyMessage))

sendDailyDutyNotification(bot);

sendNotificationForWeeklyCleaning(bot)

askForCsvScheduleFile(bot)



