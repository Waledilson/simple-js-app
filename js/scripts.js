let pokemonRepository = (function() {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//adds pokemon to existing pokemon array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
//function to display pokemon name in console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
  console.log(pokemon);
});
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
  //function to load list of pokemon from 'pokeapi'
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
//function to load pokemon name, height, type from pokeapi
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.type = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };

})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
