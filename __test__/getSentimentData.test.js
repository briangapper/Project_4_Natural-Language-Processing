// ************************************************************
// ------------------------------------------------------------
// 0.) IMPORTS
// ------------------------------------------------------------
// ************************************************************
import { getSentimentData } from '../src/client/js/formHandler.js'

// ************************************************************
// ------------------------------------------------------------
// 1.) JEST
// ------------------------------------------------------------
// ************************************************************
describe('getSentimentData', () => {

    // ************************************************************
    // ------------------------------------------------------------
    // 1.1) AUTOMATISMS
    // ------------------------------------------------------------
    // ************************************************************

    // ------------------------------
    // 1.1.1) Before every test
    // ------------------------------
    beforeEach(() => {
        // Set up the DOM
        document.body.innerHTML = `
            <form id="form">
                <input id="url" type="text" name= "input" value="https://www.nytimes.com/2023/05/03/business/economy/federal-reserve-interest-rates-may.html" placeholder="URL to be analyzed">
                <input type="submit" name="" value="Analyze" onclick="return getSentimentData(event)">
            </form>
            <div id="status"></div>
            <div id="polarity"></div>
            <div id="subjectivity"></div>
            <div id="confidence"></div>
            <div id="text"></div>
        `;
    });

    // ------------------------------
    // 1.1.2) After every test
    // ------------------------------
    afterEach(() => {
        // Clean up the DOM
        document.body.innerHTML = '';
    });

    // ************************************************************
    // ------------------------------------------------------------
    // 1.2) TESTS
    // ------------------------------------------------------------
    // ************************************************************
    
    // ------------------------------------------------------------
    // 1.2.1) Test 1: Fetch sentiment data and update DOM
    // ------------------------------------------------------------
    test('should fetch sentiment data and update the DOM', async () => {

        // Mock the fetch() function to succeed
        const mockFetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                status: 'OK',
                polarity: 'N',
                subjectivity: 'OBJECTIVE',
                confidence: '100',
                text: 'This is some text'
            })
        }));
        
        // Set mockFetch to global
        global.fetch = mockFetch;

        // Call the function with a PointerEvent
        await getSentimentData(new Event('pointerdown'));

        // Expect the fetch() function to have been called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/meaningCloud', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: document.getElementById('url').value })
        });

        // Expect the DOM to have been updated with the sentiment data
        expect(document.getElementById('status').innerHTML).toBe('OK');
        expect(['P+', 'P', 'NEU', 'N', 'N+', 'NONE']).toContainEqual(document.getElementById('polarity').innerHTML);
        expect(['OBJECTIVE', 'SUBJECTIVE']).toContainEqual(document.getElementById('subjectivity').innerHTML);

        const value = parseInt(document.getElementById('confidence').innerHTML);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
        expect(Number.isInteger(value)).toBe(true);

        expect(document.getElementById('text').innerHTML).toBe('This is some text');
    });

    // ------------------------------------------------------------
    // 1.2.2) Test 2: Show error message when fetch fails
    // ------------------------------------------------------------
    test('should show an error message when the fetch() function fails', async () => {

        // Create new Error Object
        const error = new Error('Request failed');

        // Mock the fetch() function to fail
        const mockFetch = jest.fn(() => Promise.reject(error));

        // Set mockFetch to global
        global.fetch = mockFetch;

        // Call the function with a PointerEvent
        await getSentimentData(new Event('pointerdown'));

        // Expect the DOM to show an error message
        expect(document.getElementById('status').innerHTML).toBe("Request didn't work");
        expect(document.getElementById('polarity').innerHTML).toBe('');
        expect(document.getElementById('subjectivity').innerHTML).toBe('');
        expect(document.getElementById('confidence').innerHTML).toBe('');
        expect(document.getElementById('text').innerHTML).toBe('');
    });

    // ------------------------------------------------------------
    // 1.2.3) Test 3: Show alert if URL is empty
    // ------------------------------------------------------------
    test('should show an alert if the URL is empty', async () => {

        // Set the URL input to be empty
        document.getElementById('url').value = '';

        // Mock the alert() function
        global.alert = jest.fn();

        // Call the function with a PointerEvent
        await getSentimentData(new Event('pointerdown'));

        // Expect the DOM to show an alert message
        expect(global.alert).toHaveBeenCalledWith('Please enter a URL!');
    });

    // ------------------------------------------------------------
    // 1.2.4) Test 4: Show alert if URL is invalid
    // ------------------------------------------------------------
    test('should show an alert if the URL is invalid', async () => {

        // Set the URL input to be invalid
        document.getElementById('url').value = 'not a URL';

        // Mock the alert() function
        global.alert = jest.fn();
        
        // Call the function with a PointerEvent
        await getSentimentData(new Event('pointerdown'));
  
        // Expect the DOM to show an alert message
        expect(global.alert).toHaveBeenCalledWith('Please enter a valid URL!');
    });
});