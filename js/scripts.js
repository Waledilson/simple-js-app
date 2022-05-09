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

return {
  add: function(item) {
    pokemonList.push(item);
  },
  getAll: function() {
    return pokemonList;
  }
};
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Parasect', height: 3.03, type: 'Mushroom' });
console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function(item) {
  if (item.height > 3) {
    document.write('<p>' + 'Name: ' + item.name + ' ' + 'Height: ' + item.height + ' ' + 'Thats a big pokemon!!' + '</p>');
  }
    else {
      document.write('<p>' + 'Name: ' + item.name + ' ' + 'Height: ' + item.height + '</p>');
    }});
