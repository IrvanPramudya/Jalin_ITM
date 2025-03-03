const connection = require('../ITM/connection');
const config = {
    host            :'13.131.5.25',
    user            :'@IRVAN',
    password        :'JALIN123',
    connectionLimit :5,
    keepAlive       :false,
}
const connectiontoITMAS400 = new connection(config)
module.exports = connectiontoITMAS400;