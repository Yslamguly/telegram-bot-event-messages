if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const TelegramBot = require('node-telegram-bot-api');
const {sendDailyDutyNotification} = require("./dailyMessages");
const {copyCSVContents} = require("./CSVHandler");
const {askForCsvScheduleFile} = require('./monthlyMessages')

const token = process.env.SECRET_TELEGRM_BOT_TOKEN;


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// askForCsvScheduleFile(bot)

// bot.on('document', function (msg) {
//     // var chatId = msg.chat.id;
//
//     // console.log(msg);
//
//     bot.downloadFile(msg.document.file_id, 'src')
// })

// Handle incoming messages
bot.onText(/\/change schedule/, (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    const fileIdRequest = {
        reply_markup: {
            force_reply: true,
        },
        reply_to_message_id: messageId,
        chat_id: chatId,
        text: 'Please reply with a CSV file:',
    };

    bot.sendMessage(chatId, 'Hello! Use this command to upload a file.', fileIdRequest);
});

// Handle file upload
bot.on('document', (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.document.file_id;
    bot.downloadFile(fileId, 'src')
    bot.sendMessage(chatId, `Thank you for the file! File ID: ${fileId}`);
});

sendDailyDutyNotification(bot);

askForCsvScheduleFile(bot)

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId)

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});



copyCSVContents('./cooking-schedule-2.csv','./cooking-schedule.csv')
    .then(()=>console.log('success'))
    .catch((err)=>console.log(err))


