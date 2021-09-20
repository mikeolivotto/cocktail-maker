// fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
// .then(res => res.json())
// .then((data) => console.log(data.drinks[0].strDrink))


// button selector
let button = document.getElementById("submit")
let cocktail = document.getElementById("cocktail")


// event listener for button, get the user input
button.addEventListener("click", (event) => {
    event.preventDefault();
    let ingredients = document.getElementById("ingredients").value
    // console.log(ingredients)
    return getCocktail(ingredients)
})


// get cocktail based on single ingredient
function getCocktail(ingredient) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient)
    .then(res => res.json())
    .then((data) => displayCocktail(data.drinks[0].idDrink))
    .catch(() => console.log("No cocktails include that ingredient"))

}

function displayCocktail(data){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+data)
        .then((res) => res.json())
        .then((data) => getRecipe(data))
}

function getRecipe(data) {
    // console.log(data.drinks[0].strDrink)
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

    var str = ""

    for (i = 0; i< ingredients.length; i++) {
        str += `<li>${measures[i]} ${ingredients[i]}</li>`
    }
    console.log(str)
    list.innerHTML = str
    cocktail.appendChild(list)
    

    let directions = document.createElement("p")
    directions.setAttribute("id", "instructions")
    directions.innerText = instructions
    cocktail.appendChild(directions)

}