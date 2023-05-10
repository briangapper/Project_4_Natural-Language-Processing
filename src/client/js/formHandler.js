// ********************************************************************************
// --------------------------------------------------------------------------------
// 0.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
import { isValidURL } from './formFunctions'

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) VARIABLES
// --------------------------------------------------------------------------------
// ********************************************************************************
const port = 9000;
const pathGetData = `http://localhost:${port}/meaningCloud`;

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 2.1) function getSentimentData: makes POST server request to fetch URL to API
// --------------------------------------------------------------------------------
async function getSentimentData(event) {

    // prevent default behavior
    event.preventDefault();

    // Get user URL input
    let inputURL = document.getElementById('url').value.trim();
    console.log('User Input URL: ', inputURL);

    // check if URL is empty
    if(!inputURL){ return alert('Please enter a URL!') }

    // check if URL has a valid format
    if(isValidURL(inputURL)){

        try {

            let result = await fetch(pathGetData, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url: inputURL})
            });

            let data = await result.json()

            console.log('MeaningCloud Response: ', data)
            
            document.getElementById('status').innerHTML = data.status
            document.getElementById('polarity').innerHTML = data.polarity
            document.getElementById('subjectivity').innerHTML = data.subjectivity
            document.getElementById('confidence').innerHTML = data.confidence
            document.getElementById('text').innerHTML = data.text

        } catch(error) {

            document.getElementById('status').innerHTML = "Request didn't work"
            console.log('ERROR function getSentimentData: ', error)
        
        }

    } else {
        return alert('Please enter a valid URL!')
    }
}

export {
    getSentimentData
}