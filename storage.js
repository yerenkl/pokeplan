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

  // Function to fetch and display the Pokemon sprites
  function displayPokemon() {
    console.log(myArray)
    for (const id of myArray) {
      fetchAndDisplaySprites(id);
    }
  }

  // Call the function to fetch and display the Pokemon sprites
  function fetchAndDisplaySprites(id){
    const sprite_url = 'https://pokeapi.co/api/v2/pokemon/'+id;
    console.log(sprite_url)
    try {
      fetch(sprite_url)
        .then(response => {
          const responseJson = response.json();
          return responseJson;
        })
        .then(data => {
          let sprite = data.sprites.front_default;
          let name = data.name;
          const img = document.createElement('img');
          img.src = sprite;
          img.title = name; // Set the title attribute to the Pokemon's name
          
          spritesContainer.appendChild(img);
        })
    } catch (error) {
      console.error(error);
    }
  }

  
