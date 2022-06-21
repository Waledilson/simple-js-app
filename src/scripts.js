let pokemonRepository = (function() {
  //pokemon list
  let pokemonList = [];
  //let modalContainer = document.querySelector('#modal-container');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

  //adds pokemon to existing pokemon array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }


  //creates pokemon list in individual buttons
  function addListItem(pokemon) {
    let listPokemon = document.querySelector('.pokemon-list');
    let listCharacter = document.createElement('li');
    let buttonItem = document.createElement('button');
    buttonItem.innerText = pokemon.name;
    buttonItem.addEventListener('click', function(event) {
      showDetails(pokemon);
      event.target.blur();
    });

    //add classes and attributes to list buttons
    buttonItem.classList.add('button-class', 'btn', 'bg-dark');
    buttonItem.classList.add('btn-block');
    buttonItem.setAttribute('data-toggle', 'modal');
    buttonItem.setAttribute('data-target', '.modal')
    listCharacter.classList.add('group-list-item', 'bg-dark');
    listCharacter.classList.add('col');
    listCharacter.appendChild(buttonItem);
    listPokemon.appendChild(listCharacter);
  }

  //shows message "pokemon are on the way" when loading & hides when loaded
  function showLoadMessage(hide) {
    let loader = document.querySelector('.loader');
    if (hide) {
      loader.classList.add('hidden');
    }
    else {
      loader.classList.remove('hidden');
    }
  }
  //function to load list of pokemon from 'pokeapi'
  function loadList() {
    showLoadMessage(false);
    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(json) {
      showLoadMessage(true);
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    })
    .catch(function (e) {
      showLoadMessage(true);
      console.error(e);
    });
  }

  //function to load pokemon name, height, type from pokeapi
  function loadDetails(pokemon) {
    showLoadMessage(false);
    let url = pokemon.detailsUrl;
    return fetch(url)
    .then(function (response) {
      showLoadMessage(true);
      return response.json();
    })
    .then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
    })
    .catch(function (e) {
      showLoadMessage(true);
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      //console.log(pokemon);
    });
  }

  //modal function
  function showModal(pokemon) {
    console.log(pokemon);
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    //empty any existing info in modal
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $('<img class="modal-image" style="width: 50%" alt="picture of selected pokemon">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
  }

  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    addListItem: addListItem,

  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
