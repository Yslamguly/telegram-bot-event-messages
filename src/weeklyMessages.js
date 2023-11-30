const cron = require('node-cron')
const {WEEKLY_CLEANING_NOTIFICATION_TIME} = require("./constants");
const FETH_CHAT_ID = process.env.FETH_CHAT_ID



const sendNotificationForWeeklyCleaning = (bot) => {
    const names = ["Yslam", "Meylis", "Kuwwat", "Osman", "Ammar", "Shatlyk", "Fatih"]
    let index = 0;
    cron.schedule(WEEKLY_CLEANING_NOTIFICATION_TIME,()=>{
        if (index === names.length) {
            index = 0;
        }
        bot.sendMessage(FETH_CHAT_ID, `Responsible for cleaning corridor's and kitchen's floor this week is: ${names[index]} 🧼`)
            .catch((error) => console.log(`Send weekly cleaning notification error: ${error}`))
        index++;
    },{timezone:'Europe/Budapest'})
}

module.exports = {sendNotificationForWeeklyCleaning}
