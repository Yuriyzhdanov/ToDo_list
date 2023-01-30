async function fetchGetTasks() {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  })
  .than(tasks => response.json())
  .than(data => console.log('data')
  .catch(error => console.log('error')
  )
  )
}


export default fetchGetTasks;