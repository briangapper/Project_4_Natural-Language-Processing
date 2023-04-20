var path = require('path')
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

// Add CORS middleware
app.use(cors())

app.use(express.static('dist/prod'))
console.log(__dirname)

app.get('/', function(req, res){
    res.sendFile('dist/prod/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(9000, function(){
    console.log('App listening on port 9000!')
})

app.get('/test', function(req, res){
    res.send(mockAPIResponse)
})