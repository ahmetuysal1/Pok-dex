function bigCardTemplate(pokemon, pokemonImage, pokemonName, i) {
    return`
    <span class="number_big_card">#${pokemon['id'].toString().padStart(4, '0')}</span>
  <img onclick="closeBigCard()" class="icon_close" src="./img/close_white.png" alt="close">
  <img onclick="arrowBack(${i})" class="icon_arrow_back" src="./img/arrow_back_white.png" alt="arrow_back">
  <img class="img_big_container" src="${pokemonImage}" alt="${pokemonName}">
  <img onclick="arrowForward(${i})" class="icon_arrow_forward" src="./img/arrow_forward_white.png" alt="arrow_forward">
  <h3 class="font_size_big_card">${pokemonName}</h3>
  <div class="type_big_card">
  <h4 class="h4_big_card" id="pokemonType${i}">Type:</h4>
  <div class="center_type" id="pokemonTypeBig${i}"></div>
  </div>
    `;
}

function smallCardTemplate(i, pokemon, pokemonImage, pokemonName) {
    return`
    <div id="pokemonCard${i}" onclick="openBigCard(${i})" class="poke_card">
    <span class="number">#${pokemon['id'].toString().padStart(4, '0')}</span>
    <img class="img_container" src="${pokemonImage}" alt="${pokemonName}">
    <div class="pokemon_info">
      <h3>${pokemonName}</h3>
      <div class="info">
        <div>Weight<h4 class="weight">${pokemon['weight']/10} kg</4></div>
        <div>Height<h4 class="height">${pokemon['height']/10} m</h4></div>
      </div>  
        <h4 id="pokemonType${i}">Type:</h4>
    </div>
    `;
}

