const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const deleteAllBtn = document.querySelector("#delete-all-btn");
let tasksArray = [];
window.addEventListener("load", () => {
  tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasksArray.length > 0) {
    deleteAllBtn.classList.remove("hidden");
    deleteAllBtn.classList.add("block");
  } else {
    deleteAllBtn.classList.remove("block");
    deleteAllBtn.classList.add("hidden");
  }
  tasksArray.forEach((task) => {
    taskList.innerHTML += `<li class="flex items-baseline justify-between gap-5 text-lg" id="${
      task.id
    }"><i class="fa-solid fa-circle-check cursor-pointer text-green-600 hover:text-green-700"></i><input type="text" class="font-medium text-sky-800 ${
      task.isCompleted ? "line-through" : ""
    }" value="${
      task.task
    }"  disabled><i class="fa-solid fa-square-pen text-yellow-500 hover:text-yellow-600 cursor-pointer mr-6"></i><div class="gap-2 hidden"><i class="fa-solid fa-square-check cursor-pointer text-green-600 hover:text-green-700"></i><i class="fa-solid fa-square-xmark cursor-pointer text-red-600 hover:text-red-700"></i></div><i class="fa-solid fa-trash cursor-pointer text-red-600 hover:text-red-700"></i></li>`;
  });
});
addTaskButton.addEventListener("click", () => {
  const newTask = newTaskInput.value.trim();
  addNewTask(newTask);
});
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    const taskId = e.target.parentElement.id;
    tasksArray.forEach((task, index) => {
      if (taskId == task.id) {
        tasksArray.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
        e.target.parentElement.remove();

        if (tasksArray.length > 0) {
          deleteAllBtn.classList.remove("hidden");
          deleteAllBtn.classList.add("block");
        } else {
          deleteAllBtn.classList.remove("block");
          deleteAllBtn.classList.add("hidden");
        }
      }
    });
  } else if (e.target.classList.contains("fa-circle-check")) {
    const taskId = e.target.parentElement.id;
    tasksArray.forEach((task) => {
      if (taskId == task.id) {
        e.target.nextElementSibling.classList.toggle("line-through");
        task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
      }
    });
  } else if (e.target.classList.contains("fa-square-pen")) {
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "flex";
    e.target.previousElementSibling.removeAttribute("disabled");
  } else if (e.target.classList.contains("fa-square-check")) {
    const taskId = e.target.parentElement.parentElement.id;
    tasksArray.forEach((task) => {
      if (taskId == task.id) {
        task.task =
          e.target.parentElement.previousElementSibling.previousElementSibling.value;
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
      }
    });
    e.target.parentElement.previousElementSibling.previousElementSibling.setAttribute(
      "disabled",
      ""
    );
    e.target.parentElement.style.display = "none";
    e.target.parentElement.previousElementSibling.style.display = "block";
  } else if (e.target.classList.contains("fa-square-xmark")) {
    const taskId = e.target.parentElement.parentElement.id;
    tasksArray.forEach((task) => {
      if (taskId == task.id) {
        e.target.parentElement.previousElementSibling.previousElementSibling.value =
          task.task;
      }
    });

    e.target.parentElement.previousElementSibling.previousElementSibling.setAttribute(
      "disabled",
      ""
    );
    e.target.parentElement.style.display = "none";
    e.target.parentElement.previousElementSibling.style.display = "block";
  }
});
function addNewTask(newTask) {
  const newTaskObj = {
    id: Date.now(),
    task: newTask,
    isCompleted: false,
  };
  taskList.innerHTML += `<li class="flex items-baseline justify-between gap-5 text-lg" id="${newTaskObj.id}"><i class="fa-solid fa-circle-check cursor-pointer text-green-600 hover:text-green-700"></i><input type="text" class="font-medium text-sky-800" value="${newTaskObj.task}" disabled><i class="fa-solid fa-square-pen text-yellow-500 hover:text-yellow-600 cursor-pointer mr-6"></i><div class="gap-2 hidden"><i class="fa-solid fa-square-check cursor-pointer text-green-600 hover:text-green-700"></i><i class="fa-solid fa-square-xmark cursor-pointer text-red-600 hover:text-red-700"></i></div><i class="fa-solid fa-trash cursor-pointer text-red-600 hover:text-red-700"></i></li>`;
  tasksArray.push(newTaskObj);

  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  newTaskInput.value = "";
  deleteAllBtn.classList.remove("hidden");
  deleteAllBtn.classList.add("block");
}
function deleteAllTasks() {
  taskList.innerHTML = "";
  localStorage.clear();
  deleteAllBtn.classList.add("hidden");
  deleteAllBtn.classList.remove("block");
}
