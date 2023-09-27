const searchUI = document.querySelector('.search');
const inputUI = document.querySelector('.input');
const btnUI = document.querySelector('.btn');

btnUI.addEventListener('click', () => {
    searchUI.classList.toggle('active');
    inputUI.focus();
})