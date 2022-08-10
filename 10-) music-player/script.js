const UImusicContainer = document.getElementById('music-container');

const UIplayBtn = document.getElementById('play');
const UIprevBtn = document.getElementById('prev');
const UInextBtn = document.getElementById('next');

const UIaudio = document.getElementById('audio');
const UIprogress = document.getElementById('progress');
const UIprogressContainer = document.getElementById('progress-container');
const UItitle = document.getElementById('title');
const UIcover = document.getElementById('cover');


// Song titles
const songs = ['can you feel my heart', 'better call saul', 'it has to be this way'];


// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);




// Update song details
function loadSong(song) {
    title.innerText = song;
    UIaudio.src = `music/${song}.mp3`;
    UIcover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
    UImusicContainer.classList.add('play');
    UIplayBtn.querySelector('i.fas').classList.remove('fa-play');
    UIplayBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    UImusicContainer.classList.remove('play');
    UIplayBtn.querySelector('i.fas').classList.add('fa-play');
    UIplayBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    //console.log(e.srcElement);
    const {duration, currentTime} = e.srcElement;
    //console.log(duration, currentTime);

    const progressPercent = (currentTime / duration) * 100;
    UIprogress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    //console.log(this.clientWidth);
    const clickX = e.offsetX;
    //console.log(e.offsetX);
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}




// Event Listeners //
UIplayBtn.addEventListener('click', () => {
    const isPlaying = UImusicContainer.classList.contains('play');
    
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Change song
UIprevBtn.addEventListener('click', prevSong);
UInextBtn.addEventListener('click', nextSong);

// Progress bar update
UIaudio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
UIprogressContainer.addEventListener('click', setProgress);

// Song ends
UIaudio.addEventListener('ended', nextSong);