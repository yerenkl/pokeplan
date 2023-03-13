const addForm = document.querySelector("form.add");
const ul = document.querySelector("ul.todos");
const searchFormInput = document.querySelector("form.search input");

//ADD NEW TODO
const handleAddItem = (inputValue) => {
  const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  ul.innerHTML += html;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = addForm.add.value;
  if (inputValue.length) handleAddItem(inputValue);
  addForm.add.value = "";
});

//REMOVE TODO
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

//SEARCH INPUT: PREVENT DEFAULT ACTION - LITTLE BUG I FOUND IN THE COURSE PROJECT
searchFormInput.parentElement.addEventListener("submit", (e) =>
  e.preventDefault()
);

//SEARCH AND FILTER TODOS
const filterItems = (value) => {
  Array.from(ul.children).forEach((li) => {
    if (!li.textContent.toLowerCase().includes(value)) li.classList.add("filtred");
    else li.classList.remove("filtred");
  });
};

searchFormInput.addEventListener("keyup", (e) => {
  const value = searchFormInput.value.toLowerCase().trim();
  filterItems(value);
});
