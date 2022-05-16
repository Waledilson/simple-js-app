let pokemonRepository = (function() {
let pokemonList = [
  {
    name: "Weedle",
    height: 1,
    type: ["bug","poison"]
  },
  {
    name: "Raticate",
    height: 2.04,
    type: ["mouse"]
  },
  {
    name: "Weepinbell",
    height: 3.03,
    type: ["grass", "poison"]
  },
  {
    name: "Jigglypuff",
    height: 1.08,
    type: ["fairy", "balloon"]
  }
];
//adds pokemon to existing pokemon array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
//function to display pokemon name in console
  function showDetails(pokemon) {
  console.log(pokemon.name);
}
//creates pokemon list in individual buttons
  function addListItem(pokemon){
    let listPokemon = document.querySelector('.pokemon-list');
    let listCharacter = document.createElement("li");
    let button  = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listCharacter.appendChild(button);
    listPokemon.appendChild(listCharacter);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
}
)();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Parasect', height: 3.03, type: 'Mushroom' });
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
