const addForm = document.querySelector("form.add");
const ul = document.querySelector("ul.todos");
var modal = document.getElementById('myModal');
var span = document.getElementById("close");

// Get the todo list from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let pokedate=function(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // add leading zero if needed
  const day = String(now.getDate()).padStart(2, '0'); // add leading zero if needed
  const today = `${day}/${month}/${year}`;
  return today
}

var modalOverlay = document.getElementById("myModal");
  modalOverlay.addEventListener('click', function(event){
    if (event.target == modalOverlay) {
      cls();
    }
  });
// Render the todo list
const renderTodos = () => {
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span onclick="strike(this)" ${todo.completed ? 'style="text-decoration: line-through;"' : ''}>${todo.text}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;
    ul.innerHTML += html;
  });
};

function cls() {
  modal.style.display = "none";
}

const addPokemon = (pokemonNumber, isShiny) => {
  const newPokemon = { number: pokemonNumber, is_shiny: isShiny, today:pokedate()};
  let pokeArray = JSON.parse(localStorage.getItem('pokeArray'));
  pokeArray.push(newPokemon);
  localStorage.setItem("pokeArray", JSON.stringify(pokeArray));
};

const btn = () => {
  modal.style.display = "block";
  const total = todos.length;
  const striked = ul.querySelectorAll("span[style='text-decoration: line-through;']").length;
  const notStriked = total - striked;
  if(total>0 && notStriked==0){
    document.getElementById("tasks").innerHTML="Gotcha!"
    document.getElementById("titles").textContent="Pokemon was caught!"
    // document.getElementById("form_text").textContent="You can do extra tasks!"
    document.getElementById("ae").src="./pokeball.png"
    document.getElementById("ae").style.width="40px"
    document.getElementById("ae").style.height="40px"
    if (localStorage.pokeArray==null){
      pokeArray=[{ number: localStorage.last_number, is_shiny: localStorage.is_shiny,today:pokedate() }];
      localStorage.setItem("pokeArray", JSON.stringify(pokeArray));
    }
    else if(localStorage.todays_catch==0){
      addPokemon(localStorage.last_number,localStorage.is_shiny)
    }
    localStorage.todays_catch=1
    console.log(localStorage.pokeArray)
  }
  else if(notStriked>0){
    document.getElementById("tasks").innerHTML="YOU STILL GOT TASKS TO DO!"
  }
  else if(total==0){
    document.getElementById("tasks").innerHTML="YOU DIDN'T ENTER ANY TASKS!"
  }
};

function strike(elem) {
  const todoText = elem.textContent;
  const todo = todos.find((item) => item.text === todoText);
  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

// Add new todo
const handleAddItem = (inputValue) => {
  const newItem = { text: inputValue, completed: false };
  todos.push(newItem);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = addForm.add.value;
  if (inputValue.length) handleAddItem(inputValue);
  addForm.add.value = "";
});

// Remove todo
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todoText = e.target.parentElement.querySelector("span").textContent;
    todos = todos.filter((item) => item.text !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
});

// Render the initial todo list
renderTodos();