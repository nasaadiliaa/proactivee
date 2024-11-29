const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express'
});

connection.connect((err) => {
    if (err){
        console.error('Error conncetion to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID' + connection.threadId);
});

module.exports = connection;
