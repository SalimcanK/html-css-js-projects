const UIbalance = document.getElementById('balance');
const UImoney_plus = document.getElementById('money-plus');
const UImoney_minus = document.getElementById('money-minus');
const UIlist = document.getElementById('list');
const UIform = document.getElementById('form');
const UItext = document.getElementById('text');
const UIamount = document.getElementById('amount');


// const dummyTransactions = [
//    { id: 1, text: 'Flower', amount: -20 },
//    { id: 2, text: 'Salary', amount: 300 },
//    { id: 3, text: 'Book', amount: -10 },
//    { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];




// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if(UItext.value.trim() === '' || UIamount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: UItext.value,
            amount: +UIamount.value
        }

        transactions.push(transaction);
        
        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        UItext.value = '';
        UIamount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 10000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})")>x</button>
      `;
    
    UIlist.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2);
    UIbalance.innerText = `$${total}`;
    UIbalance.classList.add(total < 0 ? 'minus' : 'plus');

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc + item), 0).toFixed(2);
    UImoney_plus.innerText = `$${income}`;

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc + item), 0) * -1).toFixed(2);
    UImoney_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();




// Event Listeners //
UIform.addEventListener('submit', addTransaction);