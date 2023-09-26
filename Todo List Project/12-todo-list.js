const todoList = JSON.parse(localStorage.getItem('array')) || [];

renderTodoList();   //This function displays the list by generating html and inserting it in the div element
 
function renderTodoList(){
    let todoListHTML = '';

    todoList.forEach((todoObject,index) => {
        //Each time this function is called the code inside the div is replaced by the updated version 
        
        const {name, dueDate} = todoObject;
        const html = `
                    <div>${name}</div> 
                    <div>${dueDate}</div> 
                    <button class="delete-todo-button js-delete-todo-button">Delete</button>
                    `;
        todoListHTML += html;   
    });
    //This technique is called generating the HTML
    document.querySelector('.div-js').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-button')      //queryselectorall provides a list of all the buttons with given class
        .forEach((deleteButton,index) => {
            deleteButton.addEventListener('click', () => {
                todoList.splice(index,1); 
                    renderTodoList();           
                    localStorage.setItem('array',JSON.stringify(todoList));
            })
        });
}

document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
        addElement();
    });

function addElement()
{
    const inputElement = document.querySelector('.input-js');
    const name = inputElement.value;   //extracting the todo task from the input in form of string

    const dateInput = document.querySelector('.date-js');
    const dueDate = dateInput.value;    //extracting the input date 

    inputElement.value='';  //reset text in textbox to empty string

    todoList.push({     //shortcut way (if property and variable name are the same)
        name,
        dueDate
    });

    localStorage.setItem('array',JSON.stringify(todoList));     //Adding localstorage in out project

    renderTodoList();
}