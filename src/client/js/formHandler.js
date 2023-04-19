function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementsById('name').value
    checkForName(formText)

    console.log('::: Form Submitted :::')
    fetch('https://localhost:3000/test')
    .then(res => res.json())
    .then(function(res){
        document.getElementsById('results').innerHTML = res.message
    })
}

export {
    handleSubmit
}