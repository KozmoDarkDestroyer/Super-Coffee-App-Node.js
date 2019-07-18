const mysql = require('mysql');
const { config } = require('../config/config');
const db = mysql.createPool(config.database);

db.getConnection((err,connection) =>{
    if (err) {
        throw new Error(err);
    }
    else if (connection) {
        console.log('Database Online');
        return;
    }
})

module.exports = db;