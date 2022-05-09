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
pokemonList.forEach(function(item) {
  document.write('<p>' + 'Name: ' + ' ' + item.name + ' ' + 'Height: ' + item.height + '</p>')
});
