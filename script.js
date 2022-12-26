const taskTitle = document.querySelector("#taskInput");
const taskDescription = document.querySelector("#taskDescr");
const addTask = document.querySelector("#add");
const checkCircle = document.querySelector("#tasks-input");
const tasksList = document.querySelector("#tasksList"); //ul
//import validation
// import tasks.js

// 
// 1. add, delete, edit, checked, render - cleaning
// 2. залити на git 
// 3. import module
// 4. naming fixed
// 5*  class components integrated

//disabled input 
const tasks = [
  {
    id: 13243,
    title: "Test inp",
    description: "Test desc",
    checked: false,
  }
];

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

//naming головне слово попереду 

//checkedTask
function taskChecked (id) {
   const taskCheckedButton = document.querySelector("#tasks-check-" + id);
      taskCheckedButton.classList.toggle("bi-check-circle");
      taskCheckedButton.classList.toggle("bi-circle");

   const taskInputButton = document.querySelector("#tasks-input-" + id);
      taskInputButton.classList.toggle("checkOn");

   const taskInputDescription = document.querySelector("#tasks-descr-" + id);
      taskInputDescription.classList.toggle("checkOn");

}

  ///editTask
  function taskEdit (id){
//validation
   const editTaskButton = document.querySelector("#tasks-input-" + id);
      editTaskButton.toggleAttribute("readonly");
  }

  function taskDelete(id){
    //atantion
   tasks.forEach((task, index) => {//Перебор елементів пошук потрібного id  
     if( task.id === id ){
      tasks.splice(index, 1);
     } 
   })
   render();
 }

//Перебор елементів і відмальовка переліку  
function render() {
  let taskHtml1 = "";
  tasks.forEach((task) => {
   const renderHTML = `
    <li class="list-item" key=${task.id}>
    <div class="list-item-main">
        <a href="#" class="main-icons">
          <i class="bi-circle" id="tasks-check-${task.id}" onclick="taskChecked(${task.id})" ></i>
          <i class="bi-pen" id="pen" onclick="taskEdit(${task.id})"></i>
          <i class="bi-trash3" onclick="taskDelete(${task.id})"></i>
       </a>
       <input type="text"
       placeholder="empty" class="list-item-task" id="tasks-input-${task.id}" value="${task.title}" readonly >
       <input type="text"
       placeholder="Description" class="list-item-description" id="tasks-descr-${task.id}" value="${task.description}">
    </div>
  </li>
   `;
    taskHtml1 = taskHtml1 + renderHTML;

  });
  tasksList.innerHTML = taskHtml1;
}
