import isValidTextFields from "./isValidTextFields.js";
import tasks from "tasks.json"


const form = document.querySelector("#form");
const titleInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#add");
const descriptionInput = document.querySelector("#taskDescription");
const tasksList = document.querySelector("#tasksList");
const resetAll = document.querySelector("#resetAll");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", doneTask);
tasksList.addEventListener("click", editTask);
tasksList.addEventListener("click", deleteTask);
resetAll.addEventListener("click", deleteAllTasks);

// const tasks = [
//    { id: 122143423,
//    title: "titleTask",
//    description: "descriptionTask",
//    checked: false,}
// ];
fetch('http://127.0.0.8080/tasks.json')
  .then((response) => response.json())
  .then((data) => console.log(data));


// console.log('JSON.parse(tasks)', JSON.parse(tasks));

// fetch(tasks)
// console.log("tasks",tasks);
renderTask();


function addTask(event) {
  event.preventDefault();

  const newTask = {
    id: Date.now(),
    title: titleInput.value,
    description: descriptionInput.value,
    checked: false,
  };
// console.log(newTask);

  tasks.push(newTask);

  renderTask();

  titleInput.value = "";
  descriptionInput.value = "";
}

function renderTask() {
   tasksList.innerHTML="";
   tasks.forEach(function(task){
   const renderHTML = `
  <li id="${task.id}" class="list-item" >
       <div class="list-item-main">
             <a href="#" class="main-icons">
             <i class="bi-check-circle"></i>
             <i class="bi-circle" data-action="done" id="checked"></i>
             <i class="bi-pen" data-action="edit" id="edit"></i>
             <i class="bi-trash3" data-action="delete"></i>
             </a>
         <input type="text"
   placeholder="empty" class="list-item-task" id="taskInput" value="${task.title}" readonly >
         <input type="text"
     placeholder="empty" class="list-item-description" id="taskDescription" value="${task.description}" readonly >
       </div>
  </li>`;
  tasksList.innerHTML += renderHTML;
 })
};

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest(".list-item");

  const id = Number(parentNode.id);
  const currentTask = tasks.find((task) => task.id === id); //obj
  
    currentTask.checked = !currentTask.checked;
  
// console.log("currentTask.checked",currentTask.checked);
// console.log('tasks',tasks);

  const taskTitle = parentNode.querySelector("#taskInput");
  taskTitle.classList.toggle("list-item-task--done");

  const taskDescription = parentNode.querySelector("#taskDescription");
  taskDescription.classList.toggle("list-item-task--done");

  const doneTask = parentNode.querySelector("#checked");
  doneTask.classList.toggle("bi-check-circle");
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
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const parentNode = event.target.closest(".list-item");
  const id = Number(parentNode.id);

  tasks = tasks.filter((task) => task.id !== id);
  if (confirm("want to delete?")) {
    parentNode.remove();
  }
}

function deleteAllTasks() {
  tasksList.innerHTML = "";
}
