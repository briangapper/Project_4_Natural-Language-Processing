// Define port and server paths
const port = 9000;
const pathGetData = `http://localhost:${port}/meaningCloud`;

// function getSentimentData: makes GET server request to fetch URL to API 
async function getSentimentData(event) {
    event.preventDefault();

    // Get user URL input
    let inputURL = document.getElementById('url').value.trim();
    console.log('inputURL: ', inputURL);

    // check if URL is empty
    if(!inputURL){

        alert('Please enter a URL!')
        return

    }

    // check if URL has a valid format
    let check = Client.isValidURL(inputURL);

    if(check == true){

        try {

            console.log('Starting fetch')

            let result = await fetch(pathGetData, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url: inputURL})
            });

            let data = await result.json()

            console.log('Result: ', data)
            
            document.getElementById('status').innerHTML = data.status
            document.getElementById('polarity').innerHTML = data.polarity
            document.getElementById('subjectivity').innerHTML = data.subjectivity
            document.getElementById('confidence').innerHTML = data.confidence
            document.getElementById('text').innerHTML = data.text

        } catch(error) {

            console.log('ERROR function getSentimentData: ', error)

            document.getElementById('status').innerHTML = "Request didn't work"
            document.getElementById('polarity').innerHTML = ''
            document.getElementById('subjectivity').innerHTML = ''
            document.getElementById('confidence').innerHTML = ''
            document.getElementById('text').innerHTML = ''
        
        } finally {

            console.log('END function getSentimentData')

        }

    } else {

        alert('Please enter a valid URL!')

    }
}

export {
    getSentimentData
}