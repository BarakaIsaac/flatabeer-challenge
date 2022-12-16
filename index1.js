fetch('https://my-json-server.typicode.com/wanjirumuigai/flatabeer/beers').then((response) => {
    console.log('resolved', response);
    return response.json();
}).then(data => {
    //get details the first beer from server

    document.getElementById("beer-name").textContent = data[0].name;
    document.getElementById("beer-image").src = data[0].image_url
    document.getElementById("beer-description").textContent = data[0].description
        //add a list of beers from the server
    document.getElementById("beer-list").innerHTML = "";
    data.forEach(user => {

        const markup = `<li>${user.name}</li>`
        document.querySelector("#beer-list").insertAdjacentHTML('beforeend', markup)
    });

    //replace reviews    
    const serverReviews = data[0].reviews // get reviews array from server 
    document.getElementById("review-list").innerHTML = ""; //delete the sample reviews from the html doc
    for (let i = 0; i < serverReviews.length; i++) { //loop through the reviews array and add the reviews to the html doc
        const markup = `<li>${serverReviews[i]}</li>`

        document.querySelector("#review-list").insertAdjacentHTML('beforeend', markup)

    }

    //error handling  
}).catch((err) => {
    console.log('rejected', err);
});

function handleData() {

}

//update description
const description = document.getElementById('beer-description')
const formDescription = document.getElementById('description-form')

formDescription.addEventListener('submit', e => {
        e.preventDefault(); //prevents page reloading

        const newDescr = document.getElementById('description').value.trim()

        if (newDescr.length) { //prevent null or spaces
            description.innerHTML = newDescr; //replace the beer description with the updated description
            formDescription.reset();
        }

    }

);


//add review
const form = document.querySelector("#review-form")
const review = document.querySelector('#review');
const list = document.querySelector("#review-list")

const addContent = addReview => {
    const html = `<li>${addReview}</li>`;
    list.innerHTML += html
}
form.addEventListener('submit', e => {
    e.preventDefault(); //prevents page reloading
    const toAdd = review.value.trim() //trims off empty space
    if (toAdd.length) { //ensure there at least one character typed
        addContent(toAdd);
        form.reset()
    }

});

//delete reviews

list.addEventListener('click', function(e) {
    this.removeChild(e.target);
});