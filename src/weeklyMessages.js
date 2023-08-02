const {WEEKLY_CLEANING_NOTIFICATION_TIME} = require("./constants");
const {buildWeeklyCleaningMessage} = require("./messageBuilder");
const {createNotificationScheduler} = require('./utils')


function sendNotificationForWeeklyCleaning(bot){
    createNotificationScheduler(bot,'./apartment-cleaning-schedule.csv',WEEKLY_CLEANING_NOTIFICATION_TIME,buildWeeklyCleaningMessage)
}

module.exports = {sendNotificationForWeeklyCleaning}
