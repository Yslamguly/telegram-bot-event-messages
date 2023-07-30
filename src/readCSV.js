const fs = require("fs");
const { parse } = require("csv-parse");

function readCSVFile(path) {
    return new Promise((resolve, reject) => {
        const data = [];
        let headers = null
        fs.createReadStream(path)
            .pipe(parse({ delimiter: ",", from_line: 1 }))
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


module.exports = {readCSVFile}
