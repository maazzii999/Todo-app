console.log("JS Loaded");
document.addEventListener("DOMContentLoaded", function () {

    let input = document.getElementById("taskInput");
    let errorMsg = document.getElementById("errorMsg");

    loadTasks();

    // Enter key support
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") addTask();
        console.log("Button clicked");
    });

    window.addTask = function () {
        let task = input.value.trim();
        
        if (task === "") {
            errorMsg.style.display = "block";
            return;
        } else {
            errorMsg.style.display = "none";
        }

        let taskObj = { text: task, completed: false };

        createTaskElement(taskObj);
        saveTask(taskObj);

        input.value = "";
        
    };

    function createTaskElement(taskObj) {
        let li = document.createElement("li");
        li.textContent = taskObj.text;

        if (taskObj.completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }

        li.onclick = function () {
            if (!taskObj.completed) {
                taskObj.completed = true;
                li.style.textDecoration = "line-through";
                li.style.color = "gray";
            } else {
                li.remove();
            }
            updateStorage();
        };

        document.getElementById("taskList").appendChild(li);
    }

    function saveTask(taskObj) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    function updateStorage() {
        let listItems = document.querySelectorAll("#taskList li");
        let tasks = [];

        listItems.forEach(li => {
            tasks.push({
                text: li.textContent,
                completed: li.style.textDecoration === "line-through"
            });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    document.getElementById("taskInput").addEventListener("input", function () {
    document.getElementById("errorMsg").style.display = "none";
});

});