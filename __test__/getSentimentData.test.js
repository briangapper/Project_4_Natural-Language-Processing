// Import the js file to test
import { getSentimentData } from '../src/client/js/formHandler'

describe('getSentimentData', () => {
    beforeEach(() => {
        // Setup code before each test
        document.body.innerHTML = `
            <form>
                <input type="text" id="url" value="https://example.com">
                <input type="submit" name="" value="Analyze" onclick="return getSentimentData(event)">
            </form>
                <div id="status"></div>
                <div id="polarity"></div>
                <div id="subjectivity"></div>
                <div id="confidence"></div>
                <div id="text"></div>
        `;
    });

    afterEach(() => {
        // Cleanup code after each test
        jest.restoreAllMocks();
    });
  
    test('it should request data from MeaningCloud and update the UI with the result', async () => {
        // Mock the fetch() function
        const mockFetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
            status: 'success',
            polarity: 'positive',
            subjectivity: 'objective',
            confidence: 0.9,
            text: 'Example text'
            })
        }));
    
        global.fetch = mockFetch;
  
        // Trigger the form submit event
        const submitBtn = document.getElementsByName('')[0];
        submitBtn.click();
  
        // Assert that the fetch() function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith('/meaningCloud', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: 'https://example.com'})
        });

        // Assert that the UI was updated with the result
        expect(['P+', 'P', 'NEU', 'N', 'N+', 'NONE']).toContain(document.getElementById('polarity').innerHTML);
        expect(['Objective', 'Subjective']).toContain(document.getElementById('subjectivity').innerHTML);
        expect(Number(document.getElementById('confidence').innerHTML)).toBeGreaterThanOrEqual(0);
        expect(Number(document.getElementById('confidence').innerHTML)).toBeLessThanOrEqual(100);
    });
  
    test('it should show an alert if the URL is empty', async () => {
        // Mock the alert() function
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
        // Trigger the form submit event with an empty URL
        const submitBtn = document.getElementsByName('')[0];
        document.getElementById('url').value = '';
        submitBtn.click();
    
        // Assert that the alert() function was called with the correct message
        expect(mockAlert).toHaveBeenCalledWith('Please enter a URL!');
    });
  
    test('it should show an alert if the URL is invalid', async () => {
        // Mock the alert() function
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
        // Trigger the form submit event with an invalid URL
        const submitBtn = document.getElementsByName('')[0];
        document.getElementById('url').value = 'not a URL';
        submitBtn.click();
    
        // Assert that the alert() function was called with the correct message
        expect(mockAlert).toHaveBeenCalledWith('Please enter a valid URL!');
    });

    test('should handle errors and display an error message', async () => {
        const mockError = new Error('Test error');
        jest.spyOn(global, 'fetch').mockRejectedValue(mockError);
        document.getElementById = jest.fn().mockReturnValue({ value: 'https://example.com' });
    
        await getSentimentData({ preventDefault: jest.fn() });
    
        expect(document.getElementById('status').innerHTML).toBe("Request didn't work");
        expect(document.getElementById('polarity').innerHTML).toBe('');
        expect(document.getElementById('subjectivity').innerHTML).toBe('');
        expect(document.getElementById('confidence').innerHTML).toBe('');
        expect(document.getElementById('text').innerHTML).toBe('');
    });
});
  