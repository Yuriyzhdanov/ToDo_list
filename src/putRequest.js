async function putRequest(id, obj) {
   return fetch(`http://localhost:3000/tasks/${id}`, {
     method: "PUT",
     body: JSON.stringify(obj),
     headers: {
       "Content-type": "application/json; charset=UTF-8",
     },
   })
     .then((res) => res.json())
     .then((data) => console.log('data', data));
 }

 export default putRequest;