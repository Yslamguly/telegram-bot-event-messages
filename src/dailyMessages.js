const {DAILY_DUTY_NOTIFICATION_TIME} = require('./constants')
const {buildDailyDutyMessage} = require("./messageBuilder");
const {createNotificationScheduler} = require('./utils')


const sendDailyDutyNotification = (bot) => {
    createNotificationScheduler(bot,'./cooking-schedule.csv',DAILY_DUTY_NOTIFICATION_TIME,buildDailyDutyMessage)
};

module.exports = {sendDailyDutyNotification}
