// Import the js file to test
import { isValidURL } from "../src/client/js/formFunctions"

describe('isValidURL', () => {
    test('it should return true for a valid URL', () => {
        const url = 'https://example.com';
        expect(isValidURL(url)).toBe(true);
    });
  
    test('it should return false for an invalid URL', () => {
        const url = 'not a URL';
        expect(isValidURL(url)).toBe(false);
    });
});
  