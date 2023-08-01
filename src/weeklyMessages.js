const cron = require("node-cron");
const {WEEKLY_CLEANING_NOTIFICATION_TIME} = require("./constants");
const {buildWeeklyCleaningMessage} = require("./messageBuilder");
const {readCSVFile} = require("./CSVHandler");
const fs = require("fs");
const CHAT_ID = process.env.CHAT_ID
function sendNotificationForWeeklyCleaning(bot){
    let cronJob = null
    let previousData = null
    const scheduleCronJob = (data) => {
        let i = 0;
        cronJob = cron.schedule(WEEKLY_CLEANING_NOTIFICATION_TIME, () => {
            if (i === data.length) {
                i = 0;
            }
            bot.sendMessage(CHAT_ID, buildWeeklyCleaningMessage(data[i]));
            i++;
        });
    };

    const checkForChanges = () => {
        readCSVFile('./apartment-cleaning-schedule.csv')
            .then((data) => {
                if (JSON.stringify(data) !== JSON.stringify(previousData)) {
                    // The data has changed, stop the existing cron job if it's running
                    if (cronJob) {
                        cronJob.stop();
                    }

                    previousData = data;
                    scheduleCronJob(data);
                }
            })
            .catch((err) => {
                console.error('Error reading CSV file:', err);
            });
    };
    checkForChanges();

    // Watch for file changes
    fs.watchFile('./apartment-cleaning-schedule.csv', (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            console.log('File changed. Triggering notification...');
            checkForChanges();
        }
    });

}

module.exports = {sendNotificationForWeeklyCleaning}
