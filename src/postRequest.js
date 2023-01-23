
function postRequest(newTask) {
   fetch("http://localhost:3000/tasks", {
     method: "POST",
     headers: {
       "Content-Type": "application/json;charset=utf-8",
     },
     body: JSON.stringify(newTask),
   })
     .then((response) => {
       console.log("Success:", newTask);
       response.json();
     })
     .catch((error) => {
       console.error("Error:", error);
     });
 }

 
 export default postRequest; 
