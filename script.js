let draggedItem = null;
let rightClickedItem = null;
function addItem(colId) {
    // colId refers to column-id
    const input = document.getElementById(`${colId}-input`);
    const taskItem = input.value.trim();

    if (taskItem === "") {
        return;
    }

    const taskDate = new Date().toLocaleString();
    const taskElement = createTaskElement(taskItem, taskDate)

    document.getElementById(`${colId}-tasks`).appendChild(taskElement);
    input.value = "";
}

function createTaskElement(taskItem, taskDate) {
    const taskElement = document.createElement("div")
    taskElement.innerHTML = `<span>${taskItem}</span><br><small class="time">${taskDate}</small>`
    taskElement.classList.add("card");
    taskElement.draggable = true;
    taskElement.addEventListener("dragstart", dragStart);
    taskElement.addEventListener("dragend", dragEnd);
    taskElement.addEventListener("contextmenu", function (event) {

        event.preventDefault();
        rightClickedItem = taskElement;
        displayContextMenu(event.pageX, event.pageY);
    })
    return taskElement;
}
document.addEventListener("contextmenu", function (event) {
    if (event.target.closest(".card-col") && !event.target.classList.contains("card")) {
        event.preventDefault();
    }
});


function dragStart() {
    this.classList.add("dragging");
    draggedItem = this;
}

function dragEnd() {
    this.classList.remove("dragging");
    draggedItem = null;
}

const columns = document.querySelectorAll(".card-col .task-col");
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
})

function dragOver(e) {
    e.preventDefault();
    this.appendChild(draggedItem);

}
const contextmenu = document.querySelector(".context-menu");
function displayContextMenu(x, y) {
    contextmenu.style.left = `${x}px`;
    contextmenu.style.top = `${y}px`;
    contextmenu.style.display = "block";
}

document.addEventListener("click", () => {
    contextmenu.style.display = "none";
})

function editTaskItem() {
    if (rightClickedItem !== null) {
        const newTaskItem = prompt("Edit tak- ", rightClickedItem.textContent)
        if (newTaskItem != " ") {
            rightClickedItem.textContent = newTaskItem;
        }
    }
}

function deleteTaskItem() {
    if (rightClickedItem !== null) {
        const colId = rightClickedItem.parentElement.id.replace("-tasks","")
        rightClickedItem.remove();
        console.log(colId);
        
        updateTaskCounter(colId);
    }
}

// function updateTaskCounter(colId) {
//     const count = document.querySelectorAll(`#${columnId}-tasks .card`).length;
//     document.getElementById(`${colId}-count`).textContent = count;

// }