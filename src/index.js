let nameInput = document.querySelector("#search-cocktail-name");
let cocktailName = document.querySelector("#cocktail-name");
let cocktailCategory = document.querySelector("#cocktail-category");
let cocktailInstructions = document.querySelector("#cocktail-instructions");
cocktailAlcoholic = document.querySelector("#cocktail-alcoholic");
let cocktailNameButton = document.querySelector(".search-form");
let cocktailIngredient = document.querySelector("#cocktail-ingredient");
let cocktailInfo = document.querySelector(".cocktail-info");

cocktailNameButton.addEventListener("submit", (event) => {
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
        let cocktailImage = document.createElement("img");
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


// button selector

let button = document.getElementById("submit")
let container = document.querySelector(".container")
let cocktail = document.createElement("div")
cocktail.setAttribute("id", "cocktail")
container.appendChild(cocktail)

// event listener for button, get the user input
button.addEventListener("click", (event) => {
    event.preventDefault();
    
    let ingredients = document.getElementById("ingredients").value
    // console.log(ingredients)
    cocktail.innerHTML = ""
    return findCocktail(ingredients)
})


// get cocktail based on single ingredient
function findCocktail(ingredient) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient)
    .then(res => res.json())
    // pull a random drink containing the ingredient entered
    .then((data) => {
        let length = data.drinks.length
        let random = Math.floor(Math.random() * length)
        console.log(random)
        getCocktail(data.drinks[random].idDrink)
    })
    
    .catch(() => console.log("No cocktails include that ingredient"))

}

function getCocktail(data){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+data)
        .then((res) => res.json())
        .then((data) => displayRecipe(data))
}

function displayRecipe(data) {
    let drink = data.drinks[0]

    let name = drink.strDrink
    let img = drink.strDrinkThumb
    let instructions = drink.strInstructions
    let ingredients = []
    let measures = []

    // push ingredients (and their measurements) to arrays
    for (let i = 1; i <= 15; i++) {
        if (drink[`strIngredient${i}`]){
            ingredients.push(drink[`strIngredient${i}`])
        }
        if (drink[`strMeasure${i}`]){
            measures.push(drink[`strMeasure${i}`])
        }
    }

    // Create cocktail title and add to DOM
    let title = document.createElement("h2")
    title.setAttribute("id", "name")
    title.innerText = name
    cocktail.appendChild(title)

    // Create picture element and add to DOM
    let picture = document.createElement("img")
    picture.setAttribute("src", img)
    picture.setAttribute("style", "height: 200px; width: 200px")
    cocktail.appendChild(picture)
    
    // Create ul
    let list = document.createElement("ul")
    list.setAttribute("id", "ingredients")
    list.innerHTML = `<span style="font-weight: bold;">Ingredients:</span><br>`

    // create li for each measurement-ingredient pair
    var str = ""
    for (i = 0; i< ingredients.length; i++) {
        str += `<li>${measures[i]} ${ingredients[i]}</li>`
    }

    // add list items as innerHTML of the ul and add to DOM
    list.innerHTML = str
    cocktail.appendChild(list)
    
    // Add directions to a p element and add to DOM
    let directions = document.createElement("p")
    directions.setAttribute("id", "instructions")
    directions.innerHTML = `<span style="font-weight: bold;">Directions</span><br>${instructions}`
    cocktail.appendChild(directions)

}
