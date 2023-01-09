import isValidTextFields from "./isValidTextFields.js";

const form = document.querySelector("#form");
const titleInput = document.querySelector("#taskInput");
const descriptionInput = document.querySelector("#taskDescription");
// const addTaskButton = document.querySelector("#add");
const tasksList = document.querySelector("#tasksList");
const resetAll = document.querySelector("#resetAll");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {
  const cssClass = task.checked ? "list-item-task--done" : "list-item-task";
  const renderHTML = `<li id="${task.id}" class="list-item" >
   <div class="list-item-main">
       <a href="#" class="main-icons">
       <i class="bi-check-circle"></i>
         <i class="bi-circle" data-action="done" id="checked"></i>
         <i class="bi-pen" data-action="edit" id="edit"></i>
         <i class="bi-trash3" data-action="delete"></i>
      </a>
      <input type="text" 
      placeholder="empty" class="${cssClass}" id="taskInput" value=${task.title} readonly >
      <input type="text"
      placeholder="empty" class="list-item-description" id="taskDescription" value=${task.description} readonly >
   </div>
 </li>`;
 
  tasksList.insertAdjacentHTML("beforeend", renderHTML);
});

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", doneTask);
tasksList.addEventListener("click", editTask);
tasksList.addEventListener("click", deleteTask);
// tasksList.addEventListener("click", resetAll);

function addTask(event) {
  event.preventDefault();

  const titleTask = titleInput.value;
  const descriptionTask = descriptionInput.value;

  const newTask = {
    id: Date.now(),
    title: titleTask,
    description: descriptionTask,
    checked: false, //некоректно відображається клас
  };

  tasks.push(newTask);

  saveToLocalStorage();

  const cssClass = newTask.checked ? "list-item-task--done" : "list-item-task";

    if (isValidTextFields(titleInput.value, descriptionInput.value)) {
  const renderHTML = `
  <li id="${newTask.id}" class="list-item" >
  <div class="list-item-main">
        <a href="#" class="main-icons">
        <i class="bi-check-circle"></i>
        <i class="bi-circle" data-action="done" id="checked"></i>
        <i class="bi-pen" data-action="edit" id="edit"></i>
        <i class="bi-trash3" data-action="delete"></i>
        </a>
     <input type="text" 
     placeholder="empty" class="${cssClass}" id="taskInput" value=${newTask.title} readonly >
     <input type="text"
     placeholder="empty" class="list-item-description" id="taskDescription" value=${newTask.description} readonly >
  </div>
  </li>`;
  tasksList.insertAdjacentHTML("beforeend", renderHTML);
  console.log(titleInput.value);
  console.log(descriptionInput.value);

  titleInput.value = "";
  descriptionInput.value = "";
}}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-item");

    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);
    task.checked = !task.checked;

    const taskTitle = parentNode.querySelector("#taskInput");
    taskTitle.classList.toggle("list-item-task--done");

    const taskDescription = parentNode.querySelector("#taskDescription");
    taskDescription.classList.toggle("list-item-task--done");

    const doneTask = parentNode.querySelector("#checked");
    doneTask.classList.toggle("bi-check-circle");
    saveToLocalStorage();
  }
}

function editTask(event) {
  if (event.target.dataset.action === "edit") {
    const parentNode = event.target.closest(".list-item");
    const inputEdit = parentNode.querySelector("#taskInput");
    inputEdit.toggleAttribute("readonly");
    inputEdit.classList.toggle("checkEdit");

    const descriptionEdit = parentNode.querySelector("#taskDescription");
    descriptionEdit.toggleAttribute("readonly");
    descriptionEdit.classList.toggle("checkEdit");
  }
  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-item");
    const id = Number(parentNode.id);

    tasks = tasks.filter((task) => task.id !== id);
    if (confirm("want to delete?")) {
      parentNode.remove();
    }
  }
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function resetAll (event) {
//    if (event.target.dataset.action === "resetAll") {
//      const parentNode = event.target.closest("#resetAll");
//      parentNode.splice(0,tasks.length)
//    }};
