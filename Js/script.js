const addButton = document.querySelector(".add");
const topEditButton = document.querySelector(".edit-button");
const addInput = document.querySelector(".adding");
const dateInput = document.querySelector(".date");
const alertMessage = document.getElementById("alert-message");
const bodyOfTable = document.querySelector("tbody");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".Delete");
const deleteButton = document.getElementById("Delete");
const editButton = document.getElementById("Edit");
const doButton = document.getElementById("Do");
const filterButtons = document.querySelectorAll(".filter-button");

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
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showMessage("All To Do cleared successfully", "success");
  } else {
    showMessage("No To Do to clear!", "error");
  }
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
    showMessage("To Do added successfully", "success");
  } else {
    showMessage("Pleas enter To Do!", "error");
  }
  console.log(todos);
};

const displayTodos = (data) => {
  const todoList = data || todos;
  bodyOfTable.innerHTML = "";
  if (!todoList.length) {
    bodyOfTable.innerHTML = "<tr><td colspan = 4>No task found!</td></tr>";
    return;
  }

  todoList.forEach((todo) => {
    bodyOfTable.innerHTML += `
    <tr>
              <td>${todo.task}</td>
              <td>${todo.date || "No Date"}</td>
              <td>${todo.completed ? "completed" : "Pending"}</td>
              <td>
                <img onclick="editHandler(${
                  todo.id
                })" src="./Css/icons8-pen-64.png" alt="" />
                <img onclick="toggleHandler(${
                  todo.id
                })" id="Do" src="./Css/icons8-done.svg" alt="" />
                <img onclick="deleteHandler('${
                  todo.id
                }')" src="./Css/icons8-trash.svg" alt="" />
              </td>
    `;
  });
};

const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  addInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  topEditButton.style.display = "inline-block";
  topEditButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id == id);
  todo.task = addInput.value;
  todo.date = dateInput.value;
  addInput.value = "";
  dateInput.value = "";
  addButton.style.display = "inline-block";
  topEditButton.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showMessage("ToDo edit successfully", "success");
};

const toggleHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos();
  showMessage("ToDo status changed successfully", "success");
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id != id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showMessage("To Do delete successfully", "success");
};

const filterHandler = (event) => {
  let filteredTodo = null;
  const filter = event.target.dataset.filter;
  switch (filter) {
    case "pending":
      filteredTodo = todos.filter((todo) => todo.completed === false);

      break;
    case "completed":
      filteredTodo = todos.filter((todo) => todo.completed === true);
      break;
    default:
      filteredTodo = todos;
      break;
  }
  displayTodos(filteredTodo);
  console.log(filteredTodo);
};

window.addEventListener("load", () => displayTodos());
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
topEditButton.addEventListener("click", applyEditHandler);
filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
