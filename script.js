// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}
// Task must be defined as an object with the following properties:
const task = {
    id: generateTaskId(),
    title: "",
    description: "",
    deadline: new Date(),
}
// Todo: create a function to create a task card
function createTaskCard(task) {
 let card = {
        id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: "to-do",
 }
    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const cardList = document.querySelector("#card-list")

    cardList.forEach((task) => {
        // Create a new card element
        let card = document.createElement("div");
        card.cardList.add("card");
        card.setAttribute("id", task.id);
        card.setAttribute("draggable", "true");
        card.setAttribute("data-task-id", task.id);
        card.setAttribute("data-status", task.status);
        card.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>${task.deadline}</p>
            <button class="delete" data-task-id="${task.id}">Delete</button>
        `;
        cardList.appendChild(card);
    }
    );
    };
 


// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    let task = {
        id: generateTaskId(),
        title: $("#title").val(),
        description: $("#description").val(),
        deadline: $("#deadline").val(),
    }
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let taskId = $(this).data("task-id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let taskId = ui.draggable.data("task-id");
    let status = $(this).data("status");
    let task = taskList.find(task => task.id === taskId);
    task.status = status;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $("#add-task").on("submit", handleAddTask);
    $(".delete").on("click", handleDeleteTask);
    $(".lane").droppable({
        drop: handleDrop,
    });
    $("#task-deadline").datepicker();

});
