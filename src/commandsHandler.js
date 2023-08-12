const {processUploadedCSV} = require('./CSVHandler')
const CHAT_ID = process.env.CHAT_ID

function FileRequest(messageId, chatId, text) {
    this.reply_markup = {
        force_reply: true
    }
    this.reply_to_message_id = messageId
    this.chat_id = chatId
    this.text = text
}

async function onChangeScheduleCommand(bot) {
    let botMessageId = null;
    await bot.onText(/\/change schedule/, (msg) => {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;

        const fileRequest = new FileRequest(messageId, chatId, 'Hello! Use this message to upload a CSV file.')
        bot.sendMessage(chatId, fileRequest.text, fileRequest)
            .then((sentMessage) => {
                botMessageId = sentMessage.message_id;
            })
    });

    bot.on('document', async (msg) => {
        if (msg.reply_to_message && msg.reply_to_message.message_id === botMessageId) {
            await processUploadedCSV(bot, msg)
        }
    })

}


module.exports = {onChangeScheduleCommand,test}
