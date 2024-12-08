import mysql from 'mysql2';  // Ganti require dengan import

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'time_management_platform'
});

connection.connect((err) => {
    if (err){
        console.error('Error connection to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID ' + connection.threadId);
});

export default connection; 
