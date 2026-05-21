const express = require("express");

const router = express.Router();

const db = require("../db");

const bcrypt = require("bcryptjs");


// ============================
// SIGNUP API
// ============================

router.post("/signup", async (req, res) => {

    const { username, email, password } = req.body;

    // CHECK EMPTY FIELDS

    if (!username || !email || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    // CHECK IF EMAIL ALREADY EXISTS

    const checkQuery = "SELECT * FROM users_final WHERE email=?";

    db.query(checkQuery, [email], async (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        // EMAIL EXISTS

        if (result.length > 0) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        try {

            // HASH PASSWORD

            const hashedPassword = await bcrypt.hash(password, 10);

            // INSERT USER

            const insertQuery = `
                INSERT INTO users_final(username, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(

                insertQuery,

                [username, email, hashedPassword],

                (err, data) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Signup Failed"
                        });

                    }

                    return res.status(201).json({
                        message: "Signup Successful"
                    });

                }

            );

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                message: "Server Error"
            });

        }

    });

});


// ============================
// EXPORT ROUTER
// ============================

module.exports = router;