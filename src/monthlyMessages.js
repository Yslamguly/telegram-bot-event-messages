const {LAST_DAY_OF_MONTH} = require('./constants')
const cron = require("node-cron");
const CHAT_ID = process.env.CHAT_ID

const askForCsvScheduleFile = (bot) =>{
    cron.schedule(LAST_DAY_OF_MONTH,()=>{
        bot.sendMessage(CHAT_ID,'Halo! It is time to update your monthly schedule file. ' +
            'Please use (/change schedule) command to send me your CSV file. Allah razy bolsyn 😊!')
    },{timezone: "Europe/Budapest"
    })
}

module.exports = {askForCsvScheduleFile}
