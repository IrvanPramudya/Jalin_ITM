const connectiontoITMAS400 = require('../ITM/dbConfig')
async function listPort() {
    try {
        await connectiontoITMAS400.getConnection()
        const mp46 = await connectiontoITMAS400.selectQueryExecute(`select dvvdev,dvport from asidjl46m1.ztcpdv0p tcp where tcp.dvport between 2000 and 2099`)
        const prodmp = await connectiontoITMAS400.selectQueryExecute(`select dvvdev,dvport from asidjln46m.ztcpdv0p tcp where tcp.dvport between 2000 and 2099`)
        const npg46 = await connectiontoITMAS400.selectQueryExecute(`select dvvdev,dvport from ASIDJL46N2.ztcpdv0p tcp where tcp.dvport between 2000 and 2099`)
        const prodnpg = await connectiontoITMAS400.selectQueryExecute(`select dvvdev,dvport from ASIDJLN46N.ztcpdv0p tcp where tcp.dvport between 2000 and 2099`)
        const link29 = await connectiontoITMAS400.selectQueryExecute(`select dvvdev,dvport from ASID0902LK.ztcpdv0p tcp where tcp.dvport between 2000 and 2099`)
        const usedPorts = [
            ...mp46.map(row => parseInt(row.DVPORT)), 
            ...prodmp.map(row => parseInt(row.DVPORT)), 
            ...npg46.map(row => parseInt(row.DVPORT)), 
            ...prodnpg.map(row => parseInt(row.DVPORT)), 
            ...link29.map(row => parseInt(row.DVPORT))
        ];
        const allPorts = Array.from({length: 100}, (_, i) => 2000 + i);

        const freePorts = allPorts.filter(port => !usedPorts.includes(port));
        return freePorts
    } catch (err) {
        console.error(`Error:`, err);
    }
}
listPort().then((data) =>{
    console.info(data)
}).catch((err) =>{
    console.error("ERROR listing ports with ",err)
}).finally(()=>connectiontoITMAS400.closeConnection())
module.exports = listPort
