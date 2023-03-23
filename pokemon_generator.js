let yymmdd=function(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // add leading zero if needed
  const day = String(now.getDate()).padStart(2, '0'); // add leading zero if needed
  const today = `${year}${month}${day}`;
  return today
}



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


function daysBetweenTodayAndDate() {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let myArray = JSON.parse(localStorage.getItem('pokeArray'));
  let dateString=myArray[myArray.length-1]["today"]
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateArr = dateString.split("/");
  const day = parseInt(dateArr[0]);
  const month = parseInt(dateArr[1]) - 1; // JS months are 0-indexed (0 = January)
  const year = parseInt(dateArr[2]);
  const otherDate = new Date(year, month, day);
  const diffInMilliseconds = Math.abs(today - otherDate);
  return Math.round(diffInMilliseconds / oneDay);
}
    let shinyChance=4096;
    let random_number=String(Math.floor(Math.random() * 905));
    k=0;
    legendary_array=[143,144,145,149,150,242,243,244,248,249,250,376,377,378,379,
    380,381,382,383,384,385,479,480,481,482,483,484,485,486,487,488,489,490,
    491,492,493,637,638,639,640,641,642,643,644,645,646,647,648,715,716,717,
    718,719,720,784,785,786,787,788,789,790,791,806,887,888,889,890,891,892,893,894,895,896,897,904]

    while(iterativeFunction(legendary_array,parseInt(random_number)) && k<5){
      random_number=String(Math.floor(Math.random() * 905));
      k++;
    }  

    if(localStorage.getItem("first_time") == null){ //fresh clear
      localStorage.clear()
      localStorage.first_time=0;
    }

    if(localStorage.getItem("dailyStreak") == null){ //fresh clear
      localStorage.dailyStreak=0
    }

    console.log(localStorage.dailyStreak)
    if(localStorage.getItem("last_date") != null){
      if(localStorage.last_date==yymmdd()){ //same day
        random_number=localStorage.last_number
        localStorage.last_date=yymmdd()
      }
      else{ //new day
        let myArray = JSON.parse(localStorage.getItem('pokeArray'));
        if(daysBetweenTodayAndDate()==1){
          localStorage.dailyStreak++
          if(localStorage.daily_streak==5){
            shinyChance=2048
          }
          else if(localStorage.daily_streak==10){
            shinyChance=1024
          }
          else if(localStorage.daily_streak==15){
            shinyChance=512
          }
          else if(localStorage.daily_streak==20){
            shinyChance=256
          }
          else if(localStorage.daily_streak==25){
            shinyChance=128
          }
          else if(localStorage.daily_streak>=30){
            shinyChance=64
          }
          if(localStorage.daily_streak>=100){
            shinyChance=32
          }
        }
        else{
          localStorage.dailyStreak=0
        }
        let daily_streak=localStorage.dailyStreak
        localStorage.clear()
        localStorage.dailyStreak=daily_streak
        localStorage.setItem('pokeArray', JSON.stringify(myArray));
        localStorage.todays_catch=0
        localStorage.first_time=1;
        localStorage.last_date=yymmdd()
        localStorage.last_number=random_number
      }
    }
    else{
      localStorage.todays_catch=0
      localStorage.last_number=random_number
      localStorage.last_date=yymmdd()
    }
    if(localStorage.getItem("todays_catch") == null){
      localStorage.todays_catch=0
    }
    

    if(localStorage.is_shiny == null){
      if( Math.floor(Math.random() * shinyChance)<=1){
        localStorage.is_shiny=1
      }
      else{
        localStorage.is_shiny=0
      }
    }
    console.log(localStorage.dailyStreak)
    console.log(daysBetweenTodayAndDate())
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species/'+random_number;
try {
  fetch(baseUrl)
    .then(response => {
      const responseJson = response.json();
      return responseJson;
    })
    .then(data => {
      const pokemons = data.flavor_text_entries;
      let color= data.color.name;
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
    if(color=="red"){
      color="#FF6961"; // pastel red
    }
    else if(color=="blue"){
      color="#4b99e7"; // pastel blue
    }
    else if(color=="yellow"){
      color="#F2D49B"; // pastel yellow
    }
    else if(color=="green"){
      color="#77DD77"; // pastel green
    }
    else if(color=="brown"){
      color="#DDBEA9"; // pastel brown
    }
    else if(color=="purple"){
      color="#B19CD9"; // pastel purple
    }
    else if(color=="gray"){
      color="#FAC898"; // pastel gray
    }
    else if(color=="white"){
      color="#97A2FF"; // pastel white
    }
    else if(color=="pink"){
      color="#FFB6C1"; // pastel pink
    }
      
      document.getElementById('pokemon_name').style.color =color;
      document.getElementById('pokemon_name').innerHTML =pokemon_name;
      console.log(pokemon_text)
      document.getElementById('pokemon_description').innerHTML =html;
      fetch(sprite_url)
        .then(response => {
          const responseJson = response.json();
          return responseJson;
        })
        .then(data => {
          let sprite
          if(localStorage.is_shiny==1){
            sprite=data.sprites.front_shiny;
          }
          else{
            sprite = data.sprites.front_default;
          }
          if(localStorage.dailyStreak>=2){
            document.getElementById("daily_streak").innerHTML=localStorage.dailyStreak+" Day Streak!";
          }
          
          if(localStorage.todays_catch==0){
            document.getElementById('ae').src = sprite;}
          else{
            document.getElementById("titles").textContent="Pokemon was caught!"
            document.getElementById("ae").src="./pokeball.png"
            document.getElementById("ae").style.width="40px"
            document.getElementById("ae").style.height="40px"
          }
          // document.getElementById('ae').style.filter="brightness(0)"
          
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
