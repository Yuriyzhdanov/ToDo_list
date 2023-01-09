//    const taskHtml = `
//        <li class="list-item">
// <div class="list-item-main">
//     <a href="#" class="main-icons-left">
//       <i class="bi-check-circle hidden" id="check-circle"></i>
//       <i class="bi-circle" id="circle"></i>
//    </a>
//    <a href="#" class="main-icons-right">
//       <i class="bi-pen "></i>
//       <i class="bi-trash3 "></i>
//    </a>
// </div>
// <div class="input-group">
//    <input type="text"
//    placeholder="Task#1" class="list-item-task" id="tasks-input">${taskInput}</input>
//    <input type="text"
//    placeholder="Task#1 Description:"class="list-item-description" id="tasks-descr"></input>
// </div>
// </li>
// `;

// todo.insertAdjacentHTML("beforeend",taskHtml);  // додаємо таску

//append
//innerHTML

// taskInput.value=''; //очистка поля вводу

// });

//form input
const form1 = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskDescr = document.querySelector("#taskDescr");
const tasksList = document.querySelector("#tasksList"); //ul

//додавання таскі
form.addEventListener("submit", addTask);

//видалення таскі
tasksList.addEventListener("click", deleteTask);

//cheking task
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();
  //достаємо таску з інпута
  const taskText = taskTitle.value;

  //формуємо розмітку для таски

  const taskHtml = ` 
      <li class="list-item">
         <div class="list-item-main">
            <a href="#" class="main-icons-left">
            <i class="bi-check-circle hidden" id="check-circle"></i>
            <i class="bi-circle" id="circle"></i>
            </a>  
            <a href="#" class="main-icons-right">
            <i class="bi-pen "></i>
            <i class="bi-trash3 "></i>
            </a>
         </div>      
         <div class="input-group">
            <input type="text"
            placeholder="Task#1" class="list-item-task" id="tasks-input">${taskTitle}</input>
            <input type="text"
            placeholder="Task#1 Description:"class="list-item-description" id="tasks-descr"></input>
         </div>
      </li>`;

  //додаємо таску на сторінку
  tasksList.insertAdjacentHTML("beforeend", taskHtml);
  //очистка інпута
  taskTitle.value = "";
}

function deleteTask(event) {
  if (event.target.id === "trash") {
    console.log("delete");
    const parentNode = event.target.closest(".list-item");
    parentNode.remove();
  }
}

function doneTask(event) {
  if (event.target.id === "circle") {
    console.log("check");
    const parentNode = event.target.closest(".list-item");
    console.log(parentNode);
  }
}

const taskTitle = document.querySelector("#taskInput");
const taskDescription = document.querySelector("#taskDescr");
const addTask = document.querySelector("#add");
const checkCircle = document.querySelector("#tasks-input");


// залити на git 

const tasks = [];

addTask.addEventListener("click", addItem);

function addItem(event) {

  if (taskTitle.value == "" && taskDescription.value == "") {
    alert("field is empty");
  } else {
    event.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: taskTitle.value,
      description: taskDescription.value,
      checked: false,
    };

    tasks.push(newTodo);

    taskTitle.value = "";
    taskDescription.value = "";

    render(); //виклик фун відмальовки <li>
  }
}

function taskChecked (id) {
   const taskCheckedButton = document.querySelector("#tasks-check-" + id);
      taskCheckedButton.classList.toggle("bi-check-circle");
      taskCheckedButton.classList.toggle("bi-circle");

   const taskInputButton = document.querySelector("#tasks-input-" + id);
      taskInputButton.classList.toggle("checkOn");

   const taskInputDescription = document.querySelector("#tasks-descr-" + id);
      taskInputDescription.classList.toggle("checkOn");

}
  function taskEdit (id) {
   const editTaskButton = document.querySelector("#tasks-input-" + id);
      editTaskButton.toggleAttribute("readonly");
  }

  function taskDelete(id) {
   tasks.forEach((task, index) => {
     if(task.id == id) tasks.splice(index, 1);
   })
   render();
 }

