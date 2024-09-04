// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If no taskText is provided, get it from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Check if the task input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if input is empty
        }

        // Create a new li element for the task
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text of the li to the task input

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn'; // Set class for styling

        // Add an event listener to the remove button to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTask(taskText); // Remove from Local Storage
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li element to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";

        // Save to Local Storage if the save flag is true
        if (save) {
            saveTask(taskText);
        }
    }

    // Attach an event listener to the "Add Task" button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Attach an event listener to the task input field for the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to save a task to Local Storage
    function saveTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array to Local Storage
    }
});
