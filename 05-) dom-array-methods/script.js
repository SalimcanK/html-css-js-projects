const UImain = document.getElementById('main');
const UIaddUserBtn = document.getElementById('add-user');
const UIdoubleBtn = document.getElementById('double');
const UIshowMillionairesBtn = document.getElementById('show-millionaires');
const UIsortBtn = document.getElementById('sort');
const UIcalculateWealthBtn = document.getElementById('calculate-wealth');



let data = [];



// Fetch random user and create random money value for user
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Add new object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {   // if nothing is passed to function, use data
   // Clear main div
   main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

   providedData.forEach(item => {
     const element = document.createElement('div');
     element.classList.add('person');
     element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
     main.appendChild(element);
   });
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double money for each user
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });

    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Show only millionaires
function showMillionaires() {
    const tempData = data.filter(user => user.money > 1000000);

    updateDOM(tempData);
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    updateDOM();  // clicking calculate wealth button won't produce more than one line if we use updateDOM here. blocks duplicate lines.
    main.appendChild(wealthElement);
}



// Event listeners //
UIaddUserBtn.addEventListener('click', getRandomUser);
UIdoubleBtn.addEventListener('click', doubleMoney);
UIsortBtn.addEventListener('click', sortByRichest);
UIshowMillionairesBtn.addEventListener('click', showMillionaires);
UIcalculateWealthBtn.addEventListener('click', calculateWealth);