const buildDailyDutyMessage = (dataObject) => {
    return `Bu gun: ${dataObject.Date} \n 
Nobatçy: ${dataObject.Name} \n
Breakfast: ${dataObject.Breakfast} \n
Agsamky nahar: ${dataObject.MealNumber}
    `
}

const buildWeeklyCleaningMessage = (dataObject)=>{
    return `This week: ${dataObject.Date} \n 
Kitchen: ${dataObject.Kitchen} \n
Shower and Toilet: ${dataObject.ShowerAndToilet} \n
Salon and Floor: ${dataObject.SalonAndFloor} \n
Outdoor and Balcony: ${dataObject.OutdoorAndBalcony} \n \n
Happy cleaning 🧼😉!
`
}

module.exports = {buildDailyDutyMessage,buildWeeklyCleaningMessage}
