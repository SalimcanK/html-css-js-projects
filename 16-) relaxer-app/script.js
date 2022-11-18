const UIcontainer = document.getElementById('container');
const UItext = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breatheAnimation();

function breatheAnimation() {
    
    UItext.innerText = 'Breathe In!';
    UIcontainer.className = 'container grow';
    
    setTimeout(() => {
        
        UItext.innerText = 'Hold';

        setTimeout(() => {
            
            UItext.innerText = 'Breathe Out!';
            UIcontainer.className = 'container shrink';
        
        }, holdTime);

    }, breatheTime);
}

setInterval(breatheAnimation, totalTime);