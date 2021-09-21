let nameInput = document.querySelector("#search-cocktail-name");
let cocktailName = document.querySelector("#cocktail-name");
let cocktailCategory = document.querySelector("#cocktail-category");
let cocktailInstructions = document.querySelector("#cocktail-instructions");
let cocktailAlcoholic = document.querySelector("#cocktail-alcoholic");
let cocktailNameButton = document.querySelector(".search-form");
let cocktailIngredient = document.querySelector("#cocktail-ingredient");
let cocktailInfo = document.querySelector(".cocktail-img");
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
        cocktailImage.setAttribute(
          "class",
          "img-fluid rounded mx-auto d-block"
        );
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
