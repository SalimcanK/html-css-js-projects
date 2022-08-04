const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'javascript', 'software'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];



// Show hidden word
function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(letter => 
        `<span class="letter">
           ${correctLetters.includes(letter) ? letter : ''}
        </span>`
        )
    .join('')}`

    const isGuessed = selectedWord.split('').every(letter => correctLetters.includes(letter));

    if(isGuessed) {
        finalMessage.innerText = 'Congratulations! You won :)';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLetters() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`
    
    // Display parts of the hangman
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Check if lost
    if(wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'Unfortunately, you lost :(';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if(e.key >= 'a' && e.key <='z') {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    // Choose a new random word
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetters();

    popup.style.display = 'none';
})

displayWord();