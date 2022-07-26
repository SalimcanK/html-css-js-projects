const UIcurrency1 = document.getElementById('currency-one');
const UIcurrency2 = document.getElementById('currency-two');
const UIamount1 = document.getElementById('amount-one');
const UIamount2 = document.getElementById('amount-two');

const UIrate = document.getElementById('rate');
const UIswapbtn = document.getElementById('swap');



// Fetch exchange rates and update the DOM
function calculate() {
    const currency1 = UIcurrency1.value;
    const currency2 = UIcurrency2.value;

    fetch(`https://v6.exchangerate-api.com/v6/d7e5214b03ec26b5c28b9f02/latest/${currency1}`)
       .then(res => res.json())
       .then(data => {
        const rate = data.conversion_rates[currency2];
         
        UIrate.innerText = `1 ${currency1} = ${rate} ${currency2}`;
        UIamount2.value = (UIamount1.value * rate).toFixed(2);
    })
}


// Event listeners //
UIcurrency1.addEventListener('change', calculate);
UIcurrency2.addEventListener('change', calculate);
UIamount1.addEventListener('input', calculate);
UIamount2.addEventListener('input', calculate);

UIswapbtn.addEventListener('click', () => {
  [UIcurrency1.value, UIcurrency2.value] = [UIcurrency2.value, UIcurrency1.value];
  calculate();
})


calculate();