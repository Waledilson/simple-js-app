let pokemonRepository=function(){let f=[];function a(a){f.push(a)}function b(){return f}function g(b){let a=document.querySelector(".loader");b?a.classList.add("hidden"):a.classList.remove("hidden")}function c(a){return g(!1),fetch(a.detailsUrl).then(function(a){return g(!0),a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height}).catch(function(a){g(!0),console.error(a)})}function d(a){c(a).then(function(){e(a)})}function e(a){console.log(a);let b=$(".modal-body"),c=$(".modal-title");c.empty(),b.empty();let e=$("<h1>"+a.name+"</h1>"),d=$('<img class="modal-image" style="width: 50%" alt="picture of selected pokemon">');d.attr("src",a.imageUrl);let f=$("<p>height: "+a.height+"</p>");c.append(e),b.append(d),b.append(f)}return{getAll:b,add:a,loadList:function(){return g(!1),fetch("https://pokeapi.co/api/v2/pokemon/?limit=50").then(function(a){return a.json()}).then(function(b){g(!0),b.results.forEach(function(b){a({name:b.name,detailsUrl:b.url})})}).catch(function(a){g(!0),console.error(a)})},loadDetails:c,showDetails:d,showModal:e,addListItem:function(c){let e=document.querySelector(".pokemon-list"),b=document.createElement("li"),a=document.createElement("button");a.innerText=c.name,a.addEventListener("click",function(a){d(c),a.target.blur()}),a.classList.add("button-class","btn","bg-dark"),a.classList.add("btn-block"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target",".modal"),b.classList.add("group-list-item","bg-dark"),b.classList.add("col"),b.appendChild(a),e.appendChild(b)}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})