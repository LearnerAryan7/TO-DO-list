document.addEventListener('DOMContentLoaded', () => {
    const tasks = [];
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const pointsText = document.querySelector('.points-text');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(todoInput.value);
        todoInput.value = '';
    });

    function addTask(task) {
        tasks.push({ text: task, completed: false });
        renderTasks();
        updateProgress();
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                ${task.text}
                <button onclick="toggleTask(${index})">Complete</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        updateProgress();
    }

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
        updateProgress();
    }

    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
        pointsText.textContent = `${completedTasks * 10} Points`;
    }
});