function render() {
  let taskHtml1 = "";
  tasks.forEach((task) => {
   const renderHTML = `
    <li class="list-item" key=${task.id}>
    <div class="list-item-main">
        <a href="#" class="main-icons">
          <i class="bi-circle" id="tasks-check-${task.id}" onclick="taskChecked(${task.id})" ></i>
          <i class="bi-pen" id="pen" onclick="taskEdit(${task.id})"></i>
          <i class="bi-trash3" onclick="taskDelete(${task.id})"></i>
       </a>
       <input type="text"
       placeholder="empty" class="list-item-task" id="tasks-input-${task.id}" value="${task.title}" readonly >
       <input type="text"
       placeholder="Description" class="list-item-description" id="tasks-descr-${task.id}" value="${task.description}">
    </div>
  </li>
   `;
    taskHtml1 = taskHtml1 + renderHTML;

  });

  tasksList.innerHTML = taskHtml1;


}


//VALIDATION


const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  checkInputs();
});

const checkInputs = () => {
  // Get values from the inputs
  const usernameValue = username.value.trim(); //видаляє пробіл 
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  
  if(!usernameValue) {
    //Show error    
    //Add error class
    setErrorFor(username, 'Username cannot be blank');
  } else {
    //Add succes class
    setSuccessFor(username);
  }
  
  if(!emailValue) {
    //Show error    
    //Add error class
    setErrorFor(email, 'Email cannot be blank');
  } else if(!isEmail(emailValue)) {
    //Show error    
    //Add error class
    setErrorFor(email, 'Email is not valid');
  } else {
    //Add succes class
    setSuccessFor(email);
  }
  
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if(!passwordValue) {
    //Show error    
    //Add error class
    setErrorFor(password, 'Password cannot be blank');
  } else if(passwordValue.length < 8){
    //Add succes class
    setErrorFor(password, 'Password to short');
  } else if(!passwordValue.match(re)){
    //Add succes class
    setErrorFor(password, 'it have to contains a upper, lower and a number');
  } else {
    //Add succes class
    setSuccessFor(password);
  }
  
  if(!password2Value) {
    //Show error    
    //Add error class
    setErrorFor(password2, 'write again your password');
  } else if(passwordValue !== password2Value){
    //Add succes class
    setErrorFor(password2, 'does not match');
  } else {
    //Add succes class
    setSuccessFor(password2);
  }
  
  //HomeWork mostrar un mensaje de exito al hacer click y todo este correcto
}

const setErrorFor = (input, message) => {
  const formControl = input.parentElement; //this is the .form-control
  const small = formControl.querySelector('small');
  
  //add error message inside small
  small.innerText = message;
  
  //add error class
  formControl.className = 'form-control error';
} 

const setSuccessFor = (input) => {
  const formControl = input.parentElement; //this is the .form-control
  
  //add success class
  formControl.className = 'form-control success';
}

