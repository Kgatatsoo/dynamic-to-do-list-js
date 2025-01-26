// Set up an event listener for the 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded', function() {
    // Select the DOM elements using document.getElementById
    const addButton = document.getElementById('add-task-btn');  // "Add Task" button
    const taskInput = document.getElementById('task-input');    // Input field for task entry
    const taskList = document.getElementById('task-list');      // The unordered list where tasks will be listed

    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

   
    function addTask(taskText, save = true) {
       
        if (taskText.trim() === "") {
            return;  
        }

     
        const li = document.createElement('li');
        li.textContent = taskText;  

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";  
        removeButton.classList.add('remove-btn');  

        // 
        removeButton.onclick = function() {
            li.remove();  
            removeTaskFromLocalStorage(taskText);  
        };

        li.appendChild(removeButton);

        taskList.appendChild(li);

      
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
        taskInput.value = '';
    }

   
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);  
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); 
    }

   
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); 
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  
    }

    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();  
        addTask(taskText);  
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {  
            const taskText = taskInput.value.trim();  
            addTask(taskText);  
        }
    });

    
    loadTasks();
});
