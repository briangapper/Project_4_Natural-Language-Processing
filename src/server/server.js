// ****************************************
// ----------------------------------------
// 1.) PACKAGES
// ----------------------------------------
// ****************************************

// 1.1) path: specifies the location of the module that needs to be loaded
var path = require('path');

// 1.2) express: web application framework for Node.js to build web applications and APIs
const express = require('express');

// 1.3) cors: used to protect web servers from unauthorized access, malicious attacks, and data theft
const cors = require('cors');

// 1.4) bodyparser: parses data and makes it available in req.body property
const bodyParser = require('body-parser');

// 1.5) dotenv: used to load environment variables from a .env file into the process.env object in Node.js
const dotenv = require('dotenv');
dotenv.config();

// 1.6) local function import
const mockAPIResponse = require('./mockAPI.js');

// ****************************************
// ----------------------------------------
// 2.) SERVER SETUP
// ----------------------------------------
// ****************************************

// 2.1) Configure app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// 2.2) Initiate express
app.use(express.static('dist/dev'));
// app.use(express.static('src'));

// 2.3) Initiate port
app.listen(9000, function(){
    console.log('App listening on port 9000!')
});

// ****************************************
// ----------------------------------------
// 3.) INITIATE ROUTES
// ----------------------------------------
// ****************************************

// 3.1) Initiate GET '/' route
app.get('/', function(req, res){
    res.sendFile('dist/dev/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// 3.2) Initiate testing route
app.get('/test', function(req, res){
    res.send(mockAPIResponse)
});

// 3.3) Initiate GET '/meaningCloud' route
app.post('/meaningCloud', getSentimentData);

// ****************************************
// ----------------------------------------
// 4.) INITIATE FUNCTIONS
// ----------------------------------------
// ****************************************

// 4.1) getSentimentData callback function 
async function getSentimentData(req, res){

    console.log('Body: ', req.body)

    const url = req.body.url;

    const api_url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${url}`;
    const response = await fetch(api_url);
    const data = await response.json();

    const result = {
        status: data.status['msg'],
        polarity: data['score_tag'],
        subjectivity: data['subjectivity'],
        confidence: data['confidence'],
        text: data.sentence_list[0].text
    };

    console.log('Data result: ', result)

    res.send(result);
}
