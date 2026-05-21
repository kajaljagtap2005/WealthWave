const express = require("express");
const router = express.Router();

const db = require("../db");
const bcrypt = require("bcryptjs");


// ============================
// SIGNUP API
// ============================

router.post("/signup", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const checkQuery = "SELECT * FROM users_final WHERE email=?";

    db.query(checkQuery, [email], async (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        if (result.length > 0) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = `
                INSERT INTO users_final(username,email,password)
                VALUES(?,?,?)
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
// LOGIN API
// ============================

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const loginQuery = "SELECT * FROM users_final WHERE email=?";

    db.query(loginQuery, [email], async (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        if (result.length === 0) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        return res.status(200).json({

            message: "Login Successful",

            username: user.username

        });

    });

});

module.exports = router;