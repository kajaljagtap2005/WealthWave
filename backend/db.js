const mysql = require("mysql2");

require("dotenv").config();


const connection = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT

});


// CONNECT DATABASE

connection.connect((err) => {

    if (err) {

        console.log("Database Error:", err);

    } else {

        console.log("MySQL Connected Successfully");

        // CREATE TABLE AUTOMATICALLY

        const createTableQuery = `

            CREATE TABLE IF NOT EXISTS users_final (

                id INT AUTO_INCREMENT PRIMARY KEY,

                username VARCHAR(100) NOT NULL,

                email VARCHAR(100) UNIQUE NOT NULL,

                password VARCHAR(255) NOT NULL,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )

        `;

        connection.query(createTableQuery, (err, result) => {

            if (err) {

                console.log("Table Creation Error:", err);

            } else {

                console.log("users_new table ready");

            }

        });

    }

});

module.exports = connection;