require('dotenv').config();
const express = require('express')

const {
    SERVER_PORT
} = process.env

const app = express();

app.listen(SERVER_PORT, ()=> {
    console.log(`Yo bitch stuff is happening on: ${SERVER_PORT}`)
})