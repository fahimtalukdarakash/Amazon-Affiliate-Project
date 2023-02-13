require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose")
const app = express();

const PORT = process.env.PORT || 3000;

// Packages
const cors = require('cors');
const cookieParser = require('cookie-parser')

//database
const connectDB = require('./db/connect')

const authRouter = require('./routes/authRoutes')

// Express Middleware
app.use(express.json());

// Suppress the deprecation warning
mongoose.set('strictQuery', false)

//home route
app.get('/', (req,res) => {
    res.send('<h1>Welcome To the API</h1>')
})

// Print URL Request from client
app.use((req, res, next) => {
    console.log(`URL Requested: ${req.originalUrl}`);
    next();
});

//cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

// routes
app.use('/api/v1/auth', authRouter)


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log(`Server in listening on port ${PORT}...`))
    } catch(error){
        console.log(error)
    }
}

start()