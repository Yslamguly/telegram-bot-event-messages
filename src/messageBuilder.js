const buildDailyDutyMessage = (dataObject) => {
    return `Today: ${dataObject.Date} \n 
Breakfast: ${dataObject.Breakfast} \n
What we have for dinner: ${dataObject.Dinner} \n
Responsible for dinner: ${dataObject.Name}
Link: ${dataObject.Link}
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
