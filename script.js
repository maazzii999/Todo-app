document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("taskInput");
    const errorMsg = document.getElementById("errorMsg");

    // Add task
    window.addTask = function () {
        let text = input.value.trim();

        if (text === "") {
            errorMsg.style.display = "block";
            return;
        }

        errorMsg.style.display = "none";

        let tasks = getTasks();
        tasks.push({ text: text, completed: false });

        saveTasks(tasks);
        input.value = "";
        renderTasks();
    };

    // Get tasks
    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    // Save tasks
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render tasks
    function renderTasks() {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        let tasks = getTasks();

        tasks.forEach((task, index) => {
            let li = document.createElement("li");

            let span = document.createElement("span");
            span.textContent = task.text;

            if (task.completed) {
                span.style.textDecoration = "line-through";
                span.style.color = "gray";
            }

            // Toggle complete
            span.onclick = function () {
                tasks[index].completed = !tasks[index].completed;
                saveTasks(tasks);
                renderTasks();
            };

            // Edit button
            let editBtn = document.createElement("button");
            editBtn.textContent = "✏️";

            editBtn.onclick = function () {

    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = task.text;

    li.innerHTML = "";
    li.appendChild(inputField);

    inputField.focus();

    function saveEdit() {
        let newText = inputField.value.trim();

        if (newText !== "") {
            tasks[index].text = newText;
            saveTasks(tasks);
            renderTasks();
        } else {
            renderTasks();
        }
    }

    // Save on Enter
    inputField.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            saveEdit();
        }
    });

    // Save on clicking outside
    inputField.addEventListener("blur", function () {
        saveEdit();
    });
};

            // Delete button
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑️";

            deleteBtn.onclick = function () {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            };

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            document.getElementById("taskList").appendChild(li);
        });
    }

    // Enter key
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") addTask();
    });

    // Load tasks
    renderTasks();
});