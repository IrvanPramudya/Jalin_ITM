const connectiontoITMAS400 = require('../ITM/dbConfig')
async function updateNewDate(){
    await connectiontoITMAS400.getConnection()
    const dates = {
        previousDate: await connectiontoITMAS400.getDateWithOffset(-1), // Tanggal kemarin
        todayDate: await connectiontoITMAS400.getDateWithOffset(0),     // Tanggal hari ini
        nextDate: await connectiontoITMAS400.getDateWithOffset(1)       // Tanggal besok
    };
    const queries = [
        {query:`UPDATE ASIDJL46M1.zparct0p SET PCPSDT=?,PCCSDT = ?,PCNSDT=?`,params:[dates.previousDate,dates.todayDate,dates.nextDate]},
        {query:`UPDATE ASIDJLN46M.zparct0p SET PCPSDT=?,PCCSDT = ?,PCNSDT=?`,params:[dates.previousDate,dates.todayDate,dates.nextDate]},
        {query:`UPDATE ASIDJL46N2.zparct0p SET PCPSDT=?,PCCSDT = ?,PCNSDT=?`,params:[dates.previousDate,dates.todayDate,dates.nextDate]},
        {query:`UPDATE ASIDJLN46N.zparct0p SET PCPSDT=?,PCCSDT = ?,PCNSDT=?`,params:[dates.previousDate,dates.todayDate,dates.nextDate]},
        {query:`UPDATE ASID0902LK.zparct0p SET PCPSDT=?,PCCSDT = ?,PCNSDT=?`,params:[dates.previousDate,dates.todayDate,dates.nextDate]}
    ]
    await connectiontoITMAS400.executeTransactionalQuery(queries)
}
updateNewDate().then(()=>{
    console.info("UPDATED DONE")
}).catch(err =>{
    console.error("ERROR UPDATING with ",err)
}).finally(()=>{
    connectiontoITMAS400.closeConnection()
})
module.exports=updateNewDate
