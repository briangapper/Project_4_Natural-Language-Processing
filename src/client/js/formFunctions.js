// function isValidURL: check if URL has a valid format
function isValidURL(url){

    const regex = /^(http(s)?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url);
          
}

export {
    isValidURL
}