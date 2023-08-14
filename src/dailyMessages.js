const {DAILY_DUTY_NOTIFICATION_TIME} = require('./constants')
const {buildDailyDutyMessage} = require("./messageBuilder");
const {createNotificationScheduler,testMessageAfterCSVChange} = require('./utils')


const sendDailyDutyNotification = (bot) => {
    createNotificationScheduler(bot,'./cooking-schedule.csv',DAILY_DUTY_NOTIFICATION_TIME,buildDailyDutyMessage)

    testMessageAfterCSVChange(bot,'./cooking-schedule.csv',buildDailyDutyMessage)
};

module.exports = {sendDailyDutyNotification}
