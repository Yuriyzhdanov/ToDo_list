import isValidTextFields from "./isValidTextFields.js";
import postRequest from "./postRequest.js";
import deleteRequest from "./deleteRequest.js";
import fetchGETTasks from "./getRequest.js";
import fetchAPI from "./fetchAPI.js"

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



renderTask();

function addTask(event) {
  event.preventDefault();

  const newTask = {
    //obj
    id: Date.now(),
    title: titleInput.value,
    description: descriptionInput.value,
    checked: false,
  };

  postRequest(newTask);

  titleInput.value = "";
  descriptionInput.value = "";
}

function doneTask(event) {
  //PUT
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

// async function putRequest(tasks){
//    const response = await fetch("http://localhost:3000/tasks", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(tasks)
//     });
//     const tasks = await response.json();
//     console.log('data',tasks);
//    }
//    console.log('putRequest(tasks)',putRequest());

function editTask(event) {
  if (event.target.dataset.action === "edit") {
    const parentNode = event.target.closest(".list-item");
    const inputEdit = parentNode.querySelector("#taskInput");


    inputEdit.toggleAttribute("readonly") ; 
    inputEdit.classList.toggle("checkEdit");

    const descriptionEdit = parentNode.querySelector("#taskDescription");

    //  descriptionEdit.toggleAttribute("readonly");
    //  descriptionEdit.classList.toggle("checkEdit");
    
    parentNode.querySelector(".list-item-task").value;
    parentNode.querySelector(".list-item-description").value;

    const id = Number(parentNode.id);

    const editedTask = {
      title: parentNode.querySelector(".list-item-task").value,
      description: parentNode.querySelector(".list-item-description").value,
    };

    if (inputEdit.readOnly) {
      updatePutRequest(id, editedTask);
    }
    
  }
}
//

async function updatePutRequest(id, obj) {
  return fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const parentNode = event.target.closest(".list-item");
  const id = Number(parentNode.id);
  deleteRequest(id);
}

function deleteAllTasks() {
  //DELETE method
  tasksList.innerHTML = "";
}

function renderTask() {
  fetchGETTasks().then((tasks) => {
    tasksList.innerHTML = "";
    tasks.forEach(function (task) {
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
                  placeholder="empty" class="list-item-description" id="taskDescription" value="${task.description}"  >
                    </div>
              </li>`;
      tasksList.innerHTML += renderHTML;
    });
  });
}
