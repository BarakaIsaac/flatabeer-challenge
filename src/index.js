// Code here

// Define server URL 
let pathURL = `http://localhost:3000/beers`

// Fetch first beer from server
fetchFirstBeer();

function fetchFirstBeer(index = 1) {
    fetch(`${pathURL}/${index}`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const beerName = document.getElementById("beer-name")
            beerName.textContent = data.name;
            beerName.dataset.id = data.id;


            document.getElementById("beer-image").src = data.image_url
            document.getElementById("beer-description").textContent = data.description

            // reviews
            const review = data.reviews
            document.getElementById("review-list").innerHTML = '';
            for (let i = 0; i < review.length; i++) {
                const listReviews = `<li>${review[i]}</li>`;

                document.querySelector('#review-list').insertAdjacentHTML('beforeend', listReviews);
            }
        })

}


// Define instance to fetch all beers from server    

// Fetch all beers from server and replace
fetchAllBeers();

function fetchAllBeers() {
    fetch(pathURL)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            const listBeers = document.getElementById("beer-list");
            listBeers.innerHTML = "";
            data.forEach(element => {
                const listItem = document.createElement("li");
                listItem.textContent = element.name;
                listBeers.appendChild(listItem);
            })
        })
}

// Load Review

document.getElementById("review-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedReviews = [];
    document.querySelectorAll('#review-list li').forEach(element => {
        updatedReviews.push(element.textContent);
    })
    updatedReviews.push(event.target.review.value);
    // console.log(reviews);
    const beerId = document.getElementById("beer-name").dataset.id;
    fetch(`${pathURL}/${beerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                reviews: updatedReviews
            })
        })
        .then((response) => {
            return response.json();
        })
        .then(beer => beer)
        .catch(error => { console.log(error.message); })
})