// import { tasks } from "./tasks.js";


const taskTitle = document.querySelector("#taskInput");
const taskDescription = document.querySelector("#taskDescr");
const addTask = document.querySelector("#add");
const tasksList = document.querySelector("#tasksList"); //ul

//import validation 
// import tasks.js

// 
// 1. add, delete, edit, checked, render - cleaning #
// 2. залити на git #
// 3. import module
// 4. naming fixed #
// 5*  class components integrated

//disabled input 
const tasks = [];
 

render(); //розмодалювати const tasks винести в окремий модуль

//валідація теж винести окремо 

addTask.addEventListener("click", addItem);

function addItem(event) {
//validation +
  if (taskTitle.value === "" || taskDescription.value === "") {
    alert("field is empty");
  } else {
    event.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: taskTitle.value,
      description: taskDescription.value,
      checked: false,
    };

    tasks.push(newTodo);

    taskTitle.value = "";
    taskDescription.value = "";

    render(); //виклик фун відмальовки <li>
  }
}



//checkedTask
function checkedTasks (id) {
   const taskCheckedButton = document.querySelector("#tasks-check-" + id);
      taskCheckedButton.classList.toggle("bi-check-circle");
      taskCheckedButton.classList.toggle("bi-circle");

   const taskInputButton = document.querySelector("#tasks-input-" + id);
      taskInputButton.classList.toggle("checkOn");

   const taskInputDescription = document.querySelector("#tasks-descr-" + id);
      taskInputDescription.classList.toggle("checkOn");

}

  ///editTask
  function editTasks (id){
//validation
   const editTaskButton = document.querySelector("#tasks-input-" + id);
      editTaskButton.toggleAttribute("readonly");

      const taskDescription = document.querySelector("#tasks-descr-" + id);
      taskDescription.toggleAttribute("readonly");

      const taskInputButton = document.querySelector("#tasks-input-" + id);
      taskInputButton.classList.toggle("checkEdit");

      const taskInputDescription = document.querySelector("#tasks-descr-" + id);
      taskInputDescription.classList.toggle("checkEdit");
  }

  function deleteTasks(id){
if(confirm("точно хочете видалити?")){
   tasks.forEach((task, index) => {//Перебор елементів пошук потрібного id  
      if( task.id === id ){
       tasks.splice(index, 1);
      } 
    })
    render();
  }
} 
   

//Перебор елементів і відмальовка переліку  
function render() {
  let taskHtml1 = "";
  tasks.forEach((task) => {
   const renderHTML = `
    <li class="list-item" key=${task.id}>
    <div class="list-item-main">
        <a href="#" class="main-icons">
          <i class="bi-circle" id="tasks-check-${task.id}" onclick="checkedTasks(${task.id})" ></i>
          <i class="bi-pen" id="pen" onclick="editTasks (${task.id})"></i>
          <i class="bi-trash3" onclick="deleteTasks(${task.id})"></i>
       </a>
       <input type="text"
       placeholder="empty" class="list-item-task" id="tasks-input-${task.id}" value="${task.title}" readonly >
       <input type="text"
       placeholder="Description" class="list-item-description" id="tasks-descr-${task.id}" value="${task.description}" readonly>
    </div>
  </li>
   `;
    taskHtml1 = taskHtml1 + renderHTML;

  });
  tasksList.innerHTML = taskHtml1;
}

