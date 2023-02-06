
async function fetchGetTasks() {
   const response = await fetch("http://localhost:3000/tasks");
   const tasks = await response.json();
   return tasks;
 }
 
 
 export default fetchGetTasks;