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
      .catch(() => console.log('Something went wrong, Please try again🙂'));
  }
}
links.forEach((link) => {
  link.addEventListener('click', () => {
    card.innerHTML = '';
    listOfDrink(link.textContent);
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
