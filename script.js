let allPokemon = [];
let filteredPokemon = [];
let loadPokemonFrom = 0;
let loadPokemonUntil = 20;
const colors = {
  'fire':'orange',
  'grass':'lightgreen',
  'electric':'yellow',
  'water':'#70ffea',
  'ground':'darkgrey',
  'rock':'grey',
  'fairy':'pink',
  'poison':'greenyellow',
  'bug':'#94ecbe',
  'dragon':'orange',
  'psychic':'#7c7db6', 
  'flying':'#fcca46',
  'fighting':'darkgrey',
  'normal':'#a8a77a',
  'ice':'#00f2f2',
  'dark': '#4f7ecf',
  'ghost': '#7685a7',
  'steel': 'steelblue',
}

async function init() {
  await getPokemon();
}

async function getPokemon() {
    for (let i = loadPokemonFrom; i < loadPokemonUntil; i++) {
      const id = i +1;
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let respAsText = await response.json();
    allPokemon.push(respAsText);
    renderPokemon(i);
  }
}

async function renderPokemon(i) {
    let pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i +1}.png`;
    let pokemonContainer = document.getElementById('pokemon');
    let pokemon = allPokemon[i];
    let pokemonType = pokemon['types'];
    let pokemonName = pokemon['name'].toUpperCase().slice();
    pokemonSmallCard(i, pokemon, pokemonImage, pokemonName, pokemonContainer);
    pokemonTypeSmallCard(pokemonType, i);
}

function pokemonSmallCard(i, pokemon, pokemonImage, pokemonName, pokemonContainer){
    pokemonContainer.innerHTML += smallCardTemplate(i, pokemon, pokemonImage, pokemonName);
}

function pokemonTypeSmallCard(pokemonType, i) {
    let pokemonTypeContainer = document.getElementById(`pokemonType${i}`);
    for (let j = 0; j < pokemonType.length; j++) {
      const type = pokemonType[j]["type"]["name"];
      pokemonTypeContainer.innerHTML += `
        <p id="typeColor${i}${j}">${type}</p>
      `;
      let typeColor = document.getElementById(`typeColor${i}${j}`);
      typeColor.style.backgroundColor = colors[type];
      document.getElementById(`pokemonCard${i}`).style.border=`2px solid ${colors[type]}`
    }
}

function openBigCard(i) {
  let pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i +1}.png`;
  let pokemon = allPokemon[i];
  let pokemonType = pokemon['types'];
  let pokemonName = pokemon['name'].toUpperCase().slice();
  getElementBigCard(pokemon, pokemonImage, pokemonName, i);
  pokemonTypeBigCard(pokemonType, i);
}

function getElementBigCard(pokemon, pokemonImage, pokemonName, i) {
  document.getElementById('openCardBackground').style.display='block';
  document.getElementById('button').style.display='none';
  document.getElementById('header').style.display='none';
  document.getElementById('pokemon').style.display='none';
  document.getElementById('pokedex').innerHTML = bigCardTemplate(pokemon, pokemonImage, pokemonName, i);
}

function pokemonTypeBigCard(pokemonType, i){
  let pokemonTypeContainer = document.getElementById(`pokemonTypeBig${i}`);
  for (let j = 0; j < pokemonType.length; j++) {
    const type = pokemonType[j]["type"]["name"];
    pokemonTypeContainer.innerHTML += `
      <p class="type_size_big" id="typeBigColor${i}${j}"><b>${type}</b></p>
    `;
    let typeColor = document.getElementById(`typeBigColor${i}${j}`);
    typeColor.style.backgroundColor = colors[type];
  }
  document.getElementById('statPokemon').innerHTML = `
  <div>
  <canvas id="myChart"></canvas>
  </div>
  `;
  renderChart(i);
}

function closeBigCard() {
  document.getElementById('openCardBackground').style.display='none';
  document.getElementById('button').style='';
  document.getElementById('header').style='';
  document.getElementById('pokemon').style='';
}

function arrowBack(i) {
  let index = i-1;
  if(i===0) {
    index = loadPokemonUntil -1;
  }
  openBigCard(index);
}

function arrowForward(i) {
  let index = i+1;
  if(i===loadPokemonUntil -1) {
    index = 0;
  }
  openBigCard(index);
}

function searchPokemon() {
  let searchPokemons = document.getElementById('searchPokemons');
  let pokemonContainer = document.getElementById('pokemon');
  pokemonContainer.innerHTML = '';
  if (searchPokemons.value.length > 2) {
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemonName = allPokemon[i]["name"];
      if (pokemonName.toLowerCase().startsWith(searchPokemons.value.toLowerCase())) {
        renderPokemon(i);
      }
    }
  } else {
    for (let i = 0; i < allPokemon.length; i++) {
      renderPokemon(i);
    }
  }
}

async function pokeButton() {
    loadPokemonUntil =  loadPokemonUntil + 20;
    loadPokemonFrom =  loadPokemonFrom + 20;
    await getPokemon();
}
