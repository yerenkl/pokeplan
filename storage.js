// Base URL for PokeAPI

let flag=0;


function loadStorage(){
  if(flag==0){
    displayPokemon();
    flag=1;
  }
}
  const basee = 'https://pokeapi.co/api/v2/';
  const spritesContainer = document.getElementById('spritesContainer');
  let myArray = JSON.parse(localStorage.getItem('pokeArray'));
  const pokemodal = document.getElementById('pokeModal');

  // Function to fetch and display the Pokemon sprites
  function displayPokemon() {
    console.log(myArray)
    for (let i = 0; i < myArray.length; i++) {
      pokemonNumber=myArray[i]["number"]
      is_shiny=myArray[i]["is_shiny"]
      console.log(pokemonNumber)
      console.log(is_shiny)
      fetchAndDisplaySprites(pokemonNumber,is_shiny);
    }
  }

  // Call the function to fetch and display the Pokemon sprites
  function fetchAndDisplaySprites(id,shiny){
    const sprite_url = 'https://pokeapi.co/api/v2/pokemon/'+id;
    console.log(sprite_url)
    try {
      fetch(sprite_url)
        .then(response => {
          const responseJson = response.json();
          return responseJson;
        })
        .then(data => {
          let sprite
          if(shiny==1) {
            sprite = data.sprites.front_shiny;
          }
          else{
            sprite = data.sprites.front_default;
          }
          let name = data.name;
          const img = document.createElement('img');
          img.src = sprite;
          img.title = name; // Set the title attribute to the Pokemon's name
          img.addEventListener('click', function() {
            const id = this.title;
            const sprite_url = 'https://pokeapi.co/api/v2/pokemon/'+id;
            try {
              fetch(sprite_url)
                .then(response => {
                  const responseJson = response.json();
                  return responseJson;
                })
                .then(data => {
                  let official_art
                  if(shiny==1) {
                    official_art=data.sprites.other['official-artwork'].front_shiny
                  }
                  else{
                    official_art=data.sprites.other['official-artwork'].front_default
                  }
                  document.getElementById("off_art").src=official_art
                  pokemodal.style.display = "block";
                })
            } catch (error) {
              console.error(error);
            }
          });
          spritesContainer.appendChild(img);
        })
    } catch (error) {
      console.error(error);
    }
  }

  function poke_close() {
    pokemodal.style.display = "none";
  }