//    const taskHtml = `
//        <li class="list-item">
// <div class="list-item-main">
//     <a href="#" class="main-icons-left">
//       <i class="bi-check-circle hidden" id="check-circle"></i>
//       <i class="bi-circle" id="circle"></i>
//    </a>
//    <a href="#" class="main-icons-right">
//       <i class="bi-pen "></i>
//       <i class="bi-trash3 "></i>
//    </a>
// </div>
// <div class="input-group">
//    <input type="text"
//    placeholder="Task#1" class="list-item-task" id="tasks-input">${taskInput}</input>
//    <input type="text"
//    placeholder="Task#1 Description:"class="list-item-description" id="tasks-descr"></input>
// </div>
// </li>
// `;

// todo.insertAdjacentHTML("beforeend",taskHtml);  // додаємо таску

//append
//innerHTML

// taskInput.value=''; //очистка поля вводу

// });

//form input
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskDescr = document.querySelector("#taskDescr");
const tasksList = document.querySelector("#tasksList"); //ul

//додавання таскі
form.addEventListener("submit", addTask);

//видалення таскі
tasksList.addEventListener("click", deleteTask);

//cheking task
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();
  //достаємо таску з інпута
  const taskText = taskTitle.value;

  //формуємо розмітку для таски

  const taskHtml = ` 
      <li class="list-item">
         <div class="list-item-main">
            <a href="#" class="main-icons-left">
            <i class="bi-check-circle hidden" id="check-circle"></i>
            <i class="bi-circle" id="circle"></i>
            </a>  
            <a href="#" class="main-icons-right">
            <i class="bi-pen "></i>
            <i class="bi-trash3 "></i>
            </a>
         </div>      
         <div class="input-group">
            <input type="text"
            placeholder="Task#1" class="list-item-task" id="tasks-input">${taskTitle}</input>
            <input type="text"
            placeholder="Task#1 Description:"class="list-item-description" id="tasks-descr"></input>
         </div>
      </li>`;

  //додаємо таску на сторінку
  tasksList.insertAdjacentHTML("beforeend", taskHtml);
  //очистка інпута
  taskTitle.value = "";
}

function deleteTask(event) {
  if (event.target.id === "trash") {
    console.log("delete");
    const parentNode = event.target.closest(".list-item");
    parentNode.remove();
  }
}

function doneTask(event) {
  if (event.target.id === "circle") {
    console.log("check");
    const parentNode = event.target.closest(".list-item");
    console.log(parentNode);
  }
}

const taskTitle = document.querySelector("#taskInput");
const taskDescription = document.querySelector("#taskDescr");
const addTask = document.querySelector("#add");
const checkCircle = document.querySelector("#tasks-input");


// залити на git 

const tasks = [];

addTask.addEventListener("click", addItem);

function addItem(event) {

  if (taskTitle.value == "" && taskDescription.value == "") {
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
  function taskEdit (id) {
   const editTaskButton = document.querySelector("#tasks-input-" + id);
      editTaskButton.toggleAttribute("readonly");
  }

  function taskDelete(id) {
   tasks.forEach((task, index) => {
     if(task.id == id) tasks.splice(index, 1);
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

