const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const task = document.querySelector("#inlineFormInput");

btn.addEventListener("click", () => {
  const taskValue = task.value.trim();

  if (taskValue === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = createTaskElement(taskValue);
  list.appendChild(newTask);
  task.value = "";
});

// Function to create a task element with drag functionality
function createTaskElement(taskValue) {
  const newTask = document.createElement("label");
  newTask.className = "list-group-item";
  newTask.draggable = true;

  const leftSide = document.createElement("div");
  leftSide.className = "left-side";

  const inp = document.createElement("input");
  inp.className = "form-check-input me-1";
  inp.type = "checkbox";

  const text = document.createTextNode(taskValue);

  inp.addEventListener("change", () => {
    const label = inp.closest("label");

    if (inp.checked) {
      leftSide.style.textDecoration = "line-through";
      leftSide.style.color = "gray";
    } else {
      leftSide.style.textDecoration = "none";
      leftSide.style.color = "white";
    }
  });

  leftSide.appendChild(inp);
  leftSide.appendChild(text);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-del";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    newTask.remove();
    console.log("Task deleted:", taskValue);
  });

  newTask.appendChild(leftSide);
  newTask.appendChild(deleteBtn);

  // Drag-and-drop functionality
  newTask.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", taskValue);
    e.target.classList.add("dragging");
  });

  newTask.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  return newTask;
}

// Enable drag-and-drop within the list
list.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(list, e.clientY);
  const dragging = document.querySelector(".dragging");

  if (afterElement == null) {
    list.appendChild(dragging);
  } else {
    list.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".list-group-item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
