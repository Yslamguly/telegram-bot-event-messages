const fs = require("fs");
const {parse} = require("csv-parse");
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

function readCSVFile(path) {
    return new Promise((resolve, reject) => {
        const data = [];
        let headers = null
        fs.createReadStream(path)
            .pipe(parse({delimiter: ",", from_line: 1}))
            .on("data", function (row) {
                if (!headers) {
                    headers = row;
                } else {
                    const rowData = {};
                    row.forEach((value, index) => {
                        rowData[headers[index]] = value;
                    });
                    data.push(rowData);
                }
            })
            .on("end", function () {
                console.log("finished");
                // Resolve the Promise with the data array
                resolve(data);
            })
            .on("error", function (error) {
                console.log(error.message);
                // Reject the Promise with the error
                reject(error);
            });
    });
}

async function copyCSVContents(sourceFilePath, destinationFilePath) {
    const data = await readFileAsync(sourceFilePath)

    await writeFileAsync(destinationFilePath, data)

    await unlinkAsync(sourceFilePath)

}

async function processUploadedCSV(bot,msg) {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    if (msg.document.mime_type !== 'text/csv') {
        await bot.sendMessage(chatId, 'Please, upload a file in CSV format! Allah razy bolsyn 😊', {reply_to_message_id: messageId})
    } else {
        // Process the file here as needed

        const fileId = msg.document.file_id;
        const fileInfo = await bot.getFile(fileId);

        const originalFilename = fileInfo.file_path.split('/').pop();
        const uploadedFilePath = `./${originalFilename}`;

        await bot.downloadFile(msg.document.file_id, './')

        await copyCSVContents(`./${uploadedFilePath}`, './cooking-schedule.csv')
            .then(() => bot.sendMessage(chatId, 'Schedule has been updated successfully 🥳!'))
            .catch(err => console.log(err))
    }
}


module.exports = {readCSVFile, copyCSVContents, processUploadedCSV}
