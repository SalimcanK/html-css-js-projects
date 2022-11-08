const UIword = document.getElementById('word');
const UItext = document.getElementById('text');
const UIscoreEl = document.getElementById('score');
const UItimeEl = document.getElementById('time');
const UIendgameEl = document.getElementById('end-game-container');
const UIsettingsBtn = document.getElementById('settings-btn');
const UIsettings = document.getElementById('settings');
const UIsettingsForm = document.getElementById('settings-form');
const UIdifficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];


// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty to selected value
UIdifficultySelect.value = difficulty;

// Focus on text at start
UItext.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  UIword.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  UIscoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  UItimeEl.innerHTML = time + 's';

  if(time > 0) {
    UIdifficultySelect.disabled = true;
  }

  if(time === 0) {
    clearInterval(timeInterval);
    UIdifficultySelect.disabled = false;
    gameOver();
  }

  if(time < 5) {
    UItimeEl.style.color = 'red';
  }
}

// Game over
function gameOver() {
  UIendgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `
  UIendgameEl.style.display = 'flex';
}

addWordToDOM();




// Event listeners //


// Typing
UItext.addEventListener('input', e => {
  const insertedText = e.target.value;
  
  if(insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input
    e.target.value = '';

    if(difficulty === 'hard') {
      time += 1;
    } else if(difficulty === 'medium') {
      time +=3;
    } else {
      time += 5;
    }
    
    updateTime();
  }
})


// Cog button click
UIsettingsBtn.addEventListener('click', () => UIsettings.classList.toggle('hide'));


// Difficulty select
UIsettingsForm.addEventListener('change', e=> {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})