const isEmail = (email) => {  
  //this checks if the email is valid
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const togglePassword = () => {
  const psw = document.getElementById('password');
  
  const show = document.getElementById('show');
  const hide = document.getElementById('hide');
  
  

  if (psw.type === "password") {
      psw.type = "text";
      show.style.visibility = 'hidden';
      hide.style.visibility = 'visible';
    } else {
      psw.type = "password";
      show.style.visibility = 'visible';
      hide.style.visibility = 'hidden';
    }
  
  
}

const toggleConfirm = () => {
  const confirm = document.getElementById('password2');
  
  const show2 = document.getElementById('show2');
  const hide2 = document.getElementById('hide2');
  
  if (confirm.type === "password") {
      confirm.type = "text";
      show2.style.visibility = 'hidden';
      hide2.style.visibility = 'visible';
    } else {
      confirm.type = "password";
      show2.style.visibility = 'visible';
      hide2.style.visibility = 'hidden';
    }
}


//////////////////

(function(window, document, undefined) {
    /*
     * If you would like an application-wide config, change these defaults.
     * Otherwise, use the setMessage() function to configure form specific messages.
     */

    var defaults = {
        messages: {
            required: 'The %s field is required.',
            matches: 'The %s field does not match the %s field.',
            "default": 'The %s field is still set to default, please change.',
            valid_email: 'The %s field must contain a valid email address.',
            valid_emails: 'The %s field must contain all valid email addresses.',
            min_length: 'The %s field must be at least %s characters in length.',
            max_length: 'The %s field must not exceed %s characters in length.',
            exact_length: 'The %s field must be exactly %s characters in length.',
            greater_than: 'The %s field must contain a number greater than %s.',
            less_than: 'The %s field must contain a number less than %s.',
            alpha: 'The %s field must only contain alphabetical characters.',
            alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
            alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
            numeric: 'The %s field must contain only numbers.',
            integer: 'The %s field must contain an integer.',
            decimal: 'The %s field must contain a decimal number.',
            is_natural: 'The %s field must contain only positive numbers.',
            is_natural_no_zero: 'The %s field must contain a number greater than zero.',
            valid_ip: 'The %s field must contain a valid IP.',
            valid_base64: 'The %s field must contain a base64 string.',
            valid_credit_card: 'The %s field must contain a valid credit card number.',
            is_file_type: 'The %s field must contain only %s files.',
            valid_url: 'The %s field must contain a valid URL.',
            greater_than_date: 'The %s field must contain a more recent date than %s.',
            less_than_date: 'The %s field must contain an older date than %s.',
            greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
            less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.'
        },
        callback: function(errors) {

        }
    };

    /*
     * Define the regular expressions that will be used
     */

    var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;

    /*
     * The exposed public object to validate a form:
     *
     * @param formNameOrNode - String - The name attribute of the form (i.e. <form name="myForm"></form>) or node of the form element
     * @param fields - Array - [{
     *     name: The name of the element (i.e. <input name="myField" />)
     *     display: 'Field Name'
     *     rules: required|matches[password_confirm]
     * }]
     * @param callback - Function - The callback after validation has been performed.
     *     @argument errors - An array of validation errors
     *     @argument event - The javascript event
     */

    var FormValidator = function(formNameOrNode, fields, callback) {
        this.callback = callback || defaults.callback;
        this.errors = [];
        this.fields = {};
        this.form = this._formByNameOrNode(formNameOrNode) || {};
        this.messages = {};
        this.handlers = {};
        this.conditionals = {};

        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
            var field = fields[i];

            // If passed in incorrectly, we need to skip the field.
            if ((!field.name && !field.names) || !field.rules) {
                console.warn('validate.js: The following field is being skipped due to a misconfiguration:');
                console.warn(field);
                console.warn('Check to ensure you have properly configured a name and rules for this field');
                continue;
            }

            /*
             * Build the master fields array that has all the information needed to validate
             */

            if (field.names) {
                for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
                    this._addField(field, field.names[j]);
                }
            } else {
                this._addField(field, field.name);
            }
        }

        /*
         * Attach an event callback for the form submission
         */

        var _onsubmit = this.form.onsubmit;

        this.form.onsubmit = (function(that) {
            return function(evt) {
                try {
                    return that._validateForm(evt) && (_onsubmit === undefined || _onsubmit());
                } catch(e) {}
            };
        })(this);
    },

    attributeValue = function (element, attributeName) {
        var i;

        if ((element.length > 0) && (element[0].type === 'radio' || element[0].type === 'checkbox')) {
            for (i = 0, elementLength = element.length; i < elementLength; i++) {
                if (element[i].checked) {
                    return element[i][attributeName];
                }
            }

            return;
        }

        return element[attributeName];
    };

    /*
     * @public
     * Sets a custom message for one of the rules
     */

    FormValidator.prototype.setMessage = function(rule, message) {
        this.messages[rule] = message;

        // return this for chaining
        return this;
    };
    
    /*
     * @public
     *
     * @param fields - Array - [{
     *     name: The name of the element (i.e. <input name="myField" />)
     *     display: 'Field Name'
     *     rules: required|matches[password_confirm]
     * }]
     * Sets new custom validation rules set
     */

    FormValidator.prototype.setRules = function(fields) {
        this.fields = {};
        
        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
            var field = fields[i];

            // If passed in incorrectly, we need to skip the field.
            if ((!field.name && !field.names) || !field.rules) {
                console.warn('validate.js: The following field is being skipped due to a misconfiguration:');
                console.warn(field);
                console.warn('Check to ensure you have properly configured a name and rules for this field');
                continue;
            }

            /*
             * Build the master fields array that has all the information needed to validate
             */

            if (field.names) {
                for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
                    this._addField(field, field.names[j]);
                }
            } else {
                this._addField(field, field.name);
            }
        }

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Registers a callback for a custom rule (i.e. callback_username_check)
     */

    FormValidator.prototype.registerCallback = function(name, handler) {
        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
            this.handlers[name] = handler;
        }

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Registers a conditional for a custom 'depends' rule
     */

    FormValidator.prototype.registerConditional = function(name, conditional) {
        if (name && typeof name === 'string' && conditional && typeof conditional === 'function') {
            this.conditionals[name] = conditional;
        }

        // return this for chaining
        return this;
    };

    /*
     * @private
     * Determines if a form dom node was passed in or just a string representing the form name
     */

    FormValidator.prototype._formByNameOrNode = function(formNameOrNode) {
        return (typeof formNameOrNode === 'object') ? formNameOrNode : document.forms[formNameOrNode];
    };

    /*
     * @private
     * Adds a file to the master fields array
     */

    FormValidator.prototype._addField = function(field, nameValue)  {
        this.fields[nameValue] = {
            name: nameValue,
            display: field.display || nameValue,
            rules: field.rules,
            depends: field.depends,
            id: null,
            element: null,
            type: null,
            value: null,
            checked: null
        };
    };

    /*
     * @private
     * Runs the validation when the form is submitted.
     */

    FormValidator.prototype._validateForm = function(evt) {
        this.errors = [];

        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                var field = this.fields[key] || {},
                    element = this.form[field.name];

                if (element && element !== undefined) {
                    field.id = attributeValue(element, 'id');
                    field.element = element;
                    field.type = (element.length > 0) ? element[0].type : element.type;
                    field.value = attributeValue(element, 'value');
                    field.checked = attributeValue(element, 'checked');

                    /*
                     * Run through the rules for each field.
                     * If the field has a depends conditional, only validate the field
                     * if it passes the custom function
                     */

                    if (field.depends && typeof field.depends === "function") {
                        if (field.depends.call(this, field)) {
                            this._validateField(field);
                        }
                    } else if (field.depends && typeof field.depends === "string" && this.conditionals[field.depends]) {
                        if (this.conditionals[field.depends].call(this,field)) {
                            this._validateField(field);
                        }
                    } else {
                        this._validateField(field);
                    }
                }
            }
        }

        if (typeof this.callback === 'function') {
            this.callback(this.errors, evt);
        }

        if (this.errors.length > 0) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                // IE uses the global event variable
                event.returnValue = false;
            }
        }

        return true;
    };

    /*
     * @private
     * Looks at the fields value and evaluates it against the given rules
     */

    FormValidator.prototype._validateField = function(field) {
        var i, j, ruleLength,
            rules = field.rules.split('|'),
            indexOfRequired = field.rules.indexOf('required'),
            isEmpty = (!field.value || field.value === '' || field.value === undefined);

        /*
         * Run through the rules and execute the validation methods as needed
         */

        for (i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            var method = rules[i],
                param = null,
                failed = false,
                parts = ruleRegex.exec(method);

            /*
             * If this field is not required and the value is empty, continue on to the next rule unless it's a callback.
             * This ensures that a callback will always be called but other rules will be skipped.
             */

            if (indexOfRequired === -1 && method.indexOf('!callback_') === -1 && isEmpty) {
                continue;
            }

            /*
             * If the rule has a parameter (i.e. matches[param]) split it out
             */

            if (parts) {
                method = parts[1];
                param = parts[2];
            }

            if (method.charAt(0) === '!') {
                method = method.substring(1, method.length);
            }

            /*
             * If the hook is defined, run it to find any validation errors
             */

            if (typeof this._hooks[method] === 'function') {
                if (!this._hooks[method].apply(this, [field, param])) {
                    failed = true;
                }
            } else if (method.substring(0, 9) === 'callback_') {
                // Custom method. Execute the handler if it was registered
                method = method.substring(9, method.length);

                if (typeof this.handlers[method] === 'function') {
                    if (this.handlers[method].apply(this, [field.value, param, field]) === false) {
                        failed = true;
                    }
                }
            }

            /*
             * If the hook failed, add a message to the errors array
             */

            if (failed) {
                // Make sure we have a message for this rule
                var source = this.messages[field.name + '.' + method] || this.messages[method] || defaults.messages[method],
                    message = 'An error has occurred with the ' + field.display + ' field.';

                if (source) {
                    message = source.replace('%s', field.display);

                    if (param) {
                        message = message.replace('%s', (this.fields[param]) ? this.fields[param].display : param);
                    }
                }

                var existingError;
                for (j = 0; j < this.errors.length; j += 1) {
                    if (field.id === this.errors[j].id) {
                        existingError = this.errors[j];
                    }
                }

                var errorObject = existingError || {
                    id: field.id,
                    display: field.display,
                    element: field.element,
                    name: field.name,
                    message: message,
                    messages: [],
                    rule: method
                };
                errorObject.messages.push(message);
                if (!existingError) this.errors.push(errorObject);
            }
        }
    };

    /**
     * private function _getValidDate: helper function to convert a string date to a Date object
     * @param date (String) must be in format yyyy-mm-dd or use keyword: today
     * @returns {Date} returns false if invalid
     */
    FormValidator.prototype._getValidDate = function(date) {
        if (!date.match('today') && !date.match(dateRegex)) {
            return false;
        }

        var validDate = new Date(),
            validDateArray;

        if (!date.match('today')) {
            validDateArray = date.split('-');
            validDate.setFullYear(validDateArray[0]);
            validDate.setMonth(validDateArray[1] - 1);
            validDate.setDate(validDateArray[2]);
        }
        return validDate;
    };

    /*
     * @private
     * Object containing all of the validation hooks
     */

    FormValidator.prototype._hooks = {
        required: function(field) {
            var value = field.value;

            if ((field.type === 'checkbox') || (field.type === 'radio')) {
                return (field.checked === true);
            }

            return (value !== null && value !== '');
        },

        "default": function(field, defaultName){
            return field.value !== defaultName;
        },

        matches: function(field, matchName) {
            var el = this.form[matchName];

            if (el) {
                return field.value === el.value;
            }

            return false;
        },

        valid_email: function(field) {
            return emailRegex.test(field.value);
        },

        valid_emails: function(field) {
            var result = field.value.split(/\s*,\s*/g);

            for (var i = 0, resultLength = result.length; i < resultLength; i++) {
                if (!emailRegex.test(result[i])) {
                    return false;
                }
            }

            return true;
        },

        min_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length >= parseInt(length, 10));
        },

        max_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length <= parseInt(length, 10));
        },

        exact_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length === parseInt(length, 10));
        },

        greater_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) > parseFloat(param));
        },

        less_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) < parseFloat(param));
        },

        alpha: function(field) {
            return (alphaRegex.test(field.value));
        },

        alpha_numeric: function(field) {
            return (alphaNumericRegex.test(field.value));
        },

        alpha_dash: function(field) {
            return (alphaDashRegex.test(field.value));
        },

        numeric: function(field) {
            return (numericRegex.test(field.value));
        },

        integer: function(field) {
            return (integerRegex.test(field.value));
        },

        decimal: function(field) {
            return (decimalRegex.test(field.value));
        },

        is_natural: function(field) {
            return (naturalRegex.test(field.value));
        },

        is_natural_no_zero: function(field) {
            return (naturalNoZeroRegex.test(field.value));
        },

        valid_ip: function(field) {
            return (ipRegex.test(field.value));
        },

        valid_base64: function(field) {
            return (base64Regex.test(field.value));
        },

        valid_url: function(field) {
            return (urlRegex.test(field.value));
        },

        valid_credit_card: function(field){
            // Luhn Check Code from https://gist.github.com/4075533
            // accept only digits, dashes or spaces
            if (!numericDashRegex.test(field.value)) return false;

            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0, nDigit = 0, bEven = false;
            var strippedField = field.value.replace(/\D/g, "");

            for (var n = strippedField.length - 1; n >= 0; n--) {
                var cDigit = strippedField.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },

        is_file_type: function(field,type) {
            if (field.type !== 'file') {
                return true;
            }

            var ext = field.value.substr((field.value.lastIndexOf('.') + 1)),
                typeArray = type.split(','),
                inArray = false,
                i = 0,
                len = typeArray.length;

            for (i; i < len; i++) {
                if (ext.toUpperCase() == typeArray[i].toUpperCase()) inArray = true;
            }

            return inArray;
        },

        greater_than_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate > validDate;
        },

        less_than_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate < validDate;
        },

        greater_than_or_equal_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate >= validDate;
        },

        less_than_or_equal_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate <= validDate;
        }
    };

    window.FormValidator = FormValidator;
})(window, document);

