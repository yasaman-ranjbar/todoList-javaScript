const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoContainer = document.querySelector('.todo-container');
const todoList = document.querySelector('.todoList');
const filterOptions = document.querySelector('.filter-todos');

//event
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click' , checkRemove)
filterOptions.addEventListener('click' ,filterTodos)
document.addEventListener('DOMContentLoaded' , getLocalTodos)

//functions
function addTodo(e) {

    e.preventDefault();
    if(todoInput.value) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('.todo')
        const newTodo = `<div class="todo">
                            <li> ${todoInput.value} </li>
                            <span><i class="fa-solid fa-trash-can"></i></span>
                            <span><i class="fa-solid fa-circle-check"></i></span>
                        </div>`
        todoDiv.innerHTML = newTodo
        todoList.appendChild(todoDiv)
        saveLocalTodos(todoInput.value)
        todoInput.value = "";
    }
}

function checkRemove(e) {
    //convert DomTokenList to Array
    const classList = [...e.target.classList]
    const item = e.target.parentElement.parentElement
    if(classList[1] === 'fa-circle-check'){
        //toggle is mean click = !ckick
        item.classList.toggle('completed')
    }
    else if(classList[1] === 'fa-trash-can'){
        item.remove()
    }
}

function filterTodos(e) {
    const todos = [...todoList.childNodes];

    todos.forEach( todo => {
        switch(e.target.value) {
            case 'all' :
                todo.style.display = "block";
             break;

             case "completed" :
                 if (todo.classList.contains("completed")){
                    todo.style.display = "block";
                 }
                 else {
                     todo.style.display = "none";
                    }
            break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "block";
                 }
                 else {
                     todo.style.display = "none";
                    }
            break;

        }
    });
}

//save local storage
function saveLocalTodos(todo) {
    
    let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

    savedTodos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(savedTodos));

}

function getLocalTodos() {
    
    let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

    savedTodos.forEach( (todo) => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('.todo')
        const newTodo = `<div class="todo">
                            <li> ${todo} </li>
                            <span><i class="fa-solid fa-trash-can"></i></span>
                            <span><i class="fa-solid fa-circle-check"></i></span>
                        </div>`
        todoDiv.innerHTML = newTodo
        todoList.appendChild(todoDiv)
    })

}


function removeLocalTodos(todo) {
    console.log(todo.children[0].innerText);
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

    const filterTodos = savedTodos.filter( t => t != todo.children.innerText);
    localStorage.setItem("todos" , JSON.stringify(filterTodos));    
}

