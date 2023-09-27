const openUI = document.getElementById('open')
const closeUI = document.getElementById('close')
const containerUI = document.querySelector('.container')

openUI.addEventListener('click', () => containerUI.classList.add('show-nav'));

closeUI.addEventListener('click', () => containerUI.classList.remove('show-nav'));