const progressUI = document.getElementById('progress');
const prevUI = document.getElementById('prev');
const nextUI = document.getElementById('next');
const circlesUI = document.querySelectorAll('.circle');

let currentActive = 1;

nextUI.addEventListener('click', () => {
    currentActive++;

    if (currentActive > circlesUI.length) {
        currentActive = circlesUI.length;
    }
    
    updateDOM();
})

prevUI.addEventListener('click', () => {
    currentActive--;

    if (currentActive < 1) {
        currentActive = 1;
    }

    updateDOM();
})

function updateDOM() {
    circlesUI.forEach((circle, index) => {
        if (index < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    })

    const activesUI = document.querySelectorAll('.active');

    progressUI.style.width = (activesUI.length - 1) / (circlesUI.length - 1) * 100 + '%';

    if (currentActive === 1) {
        prevUI.disabled = true;
    } else if(currentActive === circlesUI.length) {
        nextUI.disabled = true;
    } else {
        prevUI.disabled = false;
        nextUI.disabled = false;
    }
}