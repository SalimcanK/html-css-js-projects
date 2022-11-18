const UIcardsContainer = document.getElementById('cards-container');
const UIprevBtn = document.getElementById('prev');
const UInextBtn = document.getElementById('next');
const UIcurrentEl = document.getElementById('current');
const UIshowBtn = document.getElementById('show');
const UIhideBtn = document.getElementById('hide');
const UIquestionEl = document.getElementById('question');
const UIanswerEl = document.getElementById('answer');
const UIaddCardBtn = document.getElementById('add-card');
const UIclearBtn = document.getElementById('clear');
const UIaddContainer = document.getElementById('add-container');



// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cards = [];

// Store card data
const cardsData = getCardsFromLocalStorage();

// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ]


// Create all cards
function createDOMCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
      <div class="inner-card">
       <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
       </div>
       <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
       </div>
      </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add card to DOM cards
    cards.push(card);

    UIcardsContainer.appendChild(card);

    updateNumberText();
}

// Show number of cards
function updateNumberText() {
    UIcurrentEl.innerText = `${ currentActiveCard + 1} / ${cards.length}`;
}

// Get cards from local storage
function getCardsFromLocalStorage() {
    const storedCards = JSON.parse(localStorage.getItem('cards'));
    return storedCards === null ? [] : storedCards;
}

// Save cards to local storage
function cardsToLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}



createDOMCards();



// Event Listeners //

// Next button
UInextBtn.addEventListener('click', () => {
    cards[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if(currentActiveCard > cards.length - 1) {
        currentActiveCard = cards.length - 1;
    }

    cards[currentActiveCard].className = 'card active';
    
    updateNumberText();
});

// Previous button
UIprevBtn.addEventListener('click', () => {
    cards[currentActiveCard].className = 'card right'

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cards[currentActiveCard].className = 'card active';

    updateNumberText();
})

// Show add container
UIshowBtn.addEventListener('click', () => UIaddContainer.classList.add('show') )

// Hide add container
UIhideBtn.addEventListener('click', () => UIaddContainer.classList.remove('show') )

// Add new card button
UIaddCardBtn.addEventListener('click', () => {
    const question = UIquestionEl.value;
    const answer = UIanswerEl.value;

    if(question.trim() && answer.trim()) {
        const newCard = { question, answer};

        UIquestionEl.value = '';
        UIanswerEl.value = '';

        UIaddContainer.classList.remove('show')

        cardsData.push(newCard);

        createCard(newCard, cardsData.indexOf(newCard));

        cardsToLocalStorage(cardsData);
    }
})

// Clear cards button
UIclearBtn.addEventListener('click', () => {
    localStorage.clear();
    UIcardsContainer.innerHTML = '';
    window.location.reload();
})