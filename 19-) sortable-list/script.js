const draggable_listUI = document.getElementById('draggable-list');
const checkUI = document.getElementById('check');

const richestCountries = [
  'USA',
  'China',
  'Japan',
  'Germany',
  'India',
  'UK',
  'France',
  'Italy',
  'Canada',
  'Brazil'
];

// Store list items
const listItems = [];

let dragStartIndex;

// Scramble the list
function scrambleList() {
  return [...richestCountries]
    .map(a => ({value: a, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
}

createList();

// Insert list items into DOM
function createList() {  
  scrambleList().forEach((country, index) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="country-name">${country}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);
    draggable_listUI.appendChild(listItem);
  })

  dragEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index'); // + converts string to integer
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

// Swap items on drag and drop
function swapItems(startIndex, endIndex) {
  const startItemUI = listItems[startIndex].querySelector('.draggable');
  const endItemUI = listItems[endIndex].querySelector('.draggable');

  listItems[startIndex].appendChild(endItemUI);
  listItems[endIndex].appendChild(startItemUI);
}

function dragEventListeners() {
  const draggablesUI = document.querySelectorAll('.draggable');
  const dragListItemsUI = document.querySelectorAll('.draggable-list li');

  draggablesUI.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItemsUI.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const countryName = listItem.querySelector('.draggable').innerText.trim();
    if(countryName !== richestCountries[index]) {
      listItem.classList.add('false');
    } else {
      listItem.classList.remove('false');
      listItem.classList.add('true');
    }
  });
}


// Event Listeners
checkUI.addEventListener('click', checkOrder);