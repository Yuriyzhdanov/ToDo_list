function patchRequestCheck(id, complete) {
   return fetch(`http://localhost:3000/tasks/${id}`, {
     method: "PATCH",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(complete),
   })
     .then((res) => res.json())
     .then((data) => console.log(data));
 }
 export default patchRequestCheck; 