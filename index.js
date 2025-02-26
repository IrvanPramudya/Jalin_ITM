const express = require('express');
const date = require('../ITM/updatebit15');

const app = express();
const port = 5000

app.use(express.json());

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})