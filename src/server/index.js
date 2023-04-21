// ****************************************
// ----------------------------------------
// 1.) REQUIRES
// ----------------------------------------
// ****************************************
var path = require('path');

// express: web application framework for Node.js that provides a set of features and tools to build web applications and APIs
const express = require('express');
// cors: used to protect web servers from unauthorized access, malicious attacks, and data theft
const cors = require('cors');
// dotenv: used to load environment variables from a .env file into the process.env object in Node.js
const dotenv = require('dotenv');
dotenv.config();
// axios: used to make HTTP requests from the Node.js application to the MeaningCloud API
const axios = require('axios');
// local import
const mockAPIResponse = require('./mockAPI.js');

// ****************************************
// ----------------------------------------
// 2.) SERVER CONFIG
// ----------------------------------------
// ****************************************
const app = express()
app.use(cors())

app.use(express.static('dist/prod'))
console.log(__dirname)

app.get('/', function(req, res){
    res.sendFile('dist/prod/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(9000, function(){
    console.log('App listening on port 9000!')
})

app.get('/test', function(req, res){
    res.send(mockAPIResponse)
})

// ****************************************
// ----------------------------------------
// 3.) API CONFIG
// ----------------------------------------
// ****************************************
async function getSentiment(text){
    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${text}`
    const response = await axios.get(url)
    return response.data
}

getSentiment('This is a positive sentence.')
  .then(data => {
    console.log('Message: ')
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
