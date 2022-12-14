const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    connectionLimit: 5,
    port: 3306,
    host: "localhost",
    user: "root",
    database: "base_ms",
    password: "root"
});

class DatabaseController{
    constructor(){
        this.pool = pool
    }

    initializeTables(){
        console.log("tables already exists")
    }
}

module.exports = new DatabaseController()