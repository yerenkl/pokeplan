// Base URL for PokeAPI

var flag=0;
var len;
const spritesContainer = document.getElementById('spritesContainer');
const pokemodal = document.getElementById('pokeModal');

function sortArrayByNumber(array) {
  array.sort(function(a, b) {
    return parseInt(a.number) - parseInt(b.number);
  });
  return array;
}

try{
  len=myArray.length;
}
catch{
  len=0;
}
const lenn=len;
console.log(lenn)
  
  // Function to fetch and display the Pokemon sprites
  function displayPokemon() {
    try
    {while (spritesContainer.firstChild) {
      spritesContainer.removeChild(spritesContainer.lastChild);
    }}
    catch{}
    let myArray = JSON.parse(localStorage.getItem('pokeArray'));
    myArray=sortArrayByNumber(myArray)
    console.log(myArray)
    for (let i = 0; i < myArray.length; i++) {
      pokemonNumber=myArray[i]["number"]
      is_shiny=myArray[i]["is_shiny"]
      date=myArray[i]["today"]
      console.log(pokemonNumber)
      console.log(is_shiny)
      fetchAndDisplaySprites(pokemonNumber,is_shiny,date);
    }
  }

  // Call the function to fetch and display the Pokemon sprites
  function fetchAndDisplaySprites(id,shiny,today){
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
          pokemodal.addEventListener('click', function(event){
            if (event.target == pokemodal) {
              poke_close();
            }
          });
          img.addEventListener('click', function() {
            const id = this.title;
            const sprite_url = 'https://pokeapi.co/api/v2/pokemon/'+id;
            const text_url = 'https://pokeapi.co/api/v2/pokemon-species/'+id;
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
                    document.getElementById("star").innerHTML="&#11088";
                  }
                  else{
                    official_art=data.sprites.other['official-artwork'].front_default
                  }
                  document.getElementById("off_art").src=official_art
                  document.getElementById("poke_name").innerText=data.name
                  document.getElementById("date_info").innerText="Caught on "+today 
                  try {
                    fetch(text_url)
                      .then(response => {
                        const responseJson = response.json();
                        return responseJson;
                      })
                      .then(info => {
                        const pokemons = info.flavor_text_entries;
                        for (const element of pokemons) {
                          if (element.language.name === 'en') {
                            pokemon_text = element.flavor_text;
                            break;
                          }
                        }
                        let html = pokemon_text.replace(/\f/g, "\n")
                                        .replace(/\u00ad\n/g, "")
                                        .replace(/\u00ad/g, "")
                                        .replace(/ -\n/g, " - ")
                                        .replace(/-\n/g, "-")
                                        .replace(/\n/g, " ");
                        document.getElementById("poke_info").innerText=html
                                        })
                  } catch (error) {
                    console.error(error);
                  }
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