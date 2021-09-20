
fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((res) => res.json())
  .then((data) => console.log(data.drinks[0].strDrink));

// button selector
let button = document.getElementById('submit');
let cocktail = document.getElementById('cocktail');

// event listener for button, get the user input
button.addEventListener('click', (event) => {
  cocktail.innerHTML = '';
  event.preventDefault();
  let ingredients = document.getElementById('ingredients').value;
  // console.log(ingredients)
  cocktail.classList.add('cocktial-info');
  return getCocktail(ingredients);
let nameInput = document.querySelector("#search-cocktail-name");
let cocktailName = document.querySelector("#cocktail-name");
let cocktailCategory = document.querySelector("#cocktail-category");
let cocktailInstructions = document.querySelector("#cocktail-instructions");
let cocktailAlcoholic = document.querySelector("#cocktail-alcoholic");
let cocktailNameButton = document.querySelector(".search-form");
let cocktailIngredient = document.querySelector("#cocktail-ingredient");
let cocktailInfo = document.querySelector(".cocktail-info");
let cocktailImage = document.createElement("img");

cocktailNameButton.addEventListener("submit", (event) => {
  cocktailImage.removeAttribute("src");
  event.preventDefault();
  getCocktailName();
});

function getCocktailName() {
  const cocktailApi =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  // fecth data from api based cocktail
  fetch(cocktailApi + nameInput.value)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data.drinks[0]);
      let drinks = data.drinks[0];
      let imgSrc = drinks.strDrinkThumb;
      let ingredients = [];
      // push ingredients (and their measurements) to arrays
      for (let i = 1; i <= 15; i++) {
        if (drinks[`strIngredient${i}`]) {
          ingredients.push(drinks[`strIngredient${i}`]);
        }
      }
      // add date to html
      if (nameInput.value) {
        cocktailImage.setAttribute("src", imgSrc);
        cocktailImage.setAttribute("style", "height: 400px; width: 400px");
        cocktailInfo.appendChild(cocktailImage);
        cocktailName.innerHTML = drinks.strDrink;
        cocktailCategory.innerHTML = drinks.strCategory;
        cocktailInstructions.innerHTML = drinks.strInstructions;
        cocktailAlcoholic.innerHTML = `Alcohol content: ${drinks.strAlcoholic}`;
        cocktailIngredient.innerHTML = `Ingredients: ${ingredients.join(", ")}`;
      } else {
        nameInput.value === null;
        alert("Please enter a cocktail name");
      }
    });
}

// fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then((res) =>
//   res.json()
// );
// fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
// .then(res => res.json())

// .then((data) => console.log(data.drinks[0].strDrink))

// button selector

let button = document.getElementById("submit");
let cocktail = document.getElementById("cocktail");

// event listener for button, get the user input
button.addEventListener("click", (event) => {
  event.preventDefault();

  let ingredients = document.getElementById("ingredients").value;
  // console.log(ingredients)
  cocktail.innerHTML = "";
  return findCocktail(ingredients);

});

// get cocktail based on single ingredient
function getCocktail(ingredient) {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient)
    .then((res) => res.json())
    .then((data) => displayCocktail(data.drinks[0].idDrink))
    .catch(() => console.log('No cocktails include that ingredient'));
}

function displayCocktail(data) {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + data)
    .then((res) => res.json())
    .then((data) => getRecipe(data));
}

function getRecipe(data) {
  // console.log(data.drinks[0].strDrink)
  let drink = data.drinks[0];

  let name = drink.strDrink;
  let img = drink.strDrinkThumb;
  let instructions = drink.strInstructions;
  let ingredients = [];
  let measures = [];

  // push ingredients (and their measurements) to arrays
  for (let i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredients.push(drink[`strIngredient${i}`]);

    }
    if (drink[`strMeasure${i}`]) {
      measures.push(drink[`strMeasure${i}`]);
    }
  }

  // Create cocktail title and add to DOM
  let title = document.createElement('h2');
  title.setAttribute('id', 'name');
  title.innerText = name;
  cocktail.appendChild(title);

  // Create picture element and add to DOM
  let picture = document.createElement('img');
  picture.setAttribute('src', img);
  picture.setAttribute('style', 'height: 200px; width: 200px');
  cocktail.appendChild(picture);

  // Create ul
  let list = document.createElement('ul');
  list.setAttribute('id', 'ingredients');

  var str = '';

  for (i = 0; i < ingredients.length; i++) {
    str += `<li>${measures[i]} ${ingredients[i]}</li>`;
  }
  console.log(str);
  list.innerHTML = str;
  cocktail.appendChild(list);

  let directions = document.createElement('p');
  directions.setAttribute('id', 'instructions');
  directions.innerText = instructions;
  cocktail.appendChild(directions);
}

