const database = require('node-jt400');

class databaseConnection{
    constructor(configuration){
        this.configuration = configuration
        this.poolConnection = database.pool(configuration)
    }
    async getDateWithOffset(offset = 0) {
    let date = new Date();
    date.setDate(date.getDate() + offset);

    let getYear = date.getFullYear().toString().substr(-2, 2);
    let getMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    let getDate = date.getDate().toString().padStart(2, '0');

    return `1${getYear}${getMonth}${getDate}`;
    }   
    async getConnection(){
        try{
            console.time('TRYING CONNECT DATABASE')
            await database.connect(this.configuration)
            console.timeEnd('TRYING CONNECT DATABASE')
            console.info('DATABASE SUCCESFULLY CONNECTED')
        }
        catch(err){
            console.error('Failed to get connection from database : ', err)
            throw err
        }
    }
    async executeQuery(query,params=[]){
        try{
            return await this.poolConnection.update(query,params)
        }
        catch(error){
            console.error('Failed to execute query : ', error)
            throw error
        }
    }
    async executeTransactionalQuery(queries = []){
        try{
            for(const{query,params} of queries){
                await this.executeQuery(query,params)
                await this.closeConnection()
            }
        }
        catch(error){
            console.error(`TRANSACTION FAILED, ROLLING BACK : ${error}`)
            throw error
        }
        finally{
            await this.closeConnection()
        }
    }
    async selectQueryExecute(query){
        try{
            return await this.poolConnection.query(query)
        }
        catch(error){
            console.error('Failed to execute query : ', error)
            throw error
        }
    }
    async closeConnection() {
        try {
            await this.poolConnection.close();
            console.log('Connection closed successfully');
        } catch (error) {
            console.error('Error closing connection:', error);
        }
    }
}

module.exports = databaseConnection