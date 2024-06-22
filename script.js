const form = document.querySelector("#add_task");
const unorderedList = document.querySelector(".todo_list--container");
const inputTaskField = document.querySelector("#task");
const addButton = document.querySelector(".add_btn");
const allTasks = document.querySelector("#all_tasks");
const checkedTasks = document.querySelector("#checked_tasks");

let tasksCompletedCount = 0;
let totalTasksCount = 0;

function createTask(task) {
  return `
    <div class="todo_list--group">
              <li class="unchecked"><span>${task}</span></li>
              <button class="remove_btn">&#128473;</button>
            </div>
    `;
}

function updateTaskCounters() {
  totalTasksCount = unorderedList.getElementsByTagName("li").length;
  allTasks.textContent = totalTasksCount;

  tasksCompletedCount = unorderedList.getElementsByClassName("checked").length;
  checkedTasks.textContent = tasksCompletedCount;
}

// Adding task when the add button is clicked
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputTaskField.value !== "") {
    unorderedList.innerHTML += createTask(inputTaskField.value);
    form.reset();
  } else {
    alert("Please add a task!");
  }
  updateTaskCounters();
});

// Removing task from the urordered list when remove button is cliked using bubbling phase/effect
unorderedList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("remove_btn")) {
    event.target.parentElement.remove();
  } else {
    updateTaskCounters();
  }
});

// Ckecking and unchekcing the list when the "checked/unchecked" square button is clicked
unorderedList.addEventListener("click", (event) => {
  event.preventDefault();
  const listItem = event.target.closest("li");
  // // If the target has a class of unchecked
  // if(event.target.classList.contains("unchecked")){
  //  // Change the class of the nearest item to checked
  //     listItem.className = "checked";
  // } else {
  //   // Otherwise change the class of the nearest item to unchecked
  //     listItem.className = "unchecked";
  // }
  // Using ternary operator to make the code more concise and readable
  listItem.className = event.target.classList.contains("unchecked")
    ? "checked"
    : "unchecked";

  updateTaskCounters();
});
