//require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
CONFIG.db_name      = process.env.DB_NAME       || 'mifincaDB';
CONFIG.db_user      = process.env.DB_USER       || 'rpi';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'le3el';
CONFIG.db_script    = './config/mysqlDB/mysql_Structure_Script.sql';
CONFIG.db_connection_limit = 10;
CONFIG.db_timezone = 'UTC-3';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

CONFIG.firebasePath = "/proyectos/lasArabias";
CONFIG.firebaseEmail = "emilopez13@gmail.com";
CONFIG.firebasePassword = "Eimer.13";
CONFIG.firebaseConfig = {
    apiKey: "AIzaSyDcWf0VKB-tzX4F16erMJEmz49_ybFlLow",
    authDomain: "mifinca-fb.firebaseapp.com",
    databaseURL: "https://mifinca-fb.firebaseio.com",
    projectId: "mifinca-fb",
    storageBucket: "mifinca-fb.appspot.com",
    messagingSenderId: "513802907593",
    appId: "1:513802907593:web:0c049bc27cfb0d80"
};

module.exports = CONFIG;
