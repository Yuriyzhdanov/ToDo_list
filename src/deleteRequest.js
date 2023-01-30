function deleteRequest(id) {
   const request = fetch(`http://localhost:3000/tasks/${id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json;charset=utf-8",
     }
   })
     .then((response) => {
       console.log("Delete:",id);
       response.json();
     })
     .catch((error) => {
       console.error("Error:",id );
     });
 }

 export default deleteRequest;