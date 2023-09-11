const {DAILY_DUTY_NOTIFICATION_TIME,DAILY_READING_POLL_TIME} = require('./constants')
const {buildDailyDutyMessage} = require("./messageBuilder");
const {createNotificationScheduler,testMessageAfterCSVChange} = require('./utils')
const FETH_CHAT_ID = process.env.FETH_CHAT_ID
const cron = require('node-cron')

const sendDailyDutyNotification = (bot) => {
    createNotificationScheduler(bot,'./cooking-schedule.csv',DAILY_DUTY_NOTIFICATION_TIME,buildDailyDutyMessage)
};


const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const sendDailyBookReadingPoll =  (bot)=>{

    cron.schedule(DAILY_READING_POLL_TIME,()=>{
        const currentDayOfTheMonth = new Date().getDate().toString();
        const currentMonthOfTheYear = months[new Date().getMonth().toString()]

        bot.sendPoll(FETH_CHAT_ID,`${currentDayOfTheMonth}  ${currentMonthOfTheYear} Feth suresi we 129 Ya Latifu okaldymy?`,['Hawa','Yok'],{is_anonymous:false})
            .catch((error)=> console.log(`Send daily book reading poll error: ${error}`))
    },{timezone:'Europe/Budapest'})

}

module.exports = {sendDailyDutyNotification,sendDailyBookReadingPoll}
