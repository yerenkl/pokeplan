const addForm = document.querySelector("form.add");
const ul = document.querySelector("ul.todos");

// Get the todo list from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render the todo list
const renderTodos = () => {
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;
    ul.innerHTML += html;
  });
};

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
