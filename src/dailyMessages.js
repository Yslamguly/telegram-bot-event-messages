const {DAILY_DUTY_NOTIFICATION_TIME} = require('./constants')
const {readCSVFile} = require("./CSVHandler");
const cron = require("node-cron");
const {buildMessage} = require("./messageBuilder");
const fs  = require("fs");
const CHAT_ID = process.env.CHAT_ID


const sendDailyDutyNotification = (bot) => {
    let cronJob = null;
    let previousData = null;

    const scheduleCronJob = (data) => {
        let i = 0;
        cronJob = cron.schedule(DAILY_DUTY_NOTIFICATION_TIME, () => {
            if (i === data.length) {
                i = 0;
            }
            bot.sendMessage(CHAT_ID, buildMessage(data[i]));
            i++;
        });
    };

    const checkForChanges = () => {
        readCSVFile('./cooking-schedule.csv')
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

    // Initial check for changes and scheduling
    checkForChanges();

    // Watch for file changes
    fs.watchFile('./cooking-schedule.csv', (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            console.log('File changed. Triggering notification...');
            checkForChanges();
        }
    });
};

module.exports = {sendDailyDutyNotification}
