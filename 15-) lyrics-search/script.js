const UIform = document.getElementById('form');
const UIsearch = document.getElementById('search');
const UIresult = document.getElementById('result');
const UImore = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// Put data in DOM
function showData(data) {
    UIresult.innerHTML = `
    <ul class="songs">
      ${data.data.map(song => `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`)
        .join('')
    }
    </ul>
    `;

    if(data.prev || data.next) {
        more.innerHTML = `
          ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
          ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    } else {
        more.innerHTML = '';
    }
}

// Get songs for prev and next pages
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// Get lyrics for the selected song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    UIresult.innerHTML = `
      <h2><strong>${artist}</strong> - ${songTitle}</h2>
      <span>${lyrics}</span>
      `;

    UImore.innerHTML = '';
}



// Event Listeners //

// Search button
UIform.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = UIsearch.value.trim();

    if (!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

// Get lyrics button
UIresult.addEventListener('click', e => {
    const clickedEl = e.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');
        
        
        getLyrics(artist, songTitle);
    }
})