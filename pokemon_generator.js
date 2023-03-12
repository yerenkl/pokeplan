
let iterativeFunction = function (arr, x) {
    let start=0, end=arr.length-1;
    while (start<=end){
        let mid=Math.floor((start + end)/2);

        if (arr[mid]===x) return true;
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
     }
    return false;
    }

    random_number=String(Math.floor(Math.random() * 905));
    shiny_chance=Math.floor(Math.random() * 200);
    k=0;
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species/'+random_number;
    legendary_array=[143,144,145,149,150,242,243,244,248,249,250,376,377,378,379,
    380,381,382,383,384,385,479,480,481,482,483,484,485,486,487,488,489,490,
    491,492,493,637,638,639,640,641,642,643,644,645,646,647,648,715,716,717,
    718,719,720,784,785,786,787,788,789,790,791,806,887,888,889,890,891,892,893,894,895,896,897,904]

    while(iterativeFunction(legendary_array,parseInt(random_number)) && k<10){
      random_number=String(Math.floor(Math.random() * 905));
      k++;
    }

try {
  fetch(baseUrl)
    .then(response => {
      const responseJson = response.json();
      return responseJson;
    })
    .then(data => {
      const pokemons = data.flavor_text_entries;
      for (const element of pokemons) {
        if (element.language.name === 'en') {
          pokemon_text = element.flavor_text;
          break;
        }
      }
      const sprite_url = data.varieties[0].pokemon.url;
      let html = pokemon_text.replace(/\f/g, "\n")
                      .replace(/\u00ad\n/g, "")
                      .replace(/\u00ad/g, "")
                      .replace(/ -\n/g, " - ")
                      .replace(/-\n/g, "-")
                      .replace(/\n/g, " ");
      for (const element of data.names) {
        if (element.language.name === 'en') {
          pokemon_name=element.name;
          break;
        }
    } 
      document.getElementById('pokemon_name').innerHTML =pokemon_name +": ";
      console.log(pokemon_text)
      document.getElementById('pokemon_description').innerHTML =html;
      fetch(sprite_url)
        .then(response => {
          const responseJson = response.json();
          return responseJson;
        })
        .then(data => {
          let sprite
          if (shiny_chance<=1){
            sprite=data.sprites.front_shiny;
          }
          else{
            sprite = data.sprites.front_default;
          }
          document.getElementById('ae').src = sprite;
          document.getElementById('ae').style.filter="brightness(0)"
          
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
