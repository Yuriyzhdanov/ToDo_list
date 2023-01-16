import isValidTextFields from "./isValidTextFields.js";



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


//  fetch('http://localhost:3000/tasks')
// .then(res =>  res.json())
// .then(data =>
//    document.querySelector("#tasksList").innerHTML = 
//    JSON.stringify(data));


const tasks = [
   {
      id: 122345,
    title:"test1",
    description: "test2",
    checked: false,
   }
];

renderTask();


function addTask(event) {
  event.preventDefault();

  const newTask = {
    id: Date.now(),
    title: titleInput.value,
    description: descriptionInput.value,
    checked: false,
  };
console.log(newTask);

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

    parentNode.querySelector(".list-item-task").value
    parentNode.querySelector(".list-item-description").value

    tasks.forEach(element => {
      console.log(element);
      if (parseInt(parentNode.id) === element.id) {
          element.title = parentNode.querySelector('.list-item-task').value;
          element.description = parentNode.querySelector('.list-item-description').value;
          element.checked = parentNode.querySelectorAll('.bi-check-circle')[1] != undefined;
      }
      console.log('tasks', tasks);
      
  });
  //   for (let i = 0; i < tasks.length; i++) {
  //     if (parseInt(parentNode.id) === tasks[i].id) {
  //         tasks[i].title = parentNode.querySelector('.list-item-task').value;
  //         tasks[i].description = parentNode.querySelector('.list-item-description').value;
  //         tasks[i].checked = parentNode.querySelectorAll('.bi-check-circle')[1] != undefined;
  //         console.log("tseg");
  //     }
  // }
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
  tasks = [];
}
