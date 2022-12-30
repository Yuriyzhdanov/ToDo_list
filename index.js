// import { tasks } from "./tasks.js";
import isValidTextFields from  "./isValidTextFields.js"


const taskTitle = document.querySelector("#taskInput");
const taskDescription = document.querySelector("#taskDescr");
const addTask = document.querySelector("#add");
const tasksList = document.querySelector("#tasksList"); //ul

// const deleteItem = document.getElementById("deleteTask");

// deleteItem.addEventListener("click", deleteTask);
const tasks = [
  {
            id: 464646,
          title: "Test1",
          description: "Dec2",
          checked: false,
    
        }
];
 

render();

addTask.addEventListener("click", addItem);


function addItem(event) {

    if(isValidTextFields(taskTitle.value, taskDescription.value)){
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

    render();
    }
    
  }


function checkedTask (id) {
   const taskCheckedButton = document.querySelector("#tasks-check-" + id);
      taskCheckedButton.classList.toggle("bi-check-circle");
      taskCheckedButton.classList.toggle("bi-circle");

   const taskInputButton = document.querySelector("#tasks-input-" + id);
      taskInputButton.classList.toggle("checkOn");

   const taskInputDescription = document.querySelector("#tasks-descr-" + id);
      taskInputDescription.classList.toggle("checkOn");

}

  function editTask(id){
    //valid
    // if(isValidTextFields(taskTitle.value, taskDescription.value)){
      // editTask
    // }
  
      const editTaskButton = document.querySelector("#tasks-input-" + id);
      editTaskButton.toggleAttribute("readonly");

      const taskDescription = document.querySelector("#tasks-descr-" + id);
      taskDescription.toggleAttribute("readonly");

      const taskInputButton = document.querySelector("#tasks-input-" + id);
      taskInputButton.classList.toggle("checkEdit");

      const taskInputDescription = document.querySelector("#tasks-descr-" + id);
      taskInputDescription.classList.toggle("checkEdit");
}
  
  function deleteTask(id){
if(confirm("want to delete?")){
  //find methods
   tasks.forEach((task, index) => {
      if( task.id === id ){
       tasks.splice(index, 1);
      } 
    })
    render();
  }
} 
   
function render() {
  let taskHtml1 = "";
  tasks.forEach((task) => {
   const renderHTML = `
    <li class="list-item" key=${task.id}>
    <div class="list-item-main">
        <a href="#" class="main-icons">
          <i class="bi-circle" id="tasks-check-${task.id}" onclick="checkedTask(${task.id})" ></i>
          <i class="bi-pen" id="pen" onclick="editTask(${task.id})"></i>
          <i class="bi-trash3" onclick="deleteTask(${task.id})"></i>
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

