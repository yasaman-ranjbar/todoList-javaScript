const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoContainer = document.querySelector('.todo-container');
const todoList = document.querySelector('.todoList');
const filterOptions = document.querySelector('.filter-todos');

//event
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click' , checkRemove)
filterOptions.addEventListener('click' ,filterTodos )

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

