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
  for (let i = 0; i < pokemonList.length; i++)
    if (pokemonList[i].height < 3)
    {
      document.write(pokemonList[i].name + ' ' +  pokemonList[i].height + '<br>');
  }
else {
      document.write(pokemonList[i].name + ' ' + pokemonList[i].height + ' This is a big pokemon!' + '<br>');
     }
