let pokemonRepository = (function() {
  //pokemon list
  let pokemonList = [];
  let modalContainer = document.querySelector('#modal-container');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

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
    let listCharacter = document.createElement("li");
    let buttonItem = document.createElement("button");
    buttonItem.innerText = pokemon.name;
    buttonItem.classList.add("button-class");
    listCharacter.appendChild(buttonItem);
    listPokemon.appendChild(listCharacter);

    addListener(buttonItem, pokemon);
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
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      showLoadMessage(true);
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      showLoadMessage(true);
      console.error(e);
    });
  }

  //function to load pokemon name, height, type from pokeapi
  function loadDetails(item) {
    showLoadMessage(false);
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      showLoadMessage(true);
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.type = details.types;
    }).catch(function (e) {
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
  function addListener(button, pokemon) {
    button.addEventListener('click', (event) => showDetails(pokemon));
  }

//modal function

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = ("Pokemon Height: " + pokemon.height);


    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add('pokemon-image');


    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }


  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  //exit modal when press 'escape' key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }});
    //exit modal when click outside of the modal box
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if(target === modalContainer) {
        hideModal();
      }
    });
    return {
      getAll: getAll,
      add: add,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      addListItem: addListItem
    };
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
