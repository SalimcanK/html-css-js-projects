const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
  load = load + 1.8;

  if (load > 99) {
    clearInterval(int);
  }

  
  loadText.innerText = `${load.toFixed(0)}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0); // Our load value goes to 0-100 but opacity value can be between 0-1 so we have to scale it
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
