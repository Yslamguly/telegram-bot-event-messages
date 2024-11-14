const {processUploadedCSV, copyCSVContents, readCSVFile} = require('./CSVHandler')
const { buildDailyDutyMessage } = require('./messageBuilder')

function FileRequest(messageId, chatId, text) {
    this.reply_markup = {
        force_reply: true
    }
    this.reply_to_message_id = messageId
    this.chat_id = chatId
    this.text = text
}

function onChangeScheduleCommand(bot) {
    let botMessageId = null;
    bot.onText(/\/change schedule/, (msg) => {
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
            try{
                const uploadedFilePath = await processUploadedCSV(bot,msg)

                await copyCSVContents(`./${uploadedFilePath}`,'./cooking-schedule.csv')

                await bot.sendMessage(msg.chat.id,'Schedule has been updated successfully 🥳!')
            }catch (error){
                console.error(error)
            }
        }
    })

}

function onNextDayCommand(bot){
    bot.onText(/\/next/, (msg) => {
        const chatId = msg.chat.id;
        const fileContent = readCSVFile("./cooking-schedule.csv");
        fileContent.then(data=> {
            const today = new Date();
            const formattedToday = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
            let isMessageSent = false;
            for (let i = 0; i < data.length; i++)  {
                const row = data[i];
                if (row.Date === formattedToday) {
                    if (i + 1 < data.length) {
                        bot.sendMessage(chatId, buildDailyDutyMessage(data[i+1]));
                        isMessageSent = true
                        break;
                    } else {
                        bot.sendMessage(chatId, "No next day is availabe 😞. Please update the schedule!")
                        isMessageSent = true
                        break;
                    }
                }
            };
            if(!isMessageSent){
                bot.sendMessage(chatId, "No match is found 😞. Please update the schedule!")
            }
        })
    })
}


function onChangeCleaningScheduleCommand(bot){
    let botMessageId = null
    bot.onText(/\/change cleaning schedule/,(msg)=>{
        const chatId = msg.chat.id
        const messageId = msg.message_id

        const fileRequest = new FileRequest(messageId, chatId, 'Hello! Use this message to upload a CSV file.')
        bot.sendMessage(chatId,fileRequest.text,fileRequest)
            .then((sentMessage)=>{
                botMessageId = sentMessage.message_id
            })
    })
    bot.on('document', async (msg) => {
        if (msg.reply_to_message && msg.reply_to_message.message_id === botMessageId) {
            try{
                const uploadedFilePath = await processUploadedCSV(bot,msg)

                await copyCSVContents(`./${uploadedFilePath}`, './apartment-cleaning-schedule.csv')

                await bot.sendMessage(msg.chat.id, 'Schedule has been updated successfully 🥳!')

            }catch (error){
                console.error(error)
            }
        }
    })
}


module.exports = {onChangeScheduleCommand,onChangeCleaningScheduleCommand, onNextDayCommand}
