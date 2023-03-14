const addForm = document.querySelector("form.add");
const ul = document.querySelector("ul.todos");
var modal = document.getElementById('myModal');
var span = document.getElementById("close");

// Get the todo list from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

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
      let myArray=[localStorage.last_number]
      localStorage.setItem('pokeArray', JSON.stringify(myArray));
    }
    else if(localStorage.todays_catch==0){
      let myArray = JSON.parse(localStorage.getItem('pokeArray'));
      myArray.push(localStorage.last_number)
      localStorage.setItem('pokeArray', JSON.stringify(myArray));
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