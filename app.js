require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (res) => {
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})

require('./src/routes/auth-rotes')(app);
require('./src/config/mongo')(app);