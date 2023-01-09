//import style message

function isValidTextFields ( ...args) {

  return [...args].every(x => {
      if( x === ""){
         return console.error("Field is empty, please add words")
      }
      if( x.length <= 2){
          return console.error("Longer word")
      }
      if( x.length >= 25){
        return console.error("Shorter word")
      }
      if(typeof x !== "string"){
          return console.error("Write Text")
      }
        return true;
        
  })
}

export default isValidTextFields;