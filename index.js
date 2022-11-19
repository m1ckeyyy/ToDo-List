const content = document.querySelector(".content");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskInput = document.querySelector("#taskInput");
const tasksFromStorage = Object.values(localStorage);

const loadTasks = function () {
	var values = [];
	keys = Object.keys(localStorage);
	i = keys.length;

	while (i--) {
		values.push(localStorage.getItem(keys[i]));
	}
	console.log(values);
};
const addTask = function () {
	let taskContent = taskInput.value;
	taskInput.value = "";

	content.insertAdjacentHTML(
		"beforeend",
		`<h1 id=task-${taskContent}><input type='text' readonly="readonly"  value='${taskContent}'/>
        <button id=task-delete-${taskContent}>🗑️</button>
        <button id=task-edit-${taskContent}>🚧</button>
        <button id=task-complete-${taskContent}>✅</button>
        </h1>`
	);
	let task = document.querySelector(`#task-${taskContent}`);
	let taskDelete = document.querySelector(`#task-delete-${taskContent}`);
	let taskComplete = document.querySelector(`#task-complete-${taskContent}`);
	let taskEdit = document.querySelector(`#task-edit-${taskContent}`);

	localStorage.setItem(task.id, task.id);
	localStorage.setItem(`${task.id}-isCompleted`, false);
	// taskComplete.textContent === "✅"
	// 	? (isCompleted = false)
	// 	: (isCompleted = true);
	// localStorage.setItem(`${this.parentNode.children[0].value}`, [
	// 	document.querySelector(`#task-${count} > input[type=text]`).value,
	// 	isCompleted,
	// ]);

	taskDelete.onclick = function () {
		this.parentNode.remove();
		localStorage.removeItem(task.id);
		localStorage.removeItem(`${task.id}-isCompleted`);
	};
	taskEdit.onclick = function () {
		localStorage.removeItem(task.id);
		localStorage.removeItem(`${task.id}-isCompleted`);

		taskContent = this.parentNode.children[0];
		//if editing, set task as undone
		if (taskComplete.textContent === "❌") {
			taskComplete.click();
		}
		//refocus cursor on input
		let end = taskContent.value.length;
		taskContent.toggleAttribute("readOnly");
		taskContent.setSelectionRange(end, end);
		taskContent.focus();

		task.id = `task-${taskContent.value}`;
		localStorage.setItem(task.id, task.id);
		localStorage.setItem(`${task.id}-isCompleted`, false);
	};
	taskComplete.onclick = function () {
		if (this.textContent === "✅") {
			this.parentNode.style.border = "2px solid green";
			this.parentNode.style.backgroundColor = "lightgreen";
			this.parentNode.children[0].style.backgroundColor = "lightgreen";
			this.textContent = "❌";
			localStorage.setItem(`${task.id}-isCompleted`, true);
			return;
		}
		this.parentNode.style.border = "2px solid black";
		this.parentNode.style.backgroundColor = "white";
		this.parentNode.children[0].style.backgroundColor = "white";
		this.textContent = "✅";
		localStorage.setItem(`${task.id}-isCompleted`, false);
	};
};
document.addEventListener("DOMContentLoaded", (e) => {
	loadTasks();
});
addTaskBtn.onclick = addTask;
