import mysql from "mysql2/promise";

export const basen = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'haslo',
    database: 'wiadomosci',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
