// function checkForURL: check is URL is empty
function checkForURL(url){
    
    let check = false

    if(!url){

        console.log('inputURL is wrong!')
        return check;

    } else {

        console.log('inputURL is valid!')
        check = true;
        return check;
        
    }
}

export {
    checkForURL
}