/*
 * Export as a CommonJS module
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}




function validate(){
   var name = document.getElementById("name").value;
   var subject = document.getElementById("subject").value;
   var phone = document.getElementById("phone").value;
   var email = document.getElementById("email").value;
   var message = document.getElementById("message").value;
   var error_message = document.getElementById("error_message");
   
   error_message.style.padding = "10px";
   
   var text;
   if(name.length < 5){
     text = "Please Enter valid Name";
     error_message.innerHTML = text;
     return false;
   }
   if(subject.length < 10){
     text = "Please Enter Correct Subject";
     error_message.innerHTML = text;
     return false;
   }
   if(isNaN(phone) || phone.length != 10){
     text = "Please Enter valid Phone Number";
     error_message.innerHTML = text;
     return false;
   }
   if(email.indexOf("@") == -1 || email.length < 6){
     text = "Please Enter valid Email";
     error_message.innerHTML = text;
     return false;
   }
   if(message.length <= 140){
     text = "Please Enter More Than 140 Characters";
     error_message.innerHTML = text;
     return false;
   }
   alert("Form Submitted Successfully!");
   return true;
 }











 // import { tasks } from "./tasks.js";
import isValidTextFields from  "./isValidTextFields.js"

const taskTitle = document.querySelector("#taskInput");
const taskDescription = document.querySelector("#taskDescr");
const addTask = document.querySelector("#add");
const tasksList = document.querySelector("#tasksList");


const tasks = [
  {
    id: 464646,
    title: "Test1",
    description: "Dec1",
    checked: false,
  },
];

console.log(tasks)

// console.log("validTest", isValidTextFields("kbkbk", "text", "slnn", "kbkbk", "text", "slnn"));

// function resetList

// API

addTask.addEventListener("click", addItem);

render();

function addItem(event) {
  event.preventDefault();
  
if(isValidTextFields(taskTitle.value, taskDescription.value)){

   
  let newTask = {
    id: Date.now(),
    title: taskTitle.value,
    description: taskDescription.value,
    checked: false,
  };

  tasks.push(newTask);

  taskTitle.value = "";
  taskDescription.value = "";

  render();
}
};
//DoneTask відмічаємо задачу 
tasksList.addEventListener('click', doneTask)


// const cssClass = newTask.checked ? if true: if false;

function doneTask(event){
   if(event.target.dataset.action ==='doneTask'){
 const parentNode = event.target.closest('.main-icons');
 const taskTitle = parentNode.querySelector('.bi-circle')

 taskTitle.classList.toggle("bi-check-circle");
console.log(taskTitle);

}
}

// function checkedTask(id) {
//   // change checked: true
//   const taskCheckedButton = document.querySelector("#tasks-check-" + id);
//   taskCheckedButton.classList.toggle("bi-check-circle");
//   taskCheckedButton.classList.toggle("bi-circle");

//   const taskInputButton = document.querySelector("#title-" + id);
//   taskInputButton.classList.toggle("checkOn");

//   const taskInputDescription = document.querySelector("#description-" + id);
//   taskInputDescription.classList.toggle("checkOn");
// }

function editTask(id) {
  //valid
  // if(isValidTextFields(taskTitle.value, taskDescription.value)){
  // editTask
  // }

  const editTitleButton = document.querySelector("#tasks-input-" + id);
  editTitleButton.toggleAttribute("readonly");
  const taskDescription = document.querySelector("#tasks-descr-" + id);
  taskDescription.toggleAttribute("readonly");

  const changeValueTitle = document.querySelector("#tasks-input-" + id);
  changeValueTitle.classList.toggle("checkEdit");

  const changeValueDescription = document.querySelector("#tasks-descr-" + id);
  changeValueDescription.classList.toggle("checkEdit");

  // filter {title, description}
  // render();
}
//deletedTask
tasksList.addEventListener('click', deleteTask)
 
function deleteTask(event){
      
      if(event.target.dataset.action==='deleteTask'){
        
         const parentNode = event.target.closest('.list-item');

//знаходимо таску
console.log("this " + parentNode);

         //видаляємо таску 
         parentNode.remove();
      };
      
};

// function deleteTask(id) {
//   if (confirm("want to delete?")) {
//     tasks.splice(tasks.find((task) => task.id === id));
//     render();
//   }
// }

function render() {
  let taskHtml1 = "";
  tasks.forEach((task) => {
    const renderHTML = `
    <li class="list-item" key=${task.id}>
    <div class="list-item-main">
        <a href="#" class="main-icons">
          <i class="bi-circle" id="tasks-check-${task.id}" data-action="doneTask" ></i>
          <i class="bi-pen" id="pen" onclick="editTask(${task.id})"></i>
          <i class="bi-trash3" data-action="deleteTask" ></i>
       </a>
       <input type="text"
       placeholder="empty" class="list-item-task" id="title-${task.id}" value="${task.title}" readonly >
       <input type="text"
       placeholder="Description" class="list-item-description" id="description-${task.id}" value="${task.description}" readonly>
    </div>
  </li>
   `;

    taskHtml1 = taskHtml1 + renderHTML;
  });

  tasksList.innerHTML = taskHtml1;
}




// function resetAll (event) {
//    if (event.target.dataset.action === "resetAll") {
//      const parentNode = event.target.closest("#resetAll");
//      parentNode.splice(0,tasks.length)
//    }};

// const tasks = [
//   {
//     id: 464646,
//     title: "Test1",
//     description: "Dec1",
//     checked: false,
//   },
// ];

// console.log(tasks)

// // console.log("validTest", isValidTextFields("kbkbk", "text", "slnn", "kbkbk", "text", "slnn"));

// // function resetList

// // API

// addTask.addEventListener("click", addItem);

// render();

// function addItem(event) {
//   event.preventDefault();

// if(isValidTextFields(taskTitle.value, taskDescription.value)){

//   let newTask = {
//     id: Date.now(),
//     title: taskTitle.value,
//     description: taskDescription.value,
//     checked: false,
//   };

//   tasks.push(newTask);

//   taskTitle.value = "";
//   taskDescription.value = "";

//   render();
// }
// };
// //DoneTask відмічаємо задачу
// tasksList.addEventListener('click', doneTask)

// // const cssClass = newTask.checked ? if true: if false;

// function doneTask(event){
//    if(event.target.dataset.action ==='doneTask'){
//  const parentNode = event.target.closest('.main-icons');
//  const taskTitle = parentNode.querySelector('.bi-circle')

//  taskTitle.classList.toggle("bi-check-circle");
// console.log(taskTitle);

// }
// }

// function checkedTask(id) {
//   // change checked: true
//   const taskCheckedButton = document.querySelector("#tasks-check-" + id);
//   taskCheckedButton.classList.toggle("bi-check-circle");
//   taskCheckedButton.classList.toggle("bi-circle");

//   const taskInputButton = document.querySelector("#title-" + id);
//   taskInputButton.classList.toggle("checkOn");

//   const taskInputDescription = document.querySelector("#description-" + id);
//   taskInputDescription.classList.toggle("checkOn");
// }

// function editTask(id) {
//   //valid
//   // if(isValidTextFields(taskTitle.value, taskDescription.value)){
//   // editTask
//   // }

//   const editTitleButton = document.querySelector("#tasks-input-" + id);
//   editTitleButton.toggleAttribute("readonly");
//   const taskDescription = document.querySelector("#tasks-descr-" + id);
//   taskDescription.toggleAttribute("readonly");

//   const changeValueTitle = document.querySelector("#tasks-input-" + id);
//   changeValueTitle.classList.toggle("checkEdit");

//   const changeValueDescription = document.querySelector("#tasks-descr-" + id);
//   changeValueDescription.classList.toggle("checkEdit");

//   // filter {title, description}
//   // render();
// }
// //deletedTask
// tasksList.addEventListener('click', deleteTask)

// function deleteTask(event){

//       if(event.target.dataset.action==='deleteTask'){

//          const parentNode = event.target.closest('.list-item');

// //знаходимо таску
// console.log("this " + parentNode);

//          //видаляємо таску
//          parentNode.remove();
//       };

// };

// // function deleteTask(id) {
// //   if (confirm("want to delete?")) {
// //     tasks.splice(tasks.find((task) => task.id === id));
// //     render();
// //   }
// // }

// function render() {
//   let taskHtml1 = "";
//   tasks.forEach((task) => {
//     const renderHTML = `
//     <li class="list-item" >
//     <div class="list-item-main">
//         <a href="#" class="main-icons">
//           <i class="bi-circle" data-action="doneTask" ></i>
//           <i class="bi-pen" id="pen" data-action="doneTask"></i>
//           <i class="bi-trash3" data-action="deleteTask" ></i>
//        </a>
//        <input type="text"
//        placeholder="empty" class="list-item-task" id="title-${task.id}" value="${task.title}" readonly >
//        <input type="text"
//        placeholder="Description" class="list-item-description" id="description-${task.id}" value="${task.description}" readonly>
//     </div>
//   </li>
//    `;

//     taskHtml1 = taskHtml1 + renderHTML;
//   });

//   tasksList.innerHTML = taskHtml1;
// }
