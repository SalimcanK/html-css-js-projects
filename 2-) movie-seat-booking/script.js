const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


// call this before assigning ticketPrice so it shows up the correct prices when page reloads
populateUI();


let ticketPrice = +movieSelect.value; // + converts the type of movieSelect to number from string



// -----Event Listeners----- //

// Seat click event
container.addEventListener('click', e => {

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        
        e.target.classList.toggle('selected');
        updateSelectedCount();
    } 
})

// Movie select event
movieSelect.addEventListener('change', e => {

    ticketPrice = +e.target.value;
    updateSelectedCount();

    // Getting info for local storage
    setMovieData(e.target.selectedIndex, e.target.value);
})

// Init count and total so when page is reloaded, they show up correctly
document.addEventListener('DOMContentLoaded', updateSelectedCount);



// -----Functions----- //

// Update count and total
function updateSelectedCount() {

    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Save seats to local storage
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Save selected movie index and price for local storage
const setMovieData = (movieIndex, moviePrice) => {

    localStorage.setItem('selectedMovieIndex', movieIndex);
}

// Get data from local storage and populate UI
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}