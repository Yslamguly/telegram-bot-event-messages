const {DAILY_DUTY_NOTIFICATION_TIME} = require('./constants')
const {readCSVFile} = require("./CSVHandler");
const cron = require("node-cron");
const {buildMessage} = require("./messageBuilder");
const CHAT_ID = process.env.CHAT_ID


const sendDailyDutyNotification = (bot) =>{
    readCSVFile("./cooking-schedule.csv")
        .then((data) => {
            let i = 0;
            cron.schedule(DAILY_DUTY_NOTIFICATION_TIME,()=>{
                if(i === data.length){
                    i = 0
                }
                bot.sendMessage(CHAT_ID,buildMessage(data[i]))
                i++
            })
        })
        .catch((err) => {
            console.error("Error reading CSV file:", err);
        });
}

module.exports = {sendDailyDutyNotification}
