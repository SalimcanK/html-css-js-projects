const UIsearch = document.getElementById('search'),
  UIsubmit = document.getElementById('submit'),
  UIrandom = document.getElementById('random'),
  UImeals = document.getElementById('meals'),
  UIresultHeading = document.getElementById('result-heading'),
  UIsingleMeal = document.getElementById('single-meal');



// Search for a meal - fetch - show on the page
function searchMeal(e) {
  e.preventDefault();

  // Clear meal
  UIsingleMeal.innerHTML = '';

  // Get search term
  const term = UIsearch.value;

  // Check if empty, if not, show on the page
  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        UIresultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        
        //console.log(data);
        
        if(data.meals === null) {
          UIresultHeading.innerHTML = `<p>There are no search results for '${term}'</p>`;
        } else {
          UImeals.innerHTML = data.meals.map(meal => 
            `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`).join('');
        }
      })

      //Clear search text
      UIsearch.value = '';
  } else {
    alert('Please enter a search term');
  }
}


// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data);

      const meal = data.meals[0];

      addMealToDOM(meal);
    })
}

// Fetch random meal
function getRandomMeal() {
  // Clear meals and heading
  UImeals.innerHTML = '';
  UIresultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    })
}


// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  UIsingleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>  
    </div>
    `
}




// Event Listeners //
UIsubmit.addEventListener('submit', searchMeal);
UIrandom.addEventListener('click', getRandomMeal);

UImeals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    //console.log(item);

    if(item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  })

  if(mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    //console.log(mealID);

    getMealById(mealID);
  }
})