//import style message


function isValidTextFields(...args) {
  let message = null;
  [...args].every((x) => {
    if (x === "") message = "Field is empty, please add words";

    if (x != "" && x.length <= 2) message = "Longer word";

    if (x.length >= 25) message = "Shorter word";

    if (typeof x !== "string") message = "Write Text";
  });

  return message;
}


export default isValidTextFields;
