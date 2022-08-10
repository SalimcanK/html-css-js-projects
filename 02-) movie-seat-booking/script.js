const containerUI = document.querySelector('.container');
const seatsUI = document.querySelectorAll('.row .seat:not(.occupied');
const countUI = document.getElementById('count');
const totalUI = document.getElementById('total');
const movieSelectUI = document.getElementById('movie');


// call this before assigning ticketPrice so it shows up the correct prices when page reloads
populateUI();


let ticketPrice = +movieSelectUI.value; // + converts the type of movieSelect to number from string



// -----Event Listeners----- //

// Seat click event
containerUI.addEventListener('click', e => {

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        
        e.target.classList.toggle('selected');
        updateSelectedCount();
    } 
})

// Movie select event
movieSelectUI.addEventListener('change', e => {

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
        return [...seatsUI].indexOf(seat);
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;
    countUI.innerText = selectedSeatsCount;
    totalUI.innerText = selectedSeatsCount * ticketPrice;
}

// Save selected movie index for local storage
const setMovieData = (movieIndex) => {

    localStorage.setItem('selectedMovieIndex', movieIndex);
}

// Get data from local storage and populate UI
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seatsUI.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelectUI.selectedIndex = selectedMovieIndex;
    }
}