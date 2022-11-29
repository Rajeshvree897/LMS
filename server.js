const express = require('express');
const dotenv  = require('dotenv').config();
var cors = require('cors');
require('./src/Database/connection');
const router = require('./src/Router/api')
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.use('/api',router); 
app.listen(PORT, () => {
    console.log(`Server is running with PORT ${PORT}`)
});