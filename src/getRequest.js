// function getRequest() {
//  fetch("http://localhost:3000/tasks")
//   .then((response) => response.json())
//   .then((tasks) => console.log(tasks));
// }
//  export default getRequest; 

async function fetchGetTasks() {
  const response = await fetch("http://localhost:3000/tasks");
  const tasks = await response.json();
  return tasks;
}


export default fetchGetTasks;