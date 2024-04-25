const addButton = document.querySelector(".add");
const addInput = document.querySelector(".adding");
const dateInput = document.querySelector(".date");
const alertMessage = document.getElementById("alert-message");
const bodyOfTable = document.querySelector("tbody");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".Delete");
const deleteButton = document.getElementById("Delete");
const editButton = document.getElementById("Edit");
const doButton = document.getElementById("Do");

const showMessage = (message, type) => {
  alertMessage.innerText = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const deleteAllHandler = () => {
  todos.splice(0, todos.length);
  localStorage.clear();
  console.log(todos);
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(10, 10));
};

const addHandler = () => {
  const task = addInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    addInput.value = "";
    dateInput.value = "";
    showMessage("To Do added sucssesfully", "sucsses");
  } else {
    showMessage("Pleas enter To Do!", "error");
  }
  console.log(todos);
};

const displayTodos = () => {
  bodyOfTable.innerHTML = "";
  if (!todos.length) {
    bodyOfTable.innerHTML = "<tr><td colspan = 4>No task found!</td></tr>";
  }

  todos.forEach((todo) => {
    bodyOfTable.innerHTML += `
    <tr>
              <td>${todo.task}</td>
              <td>${todo.date || "No Date"}</td>
              <td>${todo.completed ? "completed" : "Pending"}</td>
              <td>
                <img src="./Css/icons8-pen-64.png" alt="" />
                <img id="Do" src="./Css/icons8-done.svg" alt="" />
                <img src="./Css/icons8-trash.svg" alt="" />
              </td>
    `;
  });
};

const deleteButtonHandler = () => {};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
deleteButton.addEventListener("click", deleteButtonHandler);
editButton.addEventListener("click", editButtonHandler);
doButton.addEventListener("click", doButtonHandler);
