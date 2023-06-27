// Element Selector
const mainContainer = document.querySelector(".main_container");
const createTitle = document.getElementById("create_titel");
const createDescription = document.getElementById("create_description");
const btnSubmit = document.querySelector(".btn_submit");
const unorderedList = document.getElementById("unorderedList");
const showTitle = document.querySelector(".show_title");
const showDescription = document.querySelector(".show_description");
const showStatus = document.querySelector(".show_status");
const btnEdit = document.querySelector(".btn_edit");
const btnDelete = document.querySelector(".btn_delete");
const editContainer = document.querySelector(".edit_container");
const editTitle = document.querySelector(".edit_title");
const editDescription = document.querySelector(".edit_description");
const editStatus = document.querySelector(".edit_status");
const btnDone = document.querySelector(".btn_done");

// Load Home Page
const getData = () => {
	editContainer.style.opacity = 0;
	fetch("https://todoappmy.glitch.me/todos", { method: "GET" })
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			data.forEach((el) => {
				const li = document.createElement("li");
				li.innerHTML = `<p class="title">Title: <span class="content show_title">${el.title}</span></p>
        <p class="title">
            Description: <span class="content show_description">${el.description}</span>
        </p>
        <p class="title">Status: <span class="content show_status">${el.status}</span></p>
        <button class="b btn btn_edit" onclick="editTodo(${el.id})">Edit</button>
        <button class="b btn btn_delete" onclick="deleteTodo(${el.id})">Delete</button>`;
				unorderedList.appendChild(li);
			});
		});
};
getData();

// Handle Create New Todo
const createTodo = () => {
	if (createTitle.value != "" && createDescription.value != "") {
		fetch("https://todoappmy.glitch.me/todos", {
			method: "POST",
			body: JSON.stringify({
				title: createTitle.value,
				description: createDescription.value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				alert(data);
				window.location.reload();
			});
	}
};

// Handle Delete Todo
const deleteTodo = (id) => {
	console.log(id);
	fetch(`https://todoappmy.glitch.me/todos/${id}`, { method: "DELETE" })
		.then((response) => response.text())
		.then((data) => {
			console.log(data);
			window.location.reload();
		});
};
// Handle Edit Todo
let unique_id = null;
const editTodo = (id) => {
	fetch(`https://todoappmy.glitch.me/todos/${id}`, { method: "GET" })
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			editContainer.style.opacity = 1;
			mainContainer.style.opacity = 0;
			editTitle.value = data.title;
			editDescription.value = data.description;
			editStatus.value = data.status;
			unique_id = id;
		});
};
const cancel = () => {
	editContainer.style.opacity = 0;
	mainContainer.style.opacity = 1;
};
const saveEdit = (unique_id) => {
	fetch(`https://todoappmy.glitch.me/todos/${unique_id}`, {
		method: "PUT",
		body: JSON.stringify({
			title: editTitle.value,
			description: editDescription.value,
			status: editStatus.value,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.text())
		.then((data) => {
			editContainer.style.opacity = 1;
			mainContainer.style.opacity = 0;
			console.log(data);
			alert(`${data}`);
			window.location.reload();
		});
};
