const content = document.querySelector(".content");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskInput = document.querySelector("#taskInput");
let count = 0;
// addTask doda nowy h1 z unikalnym id i przyciskiem selfdelete/complete/Edit

//Edit = readonly=false + toggluje przycisk edit na 'finish edytowanie'
const addTask = () => {
	count++;
	let taskContent = taskInput.value;
	taskInput.value = "";
	content.insertAdjacentHTML(
		"beforeend",
		`<h1><input type='text' readonly="readonly"  value='${taskContent}'/>
        <button id=task-delete-${count}>🗑️</button>
        <button id=task-edit-${count}>🚧</button>
        <button id=task-complete-${count}>✅</button>
        </h1>`
	);
	document.querySelector(`#task-delete-${count}`).onclick = function () {
		this.parentNode.remove();
		count--;
	};
	document.querySelector(`#task-edit-${count}`).onclick = function () {
		let currentTaskInput = this.parentNode.children[0];
		let end = currentTaskInput.value.length;
		currentTaskInput.toggleAttribute("readOnly");
		currentTaskInput.setSelectionRange(end, end);
		currentTaskInput.focus();
	};
	document.querySelector(`#task-complete-${count}`).onclick = function () {
		if (this.textContent === "✅") {
			this.parentNode.style.border = "2px solid green";
			this.parentNode.style.backgroundColor = "lightgreen";
			this.parentNode.children[0].style.backgroundColor = "lightgreen";
			// console.log(this.parentNode.children);
			this.textContent = "❌";
			return;
		}
		this.parentNode.style.border = "2px solid black";
		this.parentNode.style.backgroundColor = "white";
		this.parentNode.children[0].style.backgroundColor = "white";
		this.textContent = "✅";
	};
	saveLocalTodos();
};
addTaskBtn.onclick = addTask;

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}
/*
<h1>
				<input type="text" placeholder="Type in the task..." />
				<button id="addBtn">➕</button>
			</h1>
            */
