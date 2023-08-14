const cron = require("node-cron");
const {readCSVFile} = require('./CSVHandler')
const fs = require('fs')
const CHAT_ID = process.env.CHAT_ID


const createNotificationScheduler = (bot, filePath, notificationTime, buildMessageFunction) => {
    let cronJob = null;
    let previousData = null;

    const scheduleCronJob = (data) => {
        let i = 0;
        cronJob = cron.schedule(notificationTime, () => {
            if (i === data.length) {
                i = 0;
            }
            bot.sendMessage(CHAT_ID, buildMessageFunction(data[i]));
            i++;
        });
    };

    const checkForChanges = () => {
        readCSVFile(filePath)
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
    fs.watchFile(filePath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            console.log('File changed. Triggering notification...');
            checkForChanges();
        }
    });
};


const testMessageAfterCSVChange = (bot,filePath,buildMessageFunction) =>{
    readCSVFile(filePath)
        .then((data)=> bot.sendMessage(CHAT_ID,`This is just a test: \n ${buildMessageFunction(data[0])}`))
        .catch((err)=>{
            bot.sendMessage(CHAT_ID,'Something went wrong please try again!')
            console.log("Error reading csv file : " + err)
        })
}

module.exports = {createNotificationScheduler,testMessageAfterCSVChange}
