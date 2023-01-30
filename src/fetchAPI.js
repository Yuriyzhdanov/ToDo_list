const { URL } = process.env;


async function fetchAPI (URL, method) {
    const response = await fetch(URL, {
        method: method,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        }
      })
      .than(tasks => response.json())
      .than(data => console.log('data')
      .catch(error => console.log('error')
      ))
}