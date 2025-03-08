const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.HOST,  
  user: process.env.USER,             
  password: process.env.PASSWORD,     
  database:process.env.DATABASE,      
  port: 3306,                       
});


connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

module.exports = connection;
