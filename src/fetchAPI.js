// const { URL } = process.env;
// const { getURL } = process.env;
//як передавати різні урл + динамічні параметри
const URL  = "http://localhost:3000/tasks";

async function fetchAPI(URL, method, obj) {
//  methods: Get, Delete
if(method === "GET" || method === "DELETE"  ){
  const response = await fetch(URL, {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .than((tasks) => response.json())
    .than((data) => console.log("data")
    .catch((error) => console.log("error")));
} 
if(method === "PUT" || method === "POST" || method === "PATCH"  ){
   //  methods: Put, Post, Patch
   fetch(URL, {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

}
export default fetchAPI;