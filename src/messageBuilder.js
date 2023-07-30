const buildMessage = (dataObject) => {
    return `Bu gun: ${dataObject.Date} \n 
Nobatçy: ${dataObject.Name} \n
Breakfast: ${dataObject.Breakfast} \n
Agsamky nahar: ${dataObject.MealNumber}
    `
}

module.exports = {buildMessage}
