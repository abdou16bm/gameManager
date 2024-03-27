const mysql = require('mysql');

let connection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'game_management',
    multipleStatements : true,
    timezone : 'utc'
});

connection.connect();
db = connection;
exports.db = db;

