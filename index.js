const displayTodos = function () {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");

    const content = document.createElement("input");
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const completeButton = document.createElement("button");
    todoItem.classList.add("todo-item");

    content.classList.add("todo-content");
    actions.classList.add("actions");
    editButton.classList.add("editButton");
    deleteButton.classList.add("deleteButton");
    completeButton.classList.add("completeButton");

    content.value = todo.content;
    content.placeholder = "Empty task";

    content.readOnly = true;
    // editButton.innerHTML = "✏️";
    deleteButton.innerHTML = "🗑️";

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    actions.appendChild(completeButton);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);
    todo.done
      ? (todoItem.classList.add("done"), (completeButton.innerHTML = "❌"))
      : (completeButton.innerHTML = "✔️");

    console.log("diosplay");
    todo.editMode
      ? ((editButton.innerHTML = "💾"), (todo.editMode = true))
      : ((editButton.innerHTML = "✏️"), (todo.editMode = false));

    editButton.onclick = function () {
      //focus on input
      let end = todo.content.length;
      actions.parentNode.children[0].setSelectionRange(end, end);
      actions.parentNode.children[0].focus();

      todo.editMode
        ? ((editButton.innerHTML = "✏️"), (todo.editMode = false), (completeButton.disabled=false))
        : ((editButton.innerHTML = "💾"), (todo.editMode = true),(completeButton.disabled=true));
      content.toggleAttribute("readOnly");
      todo.content = content.value;
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    deleteButton.onclick = function () {
      todos = todos.filter((t) => t !== todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    };
    completeButton.onclick = function () {
      todo.done ? (todo.done = false) : (todo.done = true);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    };
  });
};

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const submitBtn = document.querySelector("#addTaskBtn");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const todo = {
    content: e.target.parentNode.children[0].value,
    done: false,
    editMode: false
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //reset the form
  e.target.parentNode.children[0].value = "";
  displayTodos();
});
displayTodos();
