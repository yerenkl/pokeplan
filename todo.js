const addForm = document.querySelector("form.add");
const ul = document.querySelector("ul.todos");
var modal = document.getElementById('myModal');
var span = document.getElementById("close");
// Get the todo list from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
var flag=0;

// Render the todo list
const renderTodos = () => {
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span onclick="strike(this)">${todo}</span>
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
    document.getElementById("tasks").innerHTML="YOU CAUGHT IT!"
  }
  else{
    document.getElementById("tasks").innerHTML="YOU STILL GOT TASKS TO DO!"
  }
};

function strike(elem) {
  if(flag==0){
    elem.style.textDecoration = "line-through";
    flag=1
  }
  else{
    elem.style.textDecoration = "none";
    flag=0;
  }
  
}
// Add new todo
const handleAddItem = (inputValue) => {
  todos.push(inputValue);
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
    const todo = e.target.parentElement.querySelector("span").textContent;
    todos = todos.filter((item) => item !== todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
});

// Render the initial todo list
renderTodos();
