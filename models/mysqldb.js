const mysql = require('mysql');
const config = require('../config/configuration');

// function new_connection(){
//     return mysql.createPool({
//         host: 'localhost',
//         user: 'rpi',
//         password: 'l3.3l.',
//         database: 'mifincaDB',
//         connectionLimit: 10
//     });
// }


const pool = mysql.createPool({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name,
        connectionLimit: config.db_connection_limit,
        timezone: config.db_timezone
});

function new_connection(){
    return pool;
}

module.exports = new_connection();