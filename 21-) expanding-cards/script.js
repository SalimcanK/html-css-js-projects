const panelsUI = document.querySelectorAll('.panel');

panelsUI.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
})

function removeActiveClasses() {
    panelsUI.forEach(panel => {
        panel.classList.remove('active');
    })
}