// Sam's code
// get all the element from html that we need to use as a DOM
const card = document.querySelector('#card');
const links = document.querySelectorAll('#link');
const error = document.querySelector('#error');
// fetch list of cocktail by the first letter
function listOfDrink(letter) {
  for (let i = 0; i <= 20; i++) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + letter)
      .then((response) => response.json())
      .then((data) => getListOfDink(data, i))
      .catch(
        () => (error.innerText = 'Something went wrong, Please try again🙂')
      );
  }
}

links.forEach((link) => {
  link.addEventListener('click', () => {
    card.innerHTML = '';
    switch (link.textContent) {
      case 'A':
        listOfDrink('a');
        break;
      case 'B':
        listOfDrink('b');
        break;
      case 'C':
        listOfDrink('c');
        break;
      case 'D':
        listOfDrink('d');
        break;
      default:
        break;
    }
  });
});
// get all the drink with the first letter
function getListOfDink(data, i) {
  let image = data.drinks[i].strDrinkThumb;
  let name = data.drinks[i].strDrink;
  let glass = data.drinks[i].strGlass;
  let instructions = data.drinks[i].strInstructions;
  card.innerHTML += `
    <div class="col-sm">
      <div class="card mt-4 card-custom" style="width: 18rem">
      <img class="card-img-top" src="${image}" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title" >${name}</h5>
          <p class="card-text">
            ${glass}
          </p>
          </div>
        <p class="text-custom">
        <span> Instuction:</span>
        </br>
          ${instructions}
        </p>
    </div>
  `;
    }
    if (drink[`strMeasure${i}`]) {
      measures.push(drink[`strMeasure${i}`]);
    }
  }

  // Create cocktail title and add to DOM
  let title = document.createElement("h2");
  title.setAttribute("id", "name");
  title.innerText = name;
  cocktail.appendChild(title);

  // Create picture element and add to DOM
  let picture = document.createElement("img");
  picture.setAttribute("src", img);
  picture.setAttribute("style", "height: 200px; width: 200px");
  cocktail.appendChild(picture);

  // Create ul
  let list = document.createElement("ul");
  list.setAttribute("id", "ingredients");

  var str = "";

  for (i = 0; i < ingredients.length; i++) {
    str += `<li>${measures[i]} ${ingredients[i]}</li>`;
  }
  console.log(str);
  list.innerHTML = str;
  cocktail.appendChild(list);

  let directions = document.createElement("p");
  directions.setAttribute("id", "instructions");
  directions.innerText = instructions;
  cocktail.appendChild(directions);

  function findCocktail(ingredient) {
    fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient
    )
      .then((res) => res.json())
      // pull a random drink containing the ingredient entered
      .then((data) => {
        let length = data.drinks.length;
        let random = Math.floor(Math.random() * length);
        console.log(random);
        getCocktail(data.drinks[random].idDrink);
      })

      .catch(() => console.log("No cocktails include that ingredient"));
  }

  function getCocktail(data) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + data)
      .then((res) => res.json())
      .then((data) => displayRecipe(data));
  }

  function displayRecipe(data) {
    let drink = data.drinks[0];

    let name = drink.strDrink;
    let img = drink.strDrinkThumb;
    let instructions = drink.strInstructions;
    let ingredients = [];
    let measures = [];

    // push ingredients (and their measurements) to arrays
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(drink[`strIngredient${i}`]);
      }
      if (drink[`strMeasure${i}`]) {
        measures.push(drink[`strMeasure${i}`]);
      }
    }

    // Create cocktail title and add to DOM
    let title = document.createElement("h2");
    title.setAttribute("id", "name");
    title.innerText = name;
    cocktail.appendChild(title);

    // Create picture element and add to DOM
    let picture = document.createElement("img");
    picture.setAttribute("src", img);
    picture.setAttribute("style", "height: 200px; width: 200px");
    cocktail.appendChild(picture);

    // Create ul
    let list = document.createElement("ul");
    list.setAttribute("id", "ingredients");
    list.innerHTML = `<span style="font-weight: bold;">Ingredients:</span><br>`;

    // create li for each measurement-ingredient pair
    var str = "";
    for (i = 0; i < ingredients.length; i++) {
      str += `<li>${measures[i]} ${ingredients[i]}</li>`;
    }

    // add list items as innerHTML of the ul and add to DOM
    list.innerHTML = str;
    cocktail.appendChild(list);

    // Add directions to a p element and add to DOM
    let directions = document.createElement("p");
    directions.setAttribute("id", "instructions");
    directions.innerHTML = `<span style="font-weight: bold;">Directions</span><br>${instructions}`;
    cocktail.appendChild(directions);
  }
}
