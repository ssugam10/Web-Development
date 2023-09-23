const todoList = JSON.parse(localStorage.getItem('array')) || [];

renderTodoList();   //This function displays the list by generating html and inserting it in the div element

function renderTodoList(){
    let todoListHTML = '';
    for(let i = 0; i < todoList.length; i++)    //This technique is called generating the HTML
    {
        const todoObject = todoList[i]; //Each time this function is called the code inside the div is replaced by the updated version 
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const {name, dueDate} = todoObject;
        const html = `
                    <div>${name}</div> 
                    <div>${dueDate}</div> 
                    <button onclick="
                        todoList.splice(${i},1); 
                        renderTodoList();           
                        localStorage.setItem('array',JSON.stringify(todoList));     
                    " class="delete-todo-button">Delete</button>
                    `;
        todoListHTML += html;   
    }
    document.querySelector('.div-js').innerHTML = todoListHTML;
}

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

