const express = require("express");

const router = express.Router();

const db = require("../db");

const bcrypt = require("bcryptjs");


// ============================
// SIGNUP API
// ============================

router.post("/signup", async(req,res)=>{

    const {username,email,password} = req.body;


    // CHECK EMPTY FIELDS

    if(!username || !email || !password){

        return res.status(400).json({

            message:"All fields are required"

        });

    }


    // CHECK EMAIL EXISTS

    const checkQuery = "SELECT * FROM users WHERE email=?";


    db.query(checkQuery,[email], async(err,result)=>{

        if(err){

            return res.status(500).json({

                message:"Database Error"

            });

        }


        if(result.length > 0){

            return res.status(400).json({

                message:"Email already exists"

            });

        }


        // HASH PASSWORD

        const hashedPassword = await bcrypt.hash(password,10);


        // INSERT USER

        const insertQuery = `

            INSERT INTO users(username,email,password)

            VALUES(?,?,?)

        `;


        db.query(

            insertQuery,

            [username,email,hashedPassword],

            (err,data)=>{

                if(err){

                 console.log(err);

                 return res.status(500).json({

                 message:"Signup Failed"

            });

        }
                res.status(201).json({

                    message:"Signup Successful"

                });

            }

        );

    });

});


module.exports = router;