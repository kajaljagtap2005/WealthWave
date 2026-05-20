const express = require("express");

const cors = require("cors");

const db = require("./db");

const authRoutes = require("./routes/authRoutes");

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

// TEST ROUTE

app.get("/", (req,res)=>{

    res.send("WealthWave Backend Running");

});


// SERVER

const PORT = 5000;

app.listen(PORT, ()=>{

    console.log(`Server Running on Port ${PORT}`);

});