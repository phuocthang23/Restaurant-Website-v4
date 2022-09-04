const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'f42108dd';
const APP_KEY = 'f782bdd63fac2c8c2737f260bd5afe05';


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
     searchQuery = e.target.querySelector('input').value;
     fetchAPI();
   })

async function fetchAPI(){
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
  // console.log(response);
}

function generateHTML(results){
  container.classList.remove('initial');
  let generateHTML = '';
  results.map(results => {
    generateHTML += 
    `
    <div class="item">
    <img src="${results.recipe.image}" alt="">
    <div class="flex-container">
      <h1 class="title">${results.recipe.label}</h1>
      <a class="view-btn" href="${results.recipe.url}"target = "_blank">View Recipe</a>
    </div>
    <p class="item-data">Calories:${results.recipe.calories.toFixed(1)}</p>
    <p class="item-data">Diet label: ${results.recipe.dietLabels.lenght> 0 ? results.recipe.dietLabels: 'No Data Found'}</p>
    <p class="item-data">Health Label: ${results.recipe.healthLabels.slice(0,4) }</p>
  </div>
    `
  })
  searchResultDiv.innerHTML = generateHTML;
}