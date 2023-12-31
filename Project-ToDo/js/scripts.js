// Elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


//Functions

const loadFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
  
    if (todos) {
      todos.forEach((todoTitle) => {
        saveTodo(todoTitle);
      });
    }
  };
  
  window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

const saveToLocalStorage = () => {
    const todos = [];
    const todoElements = document.querySelectorAll(".todo");
  
    todoElements.forEach((todoElement) => {
      const todoTitle = todoElement.querySelector("h3").innerText;
      todos.push(todoTitle);
    });
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
const saveTodo = (text) =>{
    const todo = document.createElement("div")
    todo.classList.add("todo")

    
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
   doneBtn.classList.add("finish-todo")
   doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
   todo.appendChild(doneBtn)

   const editBtn = document.createElement("button")
   editBtn.classList.add("edit-todo")
   editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
   todo.appendChild(editBtn)

   const deleteBtn = document.createElement("button")
   deleteBtn.classList.add("remove-todo")
   deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
   todo.appendChild(deleteBtn)

   todoList.appendChild(todo)

   todoInput.value = "";
   todoInput.focus();

   saveToLocalStorage();
}

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
 
}

const  updateTodo = (text)=>{

    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
    saveToLocalStorage();
}

const removeFromLocalStorage = (todoTitle) => {
    const todos = JSON.parse(localStorage.getItem("todos"));
  
    const updatedTodos = todos.filter((todo) => todo !== todoTitle);
  
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const searchTodo = (searchText, filter) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
      const isDone = todo.classList.contains("done");
  
      if (
        todoTitle.includes(searchText.toLowerCase()) &&
        ((filter === "all") ||
          (filter === "done" && isDone) ||
          (filter === "todo" && !isDone))
      ) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  };
  
  const filterTodos = (searchText, filter) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
      const isDone = todo.classList.contains("done");
  
      if (
        todoTitle.includes(searchText.toLowerCase()) &&
        ((filter === "all") ||
          (filter === "done" && isDone) ||
          (filter === "todo" && !isDone))
      ) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  };
  
  const searchInput = document.querySelector("#search-input");
  const filterSelect = document.querySelector("#filter-select");
  
  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value;
    const filter = filterSelect.value;
    searchTodoAndFilter(searchText, filter);
  });
  
  filterSelect.addEventListener("change", (e) => {
    const searchText = searchInput.value;
    const filter = e.target.value;
    searchTodoAndFilter(searchText, filter);
  });
  
  const searchTodoAndFilter = (searchText, filter) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
      const isDone = todo.classList.contains("done");
  
      if (
        todoTitle.includes(searchText.toLowerCase()) &&
        ((filter === "all") ||
          (filter === "done" && isDone) ||
          (filter === "todo" && !isDone))
      ) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  };

  //----------Paginação---------
  

//Events
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
   const inputValue = todoInput.value;
   if(inputValue){
    saveTodo(inputValue);
   }
});

document.addEventListener("click",(e)=>{

    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }

    if(targetEl.classList.contains("remove-todo")){
        if (targetEl.classList.contains("remove-todo")) {
            const todoElement = targetEl.closest(".todo");
            const todoTitle = todoElement.querySelector("h3").innerText;
        
            removeFromLocalStorage(todoTitle);
        
            todoElement.remove();
          }
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle; 
    }

});

cancelEditBtn.addEventListener("click", (e)=>{
e.preventDefault();
toggleForms();
})

editForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const editInputValue =  editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }
    toggleForms();
    })

   

    const searchElement = document.querySelector('#search');
   
    

function toggleSearch() {
  const todos = document.querySelectorAll('.todo');

  if (todos.length >= 1) {
    searchElement.style.display = 'block';
    
  } else {
    searchElement.style.display = 'none';
   
  }
}

setInterval(toggleSearch, 100);
