const addButton = document.querySelector(".add");
const addInput = document.querySelector(".adding");
const dateInput = document.querySelector(".date");
const alertMessage = document.getElementById("alert-message");
const bodyOfTable = document.querySelector("tbody");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".Delete");

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
    addInput.value = "";
    dateInput.value = "";
    showMessage("To Do added sucssesfully", "sucsses");
  } else {
    showMessage("Pleas enter To Do!", "error");
  }
  console.log(todos);
};

addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
